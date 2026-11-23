import { ReactNode, StrictMode, useMemo, useState } from 'react';
import Layout from '../layouts/layout';
import { Paint } from '../components/Paint/Paint';
import { StatefulSeo as Seo } from '../components/stateful/StatefulSeo/StatefulSeo';

import { getCategoryCompany, type PaintDetails } from '../types';
import { initialFilters } from '../util/paintFilters';
import {
  FilterFields,
  type AllPaintFilters,
  type FilterField,
  type PaintFilters,
  togglePaints,
} from '../util/togglePaints';
import { textToId } from '../util/textToId';
import { paintId } from '../util/paintId';
import { clsx } from '../util/clsx';

export const Paints = (): ReactNode => {
  const [allFilters, setAllFilters] = useState<AllPaintFilters>(initialFilters);
  const filteredPaints = useMemo(() => togglePaints(allFilters), [allFilters]);

  const updateFilter = (type: FilterField, field: string) =>
    setAllFilters((prev) => ({
      ...prev,
      [type]: { ...prev[type], [field]: !prev[type][field] },
    }));

  // If anything in the group is enabled, disable everything; otherwise enable all
  const toggleAll = (type: FilterField) =>
    setAllFilters((prev) => {
      const enable = Object.values(prev[type]).every((value) => !value);
      return {
        ...prev,
        [type]: Object.fromEntries(
          Object.keys(prev[type]).map((key) => [key, enable])
        ),
      };
    });

  return (
    <StrictMode>
      <Layout>
        <h1>Paints ({filteredPaints.length})</h1>
        <hr />
        {FilterFields.map((field) => (
          <FilterGroup
            key={field}
            filters={allFilters[field]}
            filteredPaints={filteredPaints}
            type={field}
            checked={Object.values(allFilters[field]).some(Boolean)}
            updateFilter={updateFilter}
            toggleAll={() => toggleAll(field)}
          />
        ))}
        <br />
        <div className="grid justify-center w-full grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12">
          {filteredPaints.map((paint) => (
            <Paint paint={paint} key={paintId(paint)} />
          ))}
        </div>
      </Layout>
    </StrictMode>
  );
};

export default Paints;

const capitalise = (text: string) =>
  text.replace(/\b\w/g, (l) => l.toUpperCase());

const countMatching = (
  paints: PaintDetails[],
  type: FilterField,
  key: string
) =>
  paints.filter((paint) => {
    const value = paint[type];
    return Array.isArray(value)
      ? (value as readonly unknown[]).includes(key)
      : value === key;
  }).length;

// [key, display name, checked]
type FilterSection = { heading?: string; filters: [string, string, boolean][] };

const FilterGroup = ({
  filters,
  filteredPaints,
  type,
  checked,
  updateFilter,
  toggleAll,
}: {
  filters: PaintFilters;
  filteredPaints: PaintDetails[];
  type: FilterField;
  checked?: boolean;
  updateFilter: (type: FilterField, field: string) => void;
  toggleAll: () => void;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
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
    <div
      data-testid={`filter-group-${textToId(title)}`}
      className="py-2 border-b"
    >
      <div
        className="flex items-center content-center justify-between px-2 py-3 cursor-pointer hover:bg-gray-50"
        role="button"
        tabIndex={0}
        onClick={() => setIsCollapsed(!isCollapsed)}
        onKeyDown={(e) =>
          (e.key === 'Enter' || e.key === ' ') &&
          setIsCollapsed((prev) => !prev)
        }
        aria-pressed={isCollapsed}
      >
        <h3 className="m-0!">{title}</h3>
        <div
          className={clsx(
            isCollapsed ? 'border-b-2 border-r-2' : 'border-t-2 border-l-2',
            'w-2 h-2 transform rotate-45 border-gray-600'
          )}
        />
      </div>
      {!isCollapsed && (
        <div className="p-2">
          <label className="flex items-center gap-2 mb-2 text-xs font-bold">
            <input checked={checked} type="checkbox" onChange={toggleAll} />
            Toggle All
          </label>
          <div className="w-full">
            {sections.map(({ heading, filters: sectionFilters }) => (
              <div key={`filter_group_${textToId(heading ?? type)}`}>
                {heading && (
                  <div className="w-full py-1 text-sm font-bold">{heading}</div>
                )}
                <div className="grid w-full grid-cols-2 mb-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
                  {sectionFilters.map(([key, name, value]) => (
                    <Filter
                      key={`filter_${textToId(key)}`}
                      name={name}
                      value={value}
                      toggle={() => updateFilter(type, key)}
                      count={countMatching(filteredPaints, type, key)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
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
}) => {
  return (
    <div
      data-testid={`filter_${textToId(name)}`}
      className="flex items-center justify-between w-full px-2 text-sm border-r"
    >
      <label className="flex items-center gap-2">
        <input name={name} checked={value} type="checkbox" onChange={toggle} />
        {capitalise(name)}
      </label>
      <span className="text-xs text-gray-400">({count})</span>
    </div>
  );
};

export const Head = () => <Seo title={'Paints'} pathname={'/paints'} />;
