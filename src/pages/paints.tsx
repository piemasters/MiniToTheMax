import React, { useState } from 'react';
import Layout from '../layouts/layout';
import Seo from '../components/stateful/seo';
import { airPaints } from '../data/paints/air';
import { basePaints } from '../data/paints/base';
import { contrastPaints } from '../data/paints/contrast';
import { dryPaints } from '../data/paints/dry';
import { layerPaints } from '../data/paints/layer';
import { shadePaints } from '../data/paints/shade';
import { sprayPaints } from '../data/paints/spray';
import { technicalPaints } from '../data/paints/technical';
import Paint from '../components/paint';
import { PaintDetails } from '../types/app.types';
export interface PaintFilters {
  [key: string]: boolean;
}

export interface AllPaintFilters {
  [key: string]: PaintFilters;
}

const Paints = (): React.ReactNode => {
  const sortPaints = (a: PaintDetails, b: PaintDetails) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  };

  const allPaints = [
    ...airPaints.sort(sortPaints),
    ...basePaints.sort(sortPaints),
    ...contrastPaints.sort(sortPaints),
    ...dryPaints.sort(sortPaints),
    ...layerPaints.sort(sortPaints),
    ...shadePaints.sort(sortPaints),
    ...sprayPaints.sort(sortPaints),
    ...technicalPaints.sort(sortPaints),
  ];

  const [filteredPaints, setFilteredPaints] = useState([...allPaints]);

  const colorFilters: PaintFilters = {
    black: true,
    blue: true,
    bone: true,
    brass: true,
    bronze: true,
    brown: true,
    clear: true,
    copper: true,
    flesh: true,
    gold: true,
    green: true,
    grey: true,
    orange: true,
    pink: true,
    purple: true,
    red: true,
    silver: true,
    turquoise: true,
    white: true,
    yellow: true,
  };

  const typeFilters: PaintFilters = {
    air: true,
    base: true,
    contrast: true,
    dry: true,
    layer: true,
    shade: true,
    spray: true,
    technical: true,
  };

  const availabilityFilters: PaintFilters = {
    available: true,
    discontinued: true,
  };

  const [allFilters, setAllFilters] = useState<AllPaintFilters>({
    color: { ...colorFilters },
    type: { ...typeFilters },
    availability: { ...availabilityFilters },
  });

  const togglePaints = (filters: AllPaintFilters) => {
    let filteredPaints = [...allPaints];
    for (const [type, filter] of Object.entries(filters)) {
      for (const [key, value] of Object.entries(filter)) {
        if (!value) {
          filteredPaints = filteredPaints.filter(
            (paint: PaintDetails) => paint[type] !== key
          );
        }
      }
    }
    filteredPaints.sort(sortPaints);
    return filteredPaints;
  };

  const updateFilter = (type: string, field: string) => {
    allFilters[type][field] = !allFilters[type][field];
    setAllFilters(allFilters);
    setFilteredPaints(togglePaints(allFilters));
  };

  const toggleAll = (filters: PaintFilters, type: string) => {
    const allFiltersTrue = Object.keys(filters).every((k) => !filters[k]);
    Object.keys(allFilters[type]).forEach(
      (v) => (allFilters[type][v] = allFiltersTrue)
    );
    setAllFilters(allFilters);
    setFilteredPaints(togglePaints(allFilters));
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
