import { useEffect, useMemo, useRef } from 'react';
import { getCategoryCompany } from '../../types';
import { capitalise } from '../../util/capitalise';
import { summarizeGroup } from '../../util/filtering/activeFilters';
import type {
  FilterField,
  PaintFilters,
} from '../../util/filtering/togglePaints';
import { textToId } from '../../util/textToId';
import { CollapsibleFilter, type HeadingLevel } from './CollapsibleFilter';

// The longest lists start closed so the rest are within reach
const COLLAPSED_BY_DEFAULT: FilterField[] = ['category', 'color'];

// [key, display name, checked]
type FilterSection = { heading?: string; filters: [string, string, boolean][] };

export const FilterGroup = ({
  filters,
  counts,
  type,
  headingLevel,
  updateFilter,
  toggleAll,
}: {
  filters: PaintFilters;
  counts: Record<string, number>;
  type: FilterField;
  headingLevel: HeadingLevel;
  updateFilter: (type: FilterField, field: string) => void;
  toggleAll: () => void;
}) => {
  const title = capitalise(type);

  // Categories are split up by company, with the company prefix dropped
  // from the display name. Everything else is a single unheaded section.
  const sections = useMemo((): FilterSection[] => {
    const entries = Object.entries(filters);
    if (type !== 'category') {
      return [{ filters: entries.map(([key, value]) => [key, key, value]) }];
    }

    const byCompany = new Map<string, FilterSection>();
    for (const [key, value] of entries) {
      const company = getCategoryCompany(key);
      if (!company) continue;
      let section = byCompany.get(company);
      if (!section) {
        section = { heading: company, filters: [] };
        byCompany.set(company, section);
      }
      const name = key.replace(new RegExp(`^${company}\\s*`, 'i'), '');
      section.filters.push([key, name, value]);
    }
    return [...byCompany.values()];
  }, [filters, type]);

  return (
    <CollapsibleFilter
      title={title}
      summary={summarizeGroup(filters)}
      headingLevel={headingLevel}
      defaultCollapsed={COLLAPSED_BY_DEFAULT.includes(type)}
    >
      <SelectAll filters={filters} onChange={toggleAll} />
      <div className="w-full">
        {sections.map(({ heading, filters: sectionFilters }) => (
          <div key={`filter_group_${textToId(heading ?? type)}`}>
            {heading && (
              <div className="w-full py-1 text-sm font-bold">{heading}</div>
            )}
            <div className="grid w-full grid-cols-1 mb-2 @xs:grid-cols-2">
              {sectionFilters.map(([key, name, value]) => (
                <Filter
                  key={`filter_${textToId(key)}`}
                  name={name}
                  value={value}
                  toggle={() => updateFilter(type, key)}
                  count={counts[key] ?? 0}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </CollapsibleFilter>
  );
};

/** Ticked when everything is on, dashed when only some are, empty when none. */
const SelectAll = ({
  filters,
  onChange,
}: {
  filters: PaintFilters;
  onChange: () => void;
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const values = Object.values(filters);
  const all = values.every(Boolean);
  const some = values.some(Boolean);

  // `indeterminate` can only be set from script, not as an attribute
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = some && !all;
  }, [some, all]);

  return (
    <label className="flex items-center gap-2 mb-2 text-xs font-bold">
      <input ref={ref} checked={all} type="checkbox" onChange={onChange} />
      Select all
    </label>
  );
};

const Filter = ({
  name,
  value,
  toggle,
  count,
}: {
  name: string;
  value: boolean;
  toggle: () => void;
  count: number;
}) => (
  <div
    data-testid={`filter_${textToId(name)}`}
    className="flex items-center justify-between w-full px-2 text-sm @xs:border-r"
  >
    <label className="flex items-center gap-2">
      <input name={name} checked={value} type="checkbox" onChange={toggle} />
      {capitalise(name)}
    </label>
    <span className="text-xs text-gray-600">({count})</span>
  </div>
);
