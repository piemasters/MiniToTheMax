import { gameColorPaints } from './game';
import { liquidMetalPaints } from './liquid-metal';
import { metalPaints } from './metal';
import { modelColorPaints } from './model';
import { squidmarColorPaints } from './squidmar';
import { xpressColorPaints } from './xpress';

export * from './game';
export * from './liquid-metal';
export * from './metal';
export * from './model';
export * from './squidmar';
export * from './xpress';

export const vallejoPaints = [
  ...gameColorPaints,
  ...liquidMetalPaints,
  ...metalPaints,
  ...modelColorPaints,
  ...squidmarColorPaints,
  ...xpressColorPaints,
];
