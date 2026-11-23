import {
  AllPaintCategories,
  PaintAvailabilities,
  PaintColors,
  PaintCompanies,
  PaintTypes,
} from '../types';
import type { AllPaintFilters, PaintFilters } from './togglePaints';

const toFilters = (values: readonly string[]): PaintFilters =>
  Object.fromEntries(values.map((value) => [value, true]));

// Every filter starts enabled
export const initialFilters: AllPaintFilters = {
  company: toFilters(PaintCompanies),
  category: toFilters(
    [...AllPaintCategories].sort((a, b) => a.localeCompare(b))
  ),
  color: toFilters(PaintColors),
  type: toFilters(PaintTypes),
  availability: toFilters(PaintAvailabilities),
};
