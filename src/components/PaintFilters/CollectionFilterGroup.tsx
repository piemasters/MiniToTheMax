import { useId } from 'react';
import {
  type CollectionFilter,
  CollectionFilterLabels,
  CollectionFilters,
} from '../../util/paints/collection';
import { CollapsibleFilter, type HeadingLevel } from './CollapsibleFilter';

export const CollectionFilterGroup = ({
  value,
  counts,
  headingLevel,
  onChange,
}: {
  value: CollectionFilter;
  counts: { owned: number; wishlist: number };
  headingLevel: HeadingLevel;
  onChange: (filter: CollectionFilter) => void;
}) => {
  const name = useId();
  const empty = counts.owned === 0 && counts.wishlist === 0;

  return (
    <CollapsibleFilter
      title="My paints"
      summary={value === 'all' ? null : CollectionFilterLabels[value]}
      headingLevel={headingLevel}
    >
      <fieldset className="p-2 m-0 border-0!">
        <legend className="sr-only">Show</legend>
        {CollectionFilters.map((option) => (
          <label
            key={option}
            className="flex items-center justify-between gap-2 py-1 text-sm"
          >
            <span className="flex items-center gap-2">
              <input
                type="radio"
                name={name}
                value={option}
                checked={value === option}
                onChange={() => onChange(option)}
              />
              {CollectionFilterLabels[option]}
            </span>
            {(option === 'owned' || option === 'wishlist') && (
              <span className="text-xs text-gray-600">({counts[option]})</span>
            )}
          </label>
        ))}
      </fieldset>
      {empty && (
        <p className="px-2 pb-2 m-0! text-xs text-gray-600">
          Use “Edit my paints” to mark the ones you own, or add one to your
          wishlist from its details. They are saved in this browser.
        </p>
      )}
    </CollapsibleFilter>
  );
};
