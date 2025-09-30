import { PaintDetails } from '../types';

export const sortPaints = (a: PaintDetails, b: PaintDetails): number => {
  // Compare company names
  if (a.company < b.company) return -1;
  if (a.company > b.company) return 1;

  // Compare categories
  if (a.category < b.category) return -1;
  if (a.category > b.category) return 1;

  // Compare names
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;

  // If all are equal, return 0
  return 0;
};
