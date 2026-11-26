import { AllPaintCategories, PaintCategory, PaintDetails } from '../../types';
import { getAllSortedPaints } from './getAllSortedPaints';

const allPaints = getAllSortedPaints();

export type GetPaintResult =
  | { paint: PaintDetails; error?: never; type?: never }
  | { paint?: never; error: string; type: string };

const getCategoryPriority = (category: PaintCategory) => {
  const index = AllPaintCategories.indexOf(category);
  return index === -1 ? Infinity : index;
};

export const getPaint = (
  name: string,
  category?: PaintCategory
): GetPaintResult => {
  const paintMatches = allPaints.filter((paint) => paint.name === name);

  if (paintMatches.length === 0) {
    return { error: 'Incorrect Paint Name', type: name };
  }

  if (paintMatches.length === 1) {
    return { paint: paintMatches[0] };
  }

  if (category) {
    const categoryMatch = paintMatches.find(
      (paint) => paint.category === category
    );
    return categoryMatch
      ? { paint: categoryMatch }
      : { error: 'Incorrect Paint Category', type: category };
  }

  paintMatches.sort(
    (a, b) => getCategoryPriority(a.category) - getCategoryPriority(b.category)
  );

  return { paint: paintMatches[0] };
};
