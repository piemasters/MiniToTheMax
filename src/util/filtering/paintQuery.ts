import {
  type CollectionFilter,
  isCollectionFilter,
} from '../paints/collection';
import {
  type ColorFilter,
  initialColorFilter,
  parseHex,
} from '../color/colorFilter';
import { initialFilters } from './paintFilters';
import { isSortKey, type SortKey } from './sortPaintResults';
import {
  FilterFields,
  type AllPaintFilters,
  type FilterField,
} from './togglePaints';

/** Everything that decides which paints are shown, and in what order. */
export interface PaintQuery {
  filters: AllPaintFilters;
  color: ColorFilter;
  search: string;
  sort: SortKey;
  /** Which of the visitor's own paints to show. */
  collection: CollectionFilter;
}

export const initialQuery: PaintQuery = {
  filters: initialFilters,
  color: initialColorFilter,
  search: '',
  sort: 'default',
  collection: 'all',
};

const MIN_THRESHOLD = 1;
const MAX_THRESHOLD = 50;

// Group filters are stored as the shorter of two lists: `company=Citadel` (only
// these) or `x-company=Vallejo` (all but these). `company=` alone means none.
const EXCLUDE_PREFIX = 'x-';
const OWN_KEYS = [
  'q',
  'sort',
  'hex',
  'delta',
  'mine',
  ...FilterFields,
  ...FilterFields.map((field) => EXCLUDE_PREFIX + field),
];

/**
 * Turns a query into URL search params, leaving any params that aren't ours
 * (analytics tags and the like) exactly as they were. Returns `''` or `?...`.
 */
export const writeQuery = (query: PaintQuery, currentSearch = ''): string => {
  const params = new URLSearchParams(currentSearch);
  OWN_KEYS.forEach((key) => params.delete(key));

  const search = query.search.trim();
  if (search) params.set('q', search);
  if (query.sort !== 'default') params.set('sort', query.sort);
  if (query.collection !== 'all') params.set('mine', query.collection);

  for (const field of FilterFields) {
    const keys = Object.keys(query.filters[field]);
    const included = keys.filter((key) => query.filters[field][key]);
    const excluded = keys.filter((key) => !query.filters[field][key]);
    if (excluded.length === 0) continue;

    if (included.length <= excluded.length) {
      if (included.length === 0) params.append(field, '');
      included.forEach((key) => params.append(field, key));
    } else {
      excluded.forEach((key) => params.append(EXCLUDE_PREFIX + field, key));
    }
  }

  if (query.color.enabled) {
    params.set('hex', query.color.hex.replace('#', '').toLowerCase());
    params.set('delta', String(query.color.threshold));
  }

  const text = params.toString();
  return text ? `?${text}` : '';
};

const readGroup = (
  params: URLSearchParams,
  field: FilterField,
  base: AllPaintFilters[FilterField]
) => {
  const known = new Set(Object.keys(base));
  const included = params.getAll(field);
  const excluded = params.getAll(EXCLUDE_PREFIX + field);

  if (included.length > 0) {
    const only = new Set(included.filter((key) => known.has(key)));
    // An empty value means "none"; values we don't recognise mean nothing at all
    if (only.size === 0 && !included.includes('')) return base;
    return Object.fromEntries([...known].map((key) => [key, only.has(key)]));
  }
  if (excluded.length > 0) {
    const except = new Set(excluded);
    return Object.fromEntries([...known].map((key) => [key, !except.has(key)]));
  }
  return base;
};

/** Reads a query from URL search params, ignoring anything unrecognised. */
export const readQuery = (search: string): PaintQuery => {
  const params = new URLSearchParams(search);

  const filters = Object.fromEntries(
    FilterFields.map((field) => [
      field,
      readGroup(params, field, initialQuery.filters[field]),
    ])
  ) as AllPaintFilters;

  const hex = parseHex(params.get('hex') ?? '');
  const delta = Number(params.get('delta'));
  const color: ColorFilter = hex
    ? {
        enabled: true,
        hex,
        threshold:
          Number.isFinite(delta) && delta >= MIN_THRESHOLD
            ? Math.min(Math.round(delta), MAX_THRESHOLD)
            : initialColorFilter.threshold,
      }
    : initialColorFilter;

  const sort = params.get('sort');
  const collection = params.get('mine');
  return {
    collection: isCollectionFilter(collection) ? collection : 'all',
    filters,
    color,
    search: params.get('q') ?? '',
    // Closest only makes sense while a color is being matched
    sort:
      isSortKey(sort) && (sort !== 'closest' || color.enabled)
        ? sort
        : 'default',
  };
};
