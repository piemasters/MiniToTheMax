import React, { ReactNode, StrictMode, useMemo, useState } from 'react';

import Layout from '../layouts/layout';
import { Paint, StatefulSeo as Seo } from '../components';

import type {
  AllPaintFilters,
  PaintDetails,
  PaintFilters,
  PaintGradient,
  PaintType,
} from '../types';
import {
  availabilityFilters,
  companyFilters,
  colorFilters,
  typeFilters,
  categoryFilters,
} from '../util/paintFilters';
import { getAllSortedPaints } from '../util/getAllSortedPaints';
import { togglePaints } from '../util/togglePaints';
import { textToId } from '../util/textToId';

export const Paints = (): React.ReactNode => {
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
        {filteredPaints.map((paint: PaintDetails) => (
          <Paint
            paint={paint}
            key={`${textToId(paint.company)}_${textToId(paint.name)}_${textToId(paint.category)}`}
            data-testid={`${textToId(paint.company)}_${textToId(paint.name)}_${textToId(paint.category)}`}
          />
        ))}
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
  const groupedCategories = useMemo(() => {
    if (type === 'category') {
      return Object.entries(filters).reduce(
        (groups, [key, value]) => {
          if (key.includes('Citadel')) {
            groups.citadel[key] = value;
          } else if (key.includes('Vallejo')) {
            groups.vallejo[key] = value;
          }
          return groups;
        },
        { citadel: {}, vallejo: {} } as Record<
          'citadel' | 'vallejo',
          Record<string, boolean>
        >
      );
    }
    return null;
  }, [filters, type]);

  return (
    <div
      data-testid={`filter-group-${textToId(type.replace(/\b\w/g, (l) => l.toUpperCase()))}`}
      className=""
    >
      <h3>{type.replace(/\b\w/g, (l) => l.toUpperCase())}</h3>
      <label className="flex items-center gap-2 mb-2 text-xs font-bold">
        <input checked={checked} type="checkbox" onChange={toggleAll} />
        Toggle All
      </label>
      <div className="flex flex-row flex-wrap w-full mb-4">
        {groupedCategories ? (
          <>
            <FilterSubGroup
              filterGroup={groupedCategories.citadel}
              label="Citadel"
              type={type}
              filteredPaints={filteredPaints}
              updateFilter={updateFilter}
            />
            <FilterSubGroup
              filterGroup={groupedCategories.vallejo}
              label="Vallejo"
              type={type}
              filteredPaints={filteredPaints}
              updateFilter={updateFilter}
            />
          </>
        ) : (
          <FilterSubGroup
            filterGroup={filters}
            type={type}
            updateFilter={updateFilter}
            filteredPaints={filteredPaints}
          />
        )}
      </div>
      <hr />
    </div>
  );
};

const FilterSubGroup = ({
  filterGroup,
  label,
  type,
  filteredPaints,
  updateFilter,
}: {
  filterGroup: Record<string, boolean>;
  label?: string;
  type: keyof PaintDetails;
  filteredPaints: PaintDetails[];
  updateFilter: (type: string, field: string) => void;
}) => {
  return (
    <>
      {label && <div className="w-full py-1 text-sm font-bold">{label}</div>}
      {Object.entries(filterGroup).map(([key, value]) => {
        return (
          <Filter
            key={`filter_${textToId(key)}`}
            name={label ? key.replace(label, '').trimStart() : key}
            value={value}
            type={type}
            toggle={() => updateFilter(type, key)}
            count={
              filteredPaints.filter((paint) => {
                const paintValue = paint[type];
                return Array.isArray(paintValue)
                  ? paintValue.includes(key as PaintType & PaintGradient)
                  : paintValue === key;
              }).length
            }
          />
        );
      })}
    </>
  );
};

const Filter = ({
  name,
  value,
  type,
  toggle,
  count,
}: {
  name: string;
  value: boolean;
  type: keyof PaintDetails;
  toggle: () => void;
  count: number;
}) => {
  return (
    <div
      data-testid={`filter_${textToId(name)}`}
      className="flex items-center justify-between px-2 text-sm border-r w-36"
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
