import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  type ActiveFilter,
  enableAll,
  getActiveFilters,
} from '../../util/filtering/activeFilters';
import type { CollectionFilter } from '../../util/paints/collection';
import type { ColorFilter } from '../../util/color/colorFilter';
import {
  type PaintQuery,
  initialQuery,
  readQuery,
  writeQuery,
} from '../../util/filtering/paintQuery';
import {
  getFacetCounts,
  getPaintResults,
} from '../../util/filtering/paintResults';
import type { SortKey } from '../../util/filtering/sortPaintResults';
import type { FilterField } from '../../util/filtering/togglePaints';
import { useCollection } from '../../util/paints/useCollection';

// Picking a color switches the sort to "closest", and dropping the color
// switches it back, so the sort control never describes something inactive
const withColor = (prev: PaintQuery, color: ColorFilter): PaintQuery => {
  let sort = prev.sort;
  if (color.enabled && !prev.color.enabled && sort === 'default') {
    sort = 'closest';
  }
  if (!color.enabled && sort === 'closest') sort = 'default';
  return { ...prev, color, sort };
};

/**
 * All of the paints page's filter state: the query (filters, search, color
 * match and sort), what it produces, and the ways to change it. The query is
 * mirrored in the URL's search params, so a filtered view survives a reload
 * and can be shared.
 */
export const usePaintQuery = () => {
  const [query, setQuery] = useState<PaintQuery>(initialQuery);

  // The server can't know the URL's params, so apply them once mounted, and
  // only start writing back after that or the URL would be wiped first
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setQuery(readQuery(window.location.search));
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    const search = writeQuery(query, window.location.search);
    if (search !== window.location.search) {
      // Replace rather than push: one history entry per checkbox would bury
      // the page the visitor came from
      window.history.replaceState(
        window.history.state,
        '',
        `${window.location.pathname}${search}${window.location.hash}`
      );
    }
  }, [query, ready]);

  // Typing and dragging stay responsive; the grid catches up right after
  const deferredQuery = useDeferredValue(query);
  const { collection, setStatus, update } = useCollection();
  const results = useMemo(
    () => getPaintResults(deferredQuery, collection),
    [deferredQuery, collection]
  );
  const counts = useMemo(
    () => getFacetCounts(deferredQuery, collection),
    [deferredQuery, collection]
  );
  const activeFilters = useMemo(
    () =>
      getActiveFilters(
        query.filters,
        query.color,
        query.search,
        query.collection
      ),
    [query]
  );

  const updateFilter = useCallback(
    (type: FilterField, field: string) =>
      setQuery((prev) => ({
        ...prev,
        filters: {
          ...prev.filters,
          [type]: {
            ...prev.filters[type],
            [field]: !prev.filters[type][field],
          },
        },
      })),
    []
  );

  // Everything on becomes off; anything else (some or none) becomes all on
  const toggleAll = useCallback(
    (type: FilterField) =>
      setQuery((prev) => {
        const everythingOn = Object.values(prev.filters[type]).every(Boolean);
        return {
          ...prev,
          filters: {
            ...prev.filters,
            [type]: Object.fromEntries(
              Object.keys(prev.filters[type]).map((key) => [key, !everythingOn])
            ),
          },
        };
      }),
    []
  );

  const setColor = useCallback(
    (color: ColorFilter) => setQuery((prev) => withColor(prev, color)),
    []
  );
  const setSearch = useCallback(
    (search: string) => setQuery((prev) => ({ ...prev, search })),
    []
  );
  const setSort = useCallback(
    (sort: SortKey) => setQuery((prev) => ({ ...prev, sort })),
    []
  );

  const setCollectionFilter = useCallback(
    (collection: CollectionFilter) =>
      setQuery((prev) => ({ ...prev, collection })),
    []
  );

  const removeActiveFilter = useCallback((filter: ActiveFilter) => {
    setQuery((prev) => {
      if (filter.kind === 'search') return { ...prev, search: '' };
      if (filter.kind === 'collection') return { ...prev, collection: 'all' };
      if (filter.kind === 'color') {
        return withColor(prev, { ...prev.color, enabled: false });
      }
      return {
        ...prev,
        filters: {
          ...prev.filters,
          [filter.field]: enableAll(prev.filters[filter.field]),
        },
      };
    });
  }, []);

  // Leaves the picked color and closeness in place, just switched off
  const clearAll = useCallback(
    () =>
      setQuery((prev) => ({
        ...withColor(prev, { ...prev.color, enabled: false }),
        filters: initialQuery.filters,
        search: '',
        collection: 'all',
      })),
    []
  );

  const findSimilar = useCallback(
    (hex: string) =>
      setQuery((prev) =>
        withColor(prev, {
          ...prev.color,
          hex: hex.toLowerCase(),
          enabled: true,
        })
      ),
    []
  );

  return {
    query,
    collection,
    setStatus,
    updateCollection: update,
    setCollectionFilter,
    results,
    counts,
    activeFilters,
    updateFilter,
    toggleAll,
    setColor,
    setSearch,
    setSort,
    removeActiveFilter,
    clearAll,
    findSimilar,
  };
};
