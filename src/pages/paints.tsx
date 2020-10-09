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

  const togglePaints = (
    colorFilters: PaintFilters,
    typeFilters: PaintFilters
  ) => {
    let filteredPaints = [...allPaints];
    for (const [key, value] of Object.entries(colorFilters)) {
      if (!colorFilters[key]) {
        filteredPaints = filteredPaints.filter((paint) => paint.color !== key);
      }
    }
    for (const [key, value] of Object.entries(typeFilters)) {
      if (!typeFilters[key]) {
        filteredPaints = filteredPaints.filter((paint) => paint.type !== key);
      }
    }
    return filteredPaints;
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

  const filterColorElements = () => {
    const filters: JSX.Element[] = [];
    for (const [key, value] of Object.entries(colorFilters)) {
      filters.push(
        <div css={filterStyle} key={key}>
          <label>
            <input
              name={key}
              checked={value}
              type="checkbox"
              onChange={() => updateColor(key)}
            />
            {key.replace(/\b\w/g, (l) => l.toUpperCase())}
          </label>
        </div>
      );
    }
    return filters;
  };

  const filterTypeElements = () => {
    const filters: JSX.Element[] = [];
    for (const [key, value] of Object.entries(typeFilters)) {
      filters.push(
        <div key={key} css={filterStyle}>
          <label>
            <input
              name={key}
              checked={value}
              type="checkbox"
              onChange={() => updateType(key)}
            />
            {key.replace(/\b\w/g, (l) => l.toUpperCase())}
          </label>
        </div>
      );
    }
    return filters;
  };

  const updateColor = (color: string) => {
    const updatedFilters: PaintFilters = colorFilters;
    updatedFilters[color] = !updatedFilters[color];
    setColorFilters(updatedFilters);
    setFilteredPaints(togglePaints(updatedFilters, typeFilters));
  };

  const updateType = (type: string) => {
    const updatedFilters: PaintFilters = typeFilters;
    updatedFilters[type] = !updatedFilters[type];
    setTypeFilters(updatedFilters);
    setFilteredPaints(togglePaints(colorFilters, updatedFilters));
  };

  const allColorFilters = Object.keys(colorFilters).every(
    (k) => !colorFilters[k]
  );
  const allTypeFilters = Object.keys(typeFilters).every((k) => !typeFilters[k]);

  const allFiltersActive = (filters: PaintFilters) => {
    return Object.keys(filters).every((k) => !filters[k]);
  };

  const setAllFilters = (filters: PaintFilters, value: boolean) => {
    const updatedFilters: PaintFilters = { ...filters };
    Object.keys(updatedFilters).forEach((v) => (updatedFilters[v] = value));
    return updatedFilters;
  };

  const toggleAll = (type: string) => {
    if (type === 'color') {
      const updatedFilters = setAllFilters(
        colorFilters,
        allFiltersActive(colorFilters)
      );
      setColorFilters(updatedFilters);
      setFilteredPaints(togglePaints(updatedFilters, typeFilters));
    }
    if (type === 'type') {
      const updatedFilters = setAllFilters(
        typeFilters,
        allFiltersActive(typeFilters)
      );
      setTypeFilters(updatedFilters);
      setFilteredPaints(togglePaints(colorFilters, updatedFilters));
    }
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
          checked={!allColorFilters}
          type="checkbox"
          onChange={() => toggleAll('color')}
        />{' '}
        Toggle All
      </label>
      <div css={filterWrapperStyle}>{filterColorElements()}</div>
      <hr />
      <h3>Paint Type</h3>
      <label>
        <input
          name={'toggleAllColor'}
          checked={!allTypeFilters}
          type="checkbox"
          onChange={() => toggleAll('type')}
        />{' '}
        Toggle All
      </label>
      <div css={filterWrapperStyle}>{filterTypeElements()}</div>
      <hr />
      <br />
      {filteredPaints.map((paint: PaintDetails) => {
        return <Paint {...paint} key={`${paint.name}_${paint.type}`} />;
      })}
    </Layout>
  );
};

export default Paints;
