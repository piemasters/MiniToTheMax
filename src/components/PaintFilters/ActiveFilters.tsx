import { useEffect, useRef } from 'react';
import type { ActiveFilter } from '../../util/filtering/activeFilters';
import { Chip } from '../Chip/Chip';

/** One chip per narrowed filter. Removing a chip always widens the results. */
export const ActiveFilters = ({
  filters,
  onRemove,
  onClearAll,
  focusWhenEmpty,
}: {
  filters: ActiveFilter[];
  onRemove: (filter: ActiveFilter) => void;
  onClearAll: () => void;
  focusWhenEmpty?: () => void;
}) => {
  const listRef = useRef<HTMLUListElement>(null);
  // Index of the chip just removed, or 'all'. Focus moves after the re-render.
  const pending = useRef<number | 'all' | null>(null);

  useEffect(() => {
    const target = pending.current;
    if (target === null) return;
    pending.current = null;

    const chips = [
      ...(listRef.current?.querySelectorAll<HTMLButtonElement>(
        'button[data-chip]'
      ) ?? []),
    ];
    if (target === 'all' || chips.length === 0) focusWhenEmpty?.();
    else chips[Math.min(target, chips.length - 1)].focus();
  }, [filters, focusWhenEmpty]);

  if (filters.length === 0) return null;

  return (
    <ul
      ref={listRef}
      aria-label="Active filters"
      className="flex flex-wrap items-center gap-2 p-0! mx-0! mt-2! mb-4! list-none"
    >
      {filters.map((filter, index) => (
        <li key={filter.id} className="m-0! list-none!">
          <Chip
            label={filter.label}
            ariaLabel={
              filter.kind === 'color'
                ? `Remove color match ${filter.label}`
                : filter.kind === 'search'
                  ? `Remove ${filter.label}`
                  : `Remove filter ${filter.label}`
            }
            onRemove={() => {
              pending.current = index;
              onRemove(filter);
            }}
            prefix={
              filter.kind === 'color' && (
                <span
                  aria-hidden="true"
                  className="inline-block w-3 h-3 border border-gray-400 rounded-full"
                  style={{ backgroundColor: filter.hex }}
                />
              )
            }
          />
        </li>
      ))}
      <li className="m-0! list-none!">
        <button
          type="button"
          onClick={() => {
            pending.current = 'all';
            onClearAll();
          }}
          className="px-2 py-1.5 text-xs! text-gray-600 underline cursor-pointer hover:text-red-700"
        >
          Clear all
        </button>
      </li>
    </ul>
  );
};
