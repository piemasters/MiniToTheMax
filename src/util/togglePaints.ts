import { PaintDetails } from '../types';
import { getAllSortedPaints } from './getAllSortedPaints';

export const FilterFields = [
  'company',
  'category',
  'color',
  'type',
  'availability',
] as const satisfies readonly (keyof PaintDetails)[];
export type FilterField = (typeof FilterFields)[number];

export type PaintFilters = Record<string, boolean>;
export type AllPaintFilters = Record<FilterField, PaintFilters>;

export const togglePaints = (filters: AllPaintFilters): PaintDetails[] => {
  // Create a map of inactive filters for each type
  const activeFilters = FilterFields.map(
    (field) =>
      [
        field,
        new Set(
          Object.entries(filters[field])
            .filter(([, value]) => !value) // Include only inactive filters
            .map(([key]) => key)
        ),
      ] as const
  );

  const isPaintFiltered = (paint: PaintDetails): boolean => {
    for (const [type, inactiveKeys] of activeFilters) {
      const paintValue = paint[type];

      if (inactiveKeys.size > 0) {
        if (Array.isArray(paintValue)) {
          // Check if at least one value in the array is active
          if (
            paintValue.some(
              (value) => typeof value === 'string' && !inactiveKeys.has(value)
            )
          ) {
            continue; // Paint is not filtered for this type
          }
          return false; // All values are inactive
        } else if (
          typeof paintValue === 'string' &&
          inactiveKeys.has(paintValue)
        ) {
          return false; // Single value matches an inactive filter
        }
      }
    }
    return true; // Paint passes all filters
  };

  // Already sorted, and filtering keeps the order
  return getAllSortedPaints().filter(isPaintFiltered);
};
