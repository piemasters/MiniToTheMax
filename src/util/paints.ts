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
} from '../data/paints/citadel';
import { gameColorPaints } from '../data/paints';

export const sortPaints = (a: PaintDetails, b: PaintDetails) => {
  if (`${a.company}${a.name}` < `${b.company}${b.name}`) return -1;
  if (`${a.company}${a.name}` > `${a.company}${a.name}`) return 1;
  return 0;
};

export const getAllSortedPaints = () => {
  const allPaints = [
    // citadel
    ...airPaints,
    ...basePaints,
    ...contrastPaints,
    ...dryPaints,
    ...layerPaints,
    ...shadePaints,
    ...sprayPaints,
    ...technicalPaints,
    // vallejo
    ...gameColorPaints,
  ];

  // Use a Map to remove duplicates based on a unique key
  const uniquePaints = new Map<string, PaintDetails>();
  allPaints.forEach((paint) => {
    const uniqueKey = `${paint.company}-${paint.name}-${paint.type.toString()}`;
    uniquePaints.set(uniqueKey, paint);
  });

  // Convert the Map back to an array and sort it
  return Array.from(uniquePaints.values()).sort(sortPaints);
};

export const companyFilters: PaintFilters = {
  Citadel: true,
  Vallejo: true,
};

export const categoryFilters: PaintFilters = {
  'Citadel All': true,
  'Vallejo Game Color': true,
  'Vallejo Model Color': true,
  'Vallejo Liquid Metal': true,
  'Vallejo Model Air': true,
  'Vallejo Metal Color': true,
  'Vallejo Game Air': true,
  'Vallejo Xpress Color': true,
};

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
  contrast: true, // vallejo xpress
  dry: true,
  layer: true, // vallejo default
  metallic: true,
  shade: true, // vallejo wash
  spray: true,
  technical: true, // vallejo special fx
  fluo: true,
  ink: true,
};

export const availabilityFilters: PaintFilters = {
  available: true,
  discontinued: true,
};

export const togglePaints = (filters: AllPaintFilters) => {
  const activeFilters = Object.entries(filters).reduce(
    (acc, [type, filter]) => {
      acc[type] = new Set(
        Object.entries(filter)
          .filter(([, value]) => !value) // Only include inactive filters
          .map(([key]) => key)
      );
      return acc;
    },
    {} as Record<string, Set<string>>
  );

  const isPaintFiltered = (paint: PaintDetails): boolean => {
    for (const [type, inactiveKeys] of Object.entries(activeFilters)) {
      const paintValue = paint[type as keyof PaintDetails];
      if (inactiveKeys.size > 0) {
        if (Array.isArray(paintValue)) {
          // Check if all values in the array are inactive
          const hasActiveValue = paintValue.some(
            (value) => typeof value === 'string' && !inactiveKeys.has(value)
          );
          if (!hasActiveValue) {
            return false;
          }
        } else {
          // Check if the single value matches an inactive filter
          if (
            paintValue &&
            typeof paintValue === 'string' &&
            inactiveKeys.has(paintValue)
          ) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const filteredPaints = getAllSortedPaints().filter(isPaintFiltered);
  return filteredPaints.sort(sortPaints);
};
