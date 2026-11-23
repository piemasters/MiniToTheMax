import type { PaintDetails } from '../types';
import { getAllSortedPaints } from './getAllSortedPaints';

const vallejoB: PaintDetails = {
  name: 'Game Color Paint B',
  category: 'Vallejo Game Color',
  company: 'Vallejo',
  hex: '#FFFF00',
  color: 'yellow',
  availability: 'available',
  type: ['core'],
};
const ionicA: PaintDetails = {
  name: 'Smart Color A',
  category: 'IONIC Smart Colors',
  company: 'Ionic',
  hex: '#FF00FF',
  color: 'pink',
  availability: 'available',
  type: ['core'],
};
const vallejoA: PaintDetails = {
  name: 'Game Color Paint A',
  category: 'Vallejo Game Color',
  company: 'Vallejo',
  hex: '#0000FF',
  color: 'blue',
  availability: 'available',
  type: ['core'],
};
const citadelBase: PaintDetails = {
  name: 'Base Paint A',
  category: 'Citadel Base',
  company: 'Citadel',
  hex: '#00FF00',
  color: 'green',
  availability: 'available',
  type: ['core'],
};
const citadelAir: PaintDetails = {
  name: 'Air Paint A',
  category: 'Citadel Air',
  company: 'Citadel',
  hex: '#FF0000',
  color: 'red',
  availability: 'available',
  type: ['air'],
};

jest.mock('../data/paints', () => ({
  // Deliberately unsorted
  get allPaints() {
    return [vallejoB, ionicA, vallejoA, citadelBase, citadelAir];
  },
}));

describe('getAllSortedPaints', () => {
  it('sorts by company, then category, then name', () => {
    expect(getAllSortedPaints()).toEqual([
      citadelAir,
      citadelBase,
      ionicA,
      vallejoA,
      vallejoB,
    ]);
  });

  it('returns a fresh array each call so callers can mutate it safely', () => {
    const first = getAllSortedPaints();
    first.pop();
    expect(getAllSortedPaints()).toHaveLength(5);
  });
});
