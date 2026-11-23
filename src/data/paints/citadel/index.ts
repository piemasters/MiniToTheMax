import { airPaints } from './air';
import { basePaints } from './base';
import { contrastPaints } from './contrast';
import { dryPaints } from './dry';
import { layerPaints } from './layer';
import { shadePaints } from './shade';
import { sprayPaints } from './spray';
import { technicalPaints } from './technical';
import { toneProPaints } from './tone-pro';

export {
  airPaints,
  basePaints,
  contrastPaints,
  dryPaints,
  layerPaints,
  shadePaints,
  sprayPaints,
  technicalPaints,
  toneProPaints,
};

export const citadelPaints = [
  ...airPaints,
  ...basePaints,
  ...contrastPaints,
  ...dryPaints,
  ...layerPaints,
  ...shadePaints,
  ...sprayPaints,
  ...technicalPaints,
  ...toneProPaints,
];
