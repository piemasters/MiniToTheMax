import type { PaintDetails } from '../../types';
import { citadelPaints } from './citadel';
import { vallejoPaints } from './vallejo';
import { ionicPaints } from './ionic';

export * from './citadel';
export * from './vallejo';
export * from './ionic';

// Adding a brand: add its combined array here.
export const allPaints: PaintDetails[] = [
  ...citadelPaints,
  ...vallejoPaints,
  ...ionicPaints,
];
