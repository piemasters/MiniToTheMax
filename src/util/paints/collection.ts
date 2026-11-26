import type { PaintDetails } from '../../types';
import { paintId } from './paintId';

/** A paint is either owned or on the wishlist; no entry means neither. */
export type CollectionStatus = 'owned' | 'wishlist';

/** paintId -> status */
export type Collection = Readonly<Record<string, CollectionStatus>>;

export const emptyCollection: Collection = Object.freeze({});

export const CollectionFilters = [
  'all',
  'owned',
  'wishlist',
  'missing',
] as const;
export type CollectionFilter = (typeof CollectionFilters)[number];

export const CollectionFilterLabels: Record<CollectionFilter, string> = {
  all: 'All paints',
  owned: 'Owned',
  wishlist: 'Wishlist',
  missing: 'Not owned',
};

export const isCollectionFilter = (value: unknown): value is CollectionFilter =>
  CollectionFilters.includes(value as CollectionFilter);

/** Reads stored JSON, dropping anything that isn't a valid entry. */
export const parseCollection = (raw: string | null): Collection => {
  if (!raw) return emptyCollection;
  try {
    const data: unknown = JSON.parse(raw);
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return emptyCollection;
    }
    return Object.fromEntries(
      Object.entries(data).filter(
        ([, status]) => status === 'owned' || status === 'wishlist'
      )
    ) as Collection;
  } catch {
    return emptyCollection;
  }
};

export const serializeCollection = (collection: Collection) =>
  JSON.stringify(collection);

/** A copy with the paint's status set, or cleared when `status` is null. */
export const withStatus = (
  collection: Collection,
  id: string,
  status: CollectionStatus | null
): Collection => {
  const { [id]: _removed, ...rest } = collection;
  return status ? { ...rest, [id]: status } : rest;
};

/** paintId -> the status to give it, or null to clear it. */
export type CollectionChanges = Readonly<
  Record<string, CollectionStatus | null>
>;

/** A copy with every change made, plus the changes that would reverse it. */
export const applyChanges = (
  collection: Collection,
  changes: CollectionChanges
) => {
  const next: Record<string, CollectionStatus> = { ...collection };
  const inverse: Record<string, CollectionStatus | null> = {};
  for (const [id, status] of Object.entries(changes)) {
    const previous = collection[id] ?? null;
    if (previous === status) continue;
    inverse[id] = previous;
    if (status) next[id] = status;
    else delete next[id];
  }
  return {
    collection: next as Collection,
    inverse: inverse as CollectionChanges,
  };
};

export const getStatus = (
  collection: Collection,
  paint: Parameters<typeof paintId>[0]
): CollectionStatus | undefined => collection[paintId(paint)];

export const filterByCollection = (
  paints: PaintDetails[],
  filter: CollectionFilter,
  collection: Collection
): PaintDetails[] => {
  if (filter === 'all') return paints;
  return paints.filter((paint) => {
    const status = getStatus(collection, paint);
    return filter === 'missing' ? status !== 'owned' : status === filter;
  });
};
