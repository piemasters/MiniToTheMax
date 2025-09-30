import {
  CitadelPaintCategories,
  PaintCategory,
  PaintDetails,
  VallejoPaintCategories,
} from '../types';
import { getAllSortedPaints } from './getAllSortedPaints';

const allPaints = getAllSortedPaints();

const paintCategoryPriority = [
  ...CitadelPaintCategories,
  ...VallejoPaintCategories,
] as const;

type category = (typeof paintCategoryPriority)[number];

export const getPaint = (
  name: string,
  category?: PaintCategory
): { paint?: PaintDetails; error?: string; type?: string } => {
  const paintMatches = allPaints.filter((paint) => paint.name === name);

  if (paintMatches.length === 0) {
    return { error: 'Incorrect Paint Name', type: name };
  }

  if (paintMatches.length === 1) {
    return { paint: paintMatches[0] };
  }

  if (category) {
    const categoryMatches = paintMatches.filter(
      (paint) => paint.category === category
    );
    if (categoryMatches.length === 0) {
      return { error: 'Incorrect Paint Category', type: category };
    }
    return { paint: categoryMatches[0] };
  }

  const getCategoryPriority = (category: PaintCategory) => {
    const index = paintCategoryPriority.indexOf(category);
    return index === -1 ? Infinity : index;
  };
  paintMatches.sort(
    (a, b) => getCategoryPriority(a.category) - getCategoryPriority(b.category)
  );

  return { paint: paintMatches[0] };
};
