import { AllPaintFilters, PaintDetails, PaintFilters } from '../types';
import {
  airPaints,
  basePaints,
  contrastPaints,
  dryPaints,
  layerPaints,
  shadePaints,
  sprayPaints,
  technicalPaints,
} from '../data/paints';

export const sortPaints = (a: PaintDetails, b: PaintDetails) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
};

export const getAllSortedPaints = () => [
  ...airPaints.sort(sortPaints),
  ...basePaints.sort(sortPaints),
  ...contrastPaints.sort(sortPaints),
  ...dryPaints.sort(sortPaints),
  ...layerPaints.sort(sortPaints),
  ...shadePaints.sort(sortPaints),
  ...sprayPaints.sort(sortPaints),
  ...technicalPaints.sort(sortPaints),
];

export const colorFilters: PaintFilters = {
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

export const typeFilters: PaintFilters = {
  air: true,
  base: true,
  contrast: true,
  dry: true,
  layer: true,
  shade: true,
  spray: true,
  technical: true,
};

export const availabilityFilters: PaintFilters = {
  available: true,
  discontinued: true,
};

export const togglePaints = (filters: AllPaintFilters) => {
  let filteredPaints = getAllSortedPaints();
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
