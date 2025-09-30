import { PaintDetails } from '../types';
import { textToId } from './textToId';
import { sortPaints } from './sortPaints';
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

export const getAllSortedPaints = (): PaintDetails[] => {
  const allPaints: PaintDetails[] = [
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

  // Remove duplicates using a Set
  const uniquePaints = Array.from(
    new Set(
      allPaints.map(
        (paint) =>
          `${textToId(paint.company)}_${textToId(paint.name)}_${textToId(paint.category)}`
      )
    )
  ).map((uniqueKey) =>
    allPaints.find(
      (paint) =>
        `${textToId(paint.company)}_${textToId(paint.name)}_${textToId(paint.category)}` ===
        uniqueKey
    )
  ) as PaintDetails[];

  // Sort the paints using the sortPaints function
  return uniquePaints.sort(sortPaints);
};
