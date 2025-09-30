import React, { useMemo, useState } from 'react';

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

  const names = allPaints.map(
    (paint) =>
      `${textToId(paint.company)}_${textToId(paint.name)}_${textToId(paint.category)}`
  );

  const uniq = names
    .map((name) => {
      return {
        count: 1,
        name: name,
      };
    })
    .reduce((result, b) => {
      result[b.name] = (result[b.name] || 0) + b.count;

      return result;
    }, {});
  const duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1);
  console.log('duplicates', duplicates);

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

  const filterElements = (filters: PaintFilters, type: keyof PaintDetails) => {
    const groupedCategories = useMemo(() => {
      if (type === 'category') {
        const citadelCategories: Record<string, boolean> = {};
        const vallejoCategories: Record<string, boolean> = {};
        Object.entries(filters).forEach(([key, value]) => {
          if (key.includes('Citadel')) {
            citadelCategories[key] = value;
          } else if (key.includes('Vallejo')) {
            vallejoCategories[key] = value;
          }
        });
        return { citadelCategories, vallejoCategories };
      }
      return null;
    }, [filters, type]);

    const getMatchCount = (filterKey: string): number => {
      return filteredPaints.filter((paint) => {
        const paintValue = paint[type];
        if (Array.isArray(paintValue)) {
          return paintValue.includes(filterKey as PaintType & PaintGradient);
        }
        return paintValue === filterKey;
      }).length;
    };

    const renderFilters = (
      filterGroup: Record<string, boolean>,
      label: string
    ) => (
      <>
        <div className="w-full py-1 text-sm font-bold">{label}</div>
        {Object.entries(filterGroup).map(([key, value]) => (
          <div
            className="flex items-center justify-between w-40 px-2 text-sm"
            key={key}
          >
            <label className="flex items-center gap-2">
              <input
                name={key}
                checked={value}
                type="checkbox"
                onChange={() => updateFilter(type, key)}
              />
              {key.replace(/\b\w/g, (l) => l.toUpperCase()).slice(label.length)}
            </label>
            <span className="text-xs text-gray-400">
              ({getMatchCount(key)})
            </span>
          </div>
        ))}
      </>
    );

    const filtersJsx = groupedCategories
      ? [
          renderFilters(groupedCategories.citadelCategories, 'Citadel'),
          renderFilters(groupedCategories.vallejoCategories, 'Vallejo'),
        ]
      : Object.entries(filters).map(([key, value]) => (
          <div
            className="flex items-center justify-between px-2 text-sm w-36"
            key={key}
          >
            <label className="flex items-center gap-2">
              <input
                name={key}
                checked={value}
                type="checkbox"
                onChange={() => updateFilter(type, key)}
              />
              {key.replace(/\b\w/g, (l) => l.toUpperCase())}
            </label>
            <span className="text-xs text-gray-400">
              ({getMatchCount(key)})
            </span>
          </div>
        ));

    return (
      <div>
        <h3>{type.replace(/\b\w/g, (l) => l.toUpperCase())}</h3>
        <label className="flex items-center gap-2 mb-2 text-xs font-bold">
          <input
            checked={
              !Object.keys(allFilters[type]).every((k) => !allFilters[type][k])
            }
            type="checkbox"
            onChange={() => toggleAll(allFilters[type], type)}
          />
          Toggle All
        </label>
        <div className="flex flex-row flex-wrap w-full mb-4">{filtersJsx}</div>
        <hr />
      </div>
    );
  };

  const allFilterElements = () => (
    <div>
      {Object.entries(allFilters).map(([key, value]) => (
        <div key={key}>{filterElements(value, key as keyof PaintDetails)}</div>
      ))}
    </div>
  );

  return (
    <Layout>
      <h1>Paints ({filteredPaints.length})</h1>
      <hr />
      {allFilterElements()}
      <br />
      {filteredPaints.map((paint: PaintDetails) => (
        <Paint
          paint={paint}
          key={`${textToId(paint.company)}_${textToId(paint.name)}_${textToId(paint.category)}`}
          data-testid={`${textToId(paint.company)}_${textToId(paint.name)}_${textToId(paint.category)}`}
        />
      ))}
    </Layout>
  );
};

export default Paints;

export const Head = () => <Seo title={'Paints'} pathname={'/paints'} />;
