import type { PaintDetails } from '../../types';
import {
  type Collection,
  emptyCollection,
  filterByCollection,
} from '../paints/collection';
import { filterByColor } from '../color/colorFilter';
import type { PaintQuery } from './paintQuery';
import { searchPaints } from './searchPaints';
import { sortPaintResults } from './sortPaintResults';
import { FilterFields, type FilterField, togglePaints } from './togglePaints';

/** option -> number of paints, for each filter group */
export type FacetCounts = Record<FilterField, Record<string, number>>;

// Optionally ignores one filter group (see getFacetCounts)
const applyFilters = (
  query: PaintQuery,
  collection: Collection,
  except?: FilterField
) =>
  filterByCollection(
    filterByColor(
      searchPaints(togglePaints(query.filters, except), query.search),
      query.color
    ),
    query.collection,
    collection
  );

/** The paints to show, in order. */
export const getPaintResults = (
  query: PaintQuery,
  collection: Collection = emptyCollection
): PaintDetails[] =>
  sortPaintResults(applyFilters(query, collection), query.sort, query.color);

/**
 * How many paints each option would show if it were ticked, given everything
 * else that is applied. Each group is counted without its own filter, so an
 * option you have unticked still shows what ticking it would bring back,
 * instead of an unhelpful 0.
 */
export const getFacetCounts = (
  query: PaintQuery,
  collection: Collection = emptyCollection
): FacetCounts =>
  Object.fromEntries(
    FilterFields.map((field) => {
      const counts = Object.fromEntries(
        Object.keys(query.filters[field]).map((key) => [key, 0])
      );
      for (const paint of applyFilters(query, collection, field)) {
        const value = paint[field];
        for (const key of Array.isArray(value) ? value : [value]) {
          if (key in counts) counts[key] += 1;
        }
      }
      return [field, counts];
    })
  ) as FacetCounts;
