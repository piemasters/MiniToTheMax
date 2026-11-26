import { graphql, type PageProps } from 'gatsby';
import {
  type ReactNode,
  StrictMode,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import Layout from '../layouts/layout';
import { Paint } from '../components/Paint/Paint';
import { ActiveFilters } from '../components/PaintFilters/ActiveFilters';
import { EditPaintsButton } from '../components/PaintFilters/EditPaintsButton';
import { FilterDrawer } from '../components/PaintFilters/FilterDrawer';
import { FilterPanel } from '../components/PaintFilters/FilterPanel';
import { MyPaintsEditor } from '../components/PaintFilters/MyPaintsEditor';
import { PaintDetailsDialog } from '../components/PaintFilters/PaintDetailsDialog';
import { ResultsToolbar } from '../components/PaintFilters/ResultsToolbar';
import { usePaintQuery } from '../components/PaintFilters/usePaintQuery';
import { StatefulSeo as Seo } from '../components/stateful/StatefulSeo/StatefulSeo';
import type { PaintDetails } from '../types';
import { getStatus } from '../util/paints/collection';
import { paintId } from '../util/paints/paintId';
import { buildPaintPosts, type PaintPostNode } from '../util/paints/paintPosts';
import { useCollectionEdits } from '../util/paints/useCollectionEdits';
import { useFitViewportHeight } from '../util/hooks/useFitViewportHeight';
import { useMediaQuery } from '../util/hooks/useMediaQuery';

const plural = (count: number) => (count === 1 ? 'paint' : 'paints');

interface PaintsPageData {
  posts: { nodes: PaintPostNode[] };
}

export const Paints = ({
  data,
}: Partial<PageProps<PaintsPageData>>): ReactNode => {
  const {
    query,
    collection,
    setStatus,
    updateCollection,
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
  } = usePaintQuery();

  // Filters sit in a sidebar from `lg` up and in a slide-in drawer below it.
  // Server rendering assumes the sidebar; CSS hides it on small screens
  // until the client has worked out which one applies.
  const isDesktop = useMediaQuery('(min-width: 64rem)', true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  // The sidebar scrolls on its own, sized to the window so it never needs the
  // page to be scrolled to reach the bottom of the filters
  const sidebarRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const focusSearch = useCallback(() => searchRef.current?.focus(), []);
  useFitViewportHeight(sidebarRef, isDesktop);
  useEffect(() => {
    if (isDesktop) setDrawerOpen(false);
  }, [isDesktop]);

  // The paint whose details are showing. It is kept after closing so its content
  // doesn't vanish while the dialog animates out.
  const [selected, setSelected] = useState<PaintDetails | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  // Live posts only, as on the site itself; drafts are visible while developing
  const paintPosts = useMemo(
    () =>
      buildPaintPosts(
        data?.posts.nodes ?? [],
        process.env.NODE_ENV === 'production'
      ),
    [data]
  );
  const collectionCounts = useMemo(() => {
    const statuses = Object.values(collection);
    return {
      owned: statuses.filter((status) => status === 'owned').length,
      wishlist: statuses.filter((status) => status === 'wishlist').length,
    };
  }, [collection]);
  const selectPaint = useCallback((paint: PaintDetails) => {
    setSelected(paint);
    setDetailsOpen(true);
  }, []);

  // While editing, tapping a swatch toggles "owned" instead of opening details
  const [editing, setEditing] = useState(false);
  const edits = useCollectionEdits(updateCollection);
  const { apply, reset } = edits;
  const changeEditing = useCallback(
    (next: boolean) => {
      setEditing(next);
      if (!next) reset();
    },
    [reset]
  );
  const editorId = useId();
  const gridRef = useRef<HTMLDivElement>(null);
  const editToggleRef = useRef<HTMLButtonElement>(null);
  // Where the tapped swatch was, in case the filters now leave it out
  const tapped = useRef<number | null>(null);
  const toggleOwned = useCallback(
    (paint: PaintDetails) => {
      const index = [
        ...(gridRef.current?.querySelectorAll('button') ?? []),
      ].indexOf(document.activeElement as HTMLButtonElement);
      tapped.current = index < 0 ? null : index;
      const id = paintId(paint);
      apply((current) => {
        const owned = current[id] === 'owned';
        return {
          changes: { [id]: owned ? null : 'owned' },
          message: owned
            ? `Unmarked ${paint.name}.`
            : `Marked ${paint.name} as owned.`,
        };
      });
    },
    [apply]
  );
  // If that swatch has gone, move focus to the one now in its place
  useEffect(() => {
    const index = tapped.current;
    if (index === null) return;
    tapped.current = null;
    if (document.activeElement !== document.body) return;
    const buttons = gridRef.current?.querySelectorAll('button');
    const next = buttons?.[Math.min(index, buttons.length - 1)];
    (next ?? editToggleRef.current)?.focus();
  }, [results]);

  const panel = (headingLevel: 2 | 3) => (
    <FilterPanel
      filters={query.filters}
      colorFilter={query.color}
      counts={counts}
      headingLevel={headingLevel}
      onToggle={updateFilter}
      onToggleAll={toggleAll}
      onColorChange={setColor}
      collectionFilter={query.collection}
      collectionCounts={collectionCounts}
      onCollectionChange={setCollectionFilter}
    />
  );

  return (
    <StrictMode>
      <Layout wide>
        <h1 className="sr-only">Paints</h1>
        <div className="mt-4 lg:grid lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-start lg:gap-6">
          <aside
            ref={sidebarRef}
            aria-label="Paint filters"
            className="hidden! lg:block! sticky top-4 max-h-[calc(100dvh-2rem)] overflow-y-auto border rounded"
          >
            {isDesktop && (
              <>
                <div className="flex items-center justify-between px-2 py-3 border-b">
                  <h2 className="m-0! text-base!">Filters</h2>
                  <span className="text-sm text-gray-600">
                    {results.length} {plural(results.length)}
                  </span>
                </div>
                {panel(3)}
              </>
            )}
          </aside>

          <div>
            {/* Small screens: always-reachable button that opens the drawer */}
            <div
              data-testid="mobile-filter-bar"
              className="sticky top-0 z-10 flex items-center justify-between gap-3 py-2 mb-2 bg-white border-b lg:hidden"
            >
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-haspopup="dialog"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm! font-bold! bg-white border border-gray-400 rounded cursor-pointer hover:bg-gray-50"
              >
                Filters
                {activeFilters.length > 0 && (
                  <span className="px-2 text-xs text-white bg-gray-800 rounded-full">
                    {activeFilters.length}
                  </span>
                )}
              </button>
              <span className="text-sm text-gray-600">
                {results.length} {plural(results.length)}
              </span>
            </div>

            <ResultsToolbar
              search={query.search}
              onSearchChange={setSearch}
              sort={query.sort}
              onSortChange={setSort}
              colorEnabled={query.color.enabled}
              searchRef={searchRef}
              action={
                <EditPaintsButton
                  ref={editToggleRef}
                  editing={editing}
                  onEditingChange={changeEditing}
                  panelId={editorId}
                />
              }
            />
            <ActiveFilters
              filters={activeFilters}
              onRemove={removeActiveFilter}
              onClearAll={clearAll}
              focusWhenEmpty={focusSearch}
            />
            <MyPaintsEditor
              id={editorId}
              editing={editing}
              results={results}
              collection={collection}
              edits={edits}
            />
            <p role="status" className="sr-only">
              {results.length}{' '}
              {results.length === 1 ? 'paint matches' : 'paints match'}
            </p>

            {results.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
                <p className="m-0! text-lg font-bold">No paints match</p>
                <p className="m-0! text-sm text-gray-600">
                  Try removing a filter, or widening the color match.
                </p>
                <button
                  type="button"
                  onClick={clearAll}
                  className="px-4 py-2 mt-2 text-sm! font-bold! text-white bg-gray-800 rounded cursor-pointer hover:bg-gray-700"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div
                ref={gridRef}
                className="paint-grid grid justify-center justify-items-center w-full grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-8 xl:grid-cols-12"
              >
                {results.map((paint) => (
                  <Paint
                    paint={paint}
                    key={paintId(paint)}
                    status={getStatus(collection, paint)}
                    onSelect={editing ? toggleOwned : selectPaint}
                    selectOwned={editing}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {!isDesktop && (
          <FilterDrawer
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            resultCount={results.length}
          >
            {panel(2)}
          </FilterDrawer>
        )}

        {selected && (
          <PaintDetailsDialog
            paint={selected}
            open={detailsOpen}
            onOpenChange={setDetailsOpen}
            onFindSimilar={findSimilar}
            onSelectPaint={selectPaint}
            status={getStatus(collection, selected)}
            onStatusChange={(status) => setStatus(paintId(selected), status)}
            posts={paintPosts[paintId(selected)]}
          />
        )}
      </Layout>
    </StrictMode>
  );
};

export default Paints;

// Which posts show which paints, for each paint's details
export const query = graphql`
  query PaintsPage {
    posts: allMdx(sort: { frontmatter: { date: DESC } }, limit: 2000) {
      nodes {
        fields {
          slug
        }
        paintReferences
        frontmatter {
          title
          published
        }
      }
    }
  }
`;

export const Head = () => <Seo title={'Paints'} pathname={'/paints'} />;
