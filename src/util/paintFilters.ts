import {
  AllPaintCategories,
  PaintAvailabilities,
  PaintColors,
  PaintCompanies,
  PaintTypes,
} from '../types';
import { PaintFilters } from './togglePaints';

// Build filters from types, with all values set to true by default

export const companyFilters: PaintFilters = PaintCompanies.reduce(
  (filters, company) => {
    filters[company] = true;
    return filters;
  },
  {} as PaintFilters
);

export const categoryFilters: PaintFilters = [...AllPaintCategories]
  .sort((a, b) => a.localeCompare(b))
  .reduce((filters, category) => {
    filters[category] = true;
    return filters;
  }, {} as PaintFilters);

export const colorFilters: PaintFilters = PaintColors.reduce(
  (filters, color) => {
    filters[color] = true;
    return filters;
  },
  {} as PaintFilters
);

export const typeFilters: PaintFilters = PaintTypes.reduce((filters, type) => {
  filters[type] = true;
  return filters;
}, {} as PaintFilters);

export const availabilityFilters: PaintFilters = PaintAvailabilities.reduce(
  (filters, availability) => {
    filters[availability] = true;
    return filters;
  },
  {} as PaintFilters
);
