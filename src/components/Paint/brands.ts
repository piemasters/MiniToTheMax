import type { PaintCompany } from '../../types';
import type { BrandRenderer } from './shared/BrandRenderer';
import { citadel } from './citadel';
import { vallejo } from './vallejo';
import { ionic } from './ionic';

export const brands: Record<PaintCompany, BrandRenderer> = {
  Citadel: citadel,
  Vallejo: vallejo,
  Ionic: ionic,
};
