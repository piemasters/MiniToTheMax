import React, { useEffect, useState } from 'react';
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

export interface PaintFiltersObject {
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

  const [colorFilters, setColorFilters] = useState<PaintFilters>({
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
  });

  const [typeFilters, setTypeFilters] = useState<PaintFilters>({
    air: true,
    base: true,
    contrast: true,
    dry: true,
    layer: true,
    shade: true,
    spray: true,
    technical: true,
  });

  const [allFilters, setAllFilters] = useState<PaintFiltersObject>({
    color: { ...colorFilters },
    type: { ...typeFilters },
  });

  const togglePaints = (filters: PaintFiltersObject) => {
    let filteredPaints = [...allPaints];
    for (const [type, filter] of Object.entries(filters)) {
      for (const [key, value] of Object.entries(filter)) {
        if (!filter[key]) {
          filteredPaints = filteredPaints.filter(
            (paint: PaintDetails) => paint[type] !== key
          );
        }
      }
    }
    return filteredPaints;
  };

  const updateFilter = (type: string, field: string) => {
    if (type === 'color') {
      const updatedFilters: PaintFilters = colorFilters;
      updatedFilters[field] = !updatedFilters[field];
      setColorFilters(updatedFilters);
      setFilteredPaints(
        togglePaints({ color: updatedFilters, type: typeFilters })
      );
    } else if (type === 'type') {
      const updatedFilters: PaintFilters = typeFilters;
      updatedFilters[field] = !updatedFilters[field];
      setTypeFilters(updatedFilters);
      setFilteredPaints(
        togglePaints({ color: colorFilters, type: updatedFilters })
      );
    }
  };

  const toggleAll = (filters: PaintFilters, type: string) => {
    const allFiltersTrue = Object.keys(filters).every((k) => !filters[k]);
    Object.keys(allFilters[type]).forEach(
      (v) => (allFilters[type][v] = allFiltersTrue)
    );
    switch (type) {
      case 'color':
        setColorFilters(allFilters[type]);
        break;
      case 'type':
        setTypeFilters(allFilters[type]);
        break;
    }
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
      height: 1rem;
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
    return filtersJsx;
  };

  return (
    <Layout>
      <Seo title={'Paints'} pathname={'/paints'} />
      <h1>Paints</h1>
      <hr />
      <h3>Colors</h3>
      <label>
        <input
          name={'toggleAllColor'}
          checked={!Object.keys(colorFilters).every((k) => !colorFilters[k])}
          type="checkbox"
          onChange={() => toggleAll(colorFilters, 'color')}
        />{' '}
        Toggle All
      </label>
      <div css={filterWrapperStyle}>
        {filterElements(colorFilters, 'color')}
      </div>
      <hr />
      <h3>Paint Type</h3>
      <label>
        <input
          name={'toggleAllColor'}
          checked={!Object.keys(typeFilters).every((k) => !typeFilters[k])}
          type="checkbox"
          onChange={() => toggleAll(typeFilters, 'type')}
        />{' '}
        Toggle All
      </label>
      <div css={filterWrapperStyle}>{filterElements(typeFilters, 'type')}</div>
      <hr />
      <br />
      {filteredPaints.map((paint: PaintDetails) => {
        return <Paint {...paint} key={`${paint.name}_${paint.type}`} />;
      })}
    </Layout>
  );
};

export default Paints;
