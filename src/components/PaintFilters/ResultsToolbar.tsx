import { type ReactNode, type Ref, useId } from 'react';
import {
  SortKeys,
  SortLabels,
  type SortKey,
} from '../../util/filtering/sortPaintResults';

/** Search and sort for the results. A search landmark, labelled controls. */
export const ResultsToolbar = ({
  search,
  onSearchChange,
  sort,
  onSortChange,
  colorEnabled,
  searchRef,
  action,
}: {
  search: string;
  onSearchChange: (search: string) => void;
  sort: SortKey;
  onSortChange: (sort: SortKey) => void;
  /** "Closest" can only be chosen while a color is being matched. */
  colorEnabled: boolean;
  searchRef?: Ref<HTMLInputElement>;
  /** A control to sit at the end of the row. */
  action?: ReactNode;
}) => {
  const id = useId();

  return (
    <div role="search" className="flex flex-wrap items-end gap-3 mb-3">
      {/* On narrow screens search gets its own row, above sort and the action */}
      <div className="flex-1 min-w-48 max-md:basis-full">
        <label
          htmlFor={`${id}-search`}
          className="block mb-1 text-xs font-bold"
        >
          Search
        </label>
        <input
          ref={searchRef}
          id={`${id}-search`}
          type="search"
          name="q"
          value={search}
          placeholder="Name, number or hex"
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          className="w-full h-10 px-3 text-sm! bg-white border border-gray-400 rounded"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="max-md:flex-1 max-md:min-w-0">
        <label htmlFor={`${id}-sort`} className="block mb-1 text-xs font-bold">
          Sort by
        </label>
        <select
          id={`${id}-sort`}
          name="sort"
          value={sort}
          className="w-full h-10 px-3 text-sm! bg-white border border-gray-400 rounded"
          onChange={(e) => onSortChange(e.target.value as SortKey)}
        >
          {SortKeys.map((key) => (
            <option
              key={key}
              value={key}
              disabled={key === 'closest' && !colorEnabled}
            >
              {SortLabels[key]}
            </option>
          ))}
        </select>
      </div>
      {action}
    </div>
  );
};
