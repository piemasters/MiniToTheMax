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
import { css } from '@emotion/core';

export interface PaintFilters {
  [key: string]: boolean;
}

export interface AllPaintFilters {
  [key: string]: PaintFilters;
}

const Paints = () => {
  const allPaints = [
    ...airPaints,
    ...basePaints,
    ...contrastPaints,
    ...dryPaints,
    ...layerPaints,
    ...shadePaints,
    ...sprayPaints,
    ...technicalPaints,
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

  const [allFilters, setAllFilters] = useState<AllPaintFilters>({
    color: { ...colorFilters },
    type: { ...typeFilters },
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

  const filterWrapperStyle = css`
    display: flex;
    flex-flow: row wrap;
    margin-bottom: 1rem;
    width: 100%;
  `;

  const filterStyle = css`
    font-size: 0.8rem;
    width: 6rem;
    label {
      align-items: center;
      display: flex;
    }
    input {
      margin-right: 0.4rem;
    }
  `;

  const toggleAllStyles = css`
    align-items: center;
    display: flex;
    font-size: 0.9rem;
    font-weight: bold;
    margin-bottom: 0.3rem;

    input {
      margin-right: 0.4rem;
    }
  `;

  const filterElements = (filters: PaintFilters, type: string) => {
    const filtersJsx: JSX.Element[] = [];
    for (const [key, value] of Object.entries(filters)) {
      filtersJsx.push(
        <div css={filterStyle} key={key}>
          <label>
            <input
              name={key}
              checked={value}
              type="checkbox"
              onChange={() => updateFilter(type, key)}
            />
            {key.replace(/\b\w/g, (l) => l.toUpperCase())}
          </label>
        </div>
      );
    }
    return (
      <div>
        <h3>{type.replace(/\b\w/g, (l) => l.toUpperCase())}</h3>
        <label css={toggleAllStyles}>
          <input
            checked={
              !Object.keys(allFilters[type]).every((k) => !allFilters[type][k])
            }
            type="checkbox"
            onChange={() => toggleAll(allFilters[type], type)}
          />
          Toggle All
        </label>
        <div css={filterWrapperStyle}>{filtersJsx}</div>
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
      <Seo title={'Paints'} pathname={'/paints'} />
      <h1>Paints</h1>
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
