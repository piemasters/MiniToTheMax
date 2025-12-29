import { ReactNode, StrictMode, useMemo, useState } from 'react';
import Layout from '../layouts/layout';
import { Paint } from '../components/Paint/Paint';
import { StatefulSeo as Seo } from '../components/stateful/StatefulSeo/StatefulSeo';

import {
  PaintCompanies,
  type PaintDetails,
  type PaintGradient,
  type PaintType,
} from '../types';
import {
  availabilityFilters,
  companyFilters,
  colorFilters,
  typeFilters,
  categoryFilters,
} from '../util/paintFilters';
import { getAllSortedPaints } from '../util/getAllSortedPaints';
import {
  AllPaintFilters,
  PaintFilters,
  togglePaints,
} from '../util/togglePaints';
import { textToId } from '../util/textToId';
import { clsx } from '../util/clsx';

export const Paints = (): ReactNode => {
  const allPaints = useMemo(() => getAllSortedPaints(), []);
  const [filteredPaints, setFilteredPaints] = useState([...allPaints]);

  const [allFilters, setAllFilters] = useState<AllPaintFilters>(
    useMemo(
      () => ({
        company: { ...companyFilters },
        category: { ...categoryFilters },
        color: { ...colorFilters },
        type: { ...typeFilters },
        availability: { ...availabilityFilters },
      }),
      []
    )
  );

  const updateFilter = (type: string, field: string) => {
    const updatedFilters = {
      ...allFilters,
      [type]: {
        ...allFilters[type],
        [field]: !allFilters[type][field],
      },
    };
    setAllFilters(updatedFilters);
    setFilteredPaints(togglePaints(updatedFilters));
  };

  const toggleAll = (filters: PaintFilters, type: string) => {
    const allFiltersTrue = Object.keys(filters).every((k) => !filters[k]);
    const updatedFilters = {
      ...allFilters,
      [type]: Object.fromEntries(
        Object.keys(filters).map((key) => [key, allFiltersTrue])
      ),
    };
    setAllFilters(updatedFilters);
    setFilteredPaints(togglePaints(updatedFilters));
  };

  return (
    <StrictMode>
      <Layout>
        <h1>Paints ({filteredPaints.length})</h1>
        <hr />
        {Object.entries(allFilters).map(([key, value]) => (
          <FilterGroup
            key={key}
            filters={value}
            filteredPaints={filteredPaints}
            type={key as keyof PaintDetails}
            checked={
              !Object.keys(allFilters[key]).every((k) => !allFilters[key][k])
            }
            updateFilter={updateFilter}
            toggleAll={() => toggleAll(allFilters[key], key)}
          />
        ))}
        <br />
        <div className="grid justify-center w-full grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12">
          {filteredPaints.map((paint: PaintDetails) => (
            <Paint
              paint={paint}
              key={`${textToId(paint.company)}_${textToId(paint.name)}_${textToId(paint.category)}`}
              data-testid={`${textToId(paint.company)}_${textToId(paint.name)}_${textToId(paint.category)}`}
            />
          ))}
        </div>
      </Layout>
    </StrictMode>
  );
};

export default Paints;

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
  type: keyof PaintDetails;
  checked?: boolean;
  updateFilter: (type: string, field: string) => void;
  toggleAll: () => void;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const groupedCategories = useMemo(() => {
    if (type === 'category') {
      return Object.entries(filters).reduce(
        (groups, [key, value]) => {
          const companyName = PaintCompanies.find((company) =>
            key.startsWith(company)
          );
          if (companyName) {
            if (!groups[companyName]) {
              groups[companyName] = {};
            }
            groups[companyName][key] = value;
          }
          return groups;
        },
        {} as Record<string, Record<string, boolean>>
      );
    }
    return null;
  }, [filters, type]);

  return (
    <div
      data-testid={`filter-group-${textToId(type.replace(/\b\w/g, (l) => l.toUpperCase()))}`}
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
        <h3 className="m-0!">
          {type.replace(/\b\w/g, (l) => l.toUpperCase())}
        </h3>
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
            {groupedCategories ? (
              Object.entries(groupedCategories).map(
                ([company, filterGroup]) => (
                  <div key={`filter_group_${textToId(company)}`}>
                    {company && (
                      <div className="w-full py-1 text-sm font-bold">
                        {company}
                      </div>
                    )}
                    <div className="grid w-full grid-cols-2 mb-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
                      {Object.entries(filterGroup).map(([key, value]) => {
                        return (
                          <Filter
                            key={`filter_${textToId(key)}`}
                            name={
                              company
                                ? key.replace(company, '').trimStart()
                                : key
                            }
                            value={value}
                            toggle={() => updateFilter(type, key)}
                            count={
                              filteredPaints.filter((paint) => {
                                const paintValue = paint[type];
                                return Array.isArray(paintValue)
                                  ? paintValue.includes(
                                      key as PaintType & PaintGradient
                                    )
                                  : paintValue === key;
                              }).length
                            }
                          />
                        );
                      })}
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="grid w-full grid-cols-2 mb-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
                {Object.entries(filters).map(([key, value]) => {
                  return (
                    <Filter
                      key={`filter_${textToId(key)}`}
                      name={key}
                      value={value}
                      toggle={() => updateFilter(type, key)}
                      count={
                        filteredPaints.filter((paint) => {
                          const paintValue = paint[type];
                          return Array.isArray(paintValue)
                            ? paintValue.includes(
                                key as PaintType & PaintGradient
                              )
                            : paintValue === key;
                        }).length
                      }
                    />
                  );
                })}
              </div>
            )}
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
        {name.replace(/\b\w/g, (l) => l.toUpperCase())}
      </label>
      <span className="text-xs text-gray-400">({count})</span>
    </div>
  );
};

export const Head = () => <Seo title={'Paints'} pathname={'/paints'} />;
