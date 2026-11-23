import type { PaintDetails } from '../types';
import { allPaints } from '../data/paints';
import { sortPaints } from './sortPaints';

let cached: PaintDetails[] | undefined;

export const getAllSortedPaints = (): PaintDetails[] => {
  cached ??= [...allPaints].sort(sortPaints);
  return [...cached];
};
