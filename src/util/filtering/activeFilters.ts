import { capitalise } from '../capitalise';
import {
  type CollectionFilter,
  CollectionFilterLabels,
} from '../paints/collection';
import type { ColorFilter } from '../color/colorFilter';
import {
  FilterFields,
  type AllPaintFilters,
  type FilterField,
  type PaintFilters,
} from './togglePaints';

export type ActiveFilter =
  | { id: 'search'; kind: 'search'; label: string }
  | { id: FilterField; kind: 'group'; field: FilterField; label: string }
  | { id: 'color-match'; kind: 'color'; label: string; hex: string }
  | { id: 'collection'; kind: 'collection'; label: string };

export const FilterFieldLabels: Record<FilterField, string> = {
  company: 'Company',
  category: 'Category',
  color: 'Color',
  type: 'Type',
  availability: 'Availability',
};

// Up to this many names are spelled out; beyond it we fall back to a count
const MAX_LISTED = 3;

const names = (keys: string[]) => keys.map(capitalise).join(', ');

/** "4 of 33" when a group has been narrowed, otherwise null. */
export const summarizeGroup = (filters: PaintFilters): string | null => {
  const keys = Object.keys(filters);
  const included = keys.filter((key) => filters[key]).length;
  return included === keys.length ? null : `${included} of ${keys.length}`;
};

const describeGroup = (field: FilterField, filters: PaintFilters) => {
  const keys = Object.keys(filters);
  const included = keys.filter((key) => filters[key]);
  const excluded = keys.filter((key) => !filters[key]);
  if (excluded.length === 0) return null;

  // Spell out whichever side is shorter, falling back to a count
  let summary: string;
  if (included.length === 0) summary = 'none';
  else if (included.length <= excluded.length && included.length <= MAX_LISTED)
    summary = names(included);
  else if (excluded.length <= MAX_LISTED) summary = `not ${names(excluded)}`;
  else if (included.length <= MAX_LISTED) summary = names(included);
  else summary = `${included.length} of ${keys.length}`;

  return `${FilterFieldLabels[field]}: ${summary}`;
};

/**
 * Everything currently narrowing the results: the search, one entry per filter
 * group, then the color match. Removing an entry always widens the results.
 */
export const getActiveFilters = (
  filters: AllPaintFilters,
  colorFilter: ColorFilter,
  search = '',
  collection: CollectionFilter = 'all'
): ActiveFilter[] => {
  const active: ActiveFilter[] = [];

  const words = search.trim();
  if (words) {
    active.push({ id: 'search', kind: 'search', label: `Search: “${words}”` });
  }

  if (collection !== 'all') {
    active.push({
      id: 'collection',
      kind: 'collection',
      label: `My paints: ${CollectionFilterLabels[collection]}`,
    });
  }

  for (const field of FilterFields) {
    const label = describeGroup(field, filters[field]);
    if (label) active.push({ id: field, kind: 'group', field, label });
  }

  if (colorFilter.enabled) {
    active.push({
      id: 'color-match',
      kind: 'color',
      label: `${colorFilter.hex.toUpperCase()} ±${colorFilter.threshold}`,
      hex: colorFilter.hex,
    });
  }

  return active;
};

/** The group with every option enabled again. */
export const enableAll = (filters: PaintFilters): PaintFilters =>
  Object.fromEntries(Object.keys(filters).map((key) => [key, true]));
