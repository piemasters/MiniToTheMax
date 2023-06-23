import React, { useState } from 'react';

import Layout from '../layouts/layout';
import { Paint, StatefulSeo as Seo } from '../components';

import type { AllPaintFilters, PaintDetails, PaintFilters } from '../types';
import {
  availabilityFilters,
  colorFilters,
  getAllSortedPaints,
  togglePaints,
  typeFilters,
} from '../util';

export const Paints = (): React.ReactNode => {
  const allPaints = getAllSortedPaints();
  const [filteredPaints, setFilteredPaints] = useState([...allPaints]);

  const [allFilters, setAllFilters] = useState<AllPaintFilters>({
    color: { ...colorFilters },
    type: { ...typeFilters },
    availability: { ...availabilityFilters },
  });

  const updateFilter = (type: string, field: string) => {
    const updatedFilters = allFilters;
    updatedFilters[type][field] = !updatedFilters[type][field];
    setAllFilters(updatedFilters);
    setFilteredPaints(togglePaints(updatedFilters));
  };

  const toggleAll = (filters: PaintFilters, type: string) => {
    const updatedFilters = allFilters;
    const allFiltersTrue = Object.keys(filters).every((k) => !filters[k]);
    Object.keys(updatedFilters[type]).forEach(
      (v) => (updatedFilters[type][v] = allFiltersTrue)
    );
    setAllFilters(updatedFilters);
    setFilteredPaints(togglePaints(updatedFilters));
  };

  const filterElements = (filters: PaintFilters, type: string) => {
    const filtersJsx: JSX.Element[] = [];
    for (const [key, value] of Object.entries(filters)) {
      filtersJsx.push(
        <div style={{ fontSize: '0.8rem', width: '6rem' }} key={key}>
          <label style={{ alignItems: 'center', display: 'flex' }}>
            <input
              name={key}
              checked={value}
              type="checkbox"
              onChange={() => updateFilter(type, key)}
              style={{ marginRight: '0.4rem' }}
            />
            {key.replace(/\b\w/g, (l) => l.toUpperCase())}
          </label>
        </div>
      );
    }
    return (
      <div>
        <h3>{type.replace(/\b\w/g, (l) => l.toUpperCase())}</h3>
        <label
          style={{
            alignItems: 'center',
            display: 'flex',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            marginBottom: '0.3rem',
          }}
        >
          <input
            checked={
              !Object.keys(allFilters[type]).every((k) => !allFilters[type][k])
            }
            type="checkbox"
            onChange={() => toggleAll(allFilters[type], type)}
            style={{ marginRight: '0.4rem' }}
          />
          Toggle All
        </label>
        <div
          style={{
            display: 'flex',
            flexFlow: 'row wrap',
            marginBottom: '1rem',
            width: '100%',
          }}
        >
          {filtersJsx}
        </div>
        <hr />
      </div>
    );
  };

  const allFilterElements = () => {
    const filters: JSX.Element[] = [];
    for (const [key, value] of Object.entries(allFilters)) {
      filters.push(<div key={key}>{filterElements(value, key)}</div>);
    }
    return <div>{filters}</div>;
  };

  return (
    <Layout>
      <h1>Paints ({filteredPaints.length})</h1>
      <hr />
      {allFilterElements()}
      <br />
      {filteredPaints.map((paint: PaintDetails) => {
        return <Paint paint={paint} key={`${paint.name}_${paint.type}`} />;
      })}
    </Layout>
  );
};

export default Paints;

export const Head = () => <Seo title={'Paints'} pathname={'/paints'} />;
