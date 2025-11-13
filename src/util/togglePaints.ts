import { PaintDetails } from '../types';
import { getAllSortedPaints } from './getAllSortedPaints';
import { sortPaints } from './sortPaints';

export type PaintFilters = {
  [key: string]: boolean;
};

export type AllPaintFilters = {
  [key: string]: PaintFilters;
};

export const togglePaints = (filters: AllPaintFilters): PaintDetails[] => {
  // Create a map of inactive filters for each type
  const activeFilters = Object.fromEntries(
    Object.entries(filters).map(([type, filter]) => [
      type,
      new Set(
        Object.entries(filter)
          .filter(([, value]) => !value) // Include only inactive filters
          .map(([key]) => key)
      ),
    ])
  ) as Record<string, Set<string>>;

  const isPaintFiltered = (paint: PaintDetails): boolean => {
    for (const [type, inactiveKeys] of Object.entries(activeFilters)) {
      const paintValue = paint[type as keyof PaintDetails];

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

  // Filter and sort paints
  const filteredPaints = getAllSortedPaints().filter(isPaintFiltered);
  return filteredPaints.sort(sortPaints);
};
