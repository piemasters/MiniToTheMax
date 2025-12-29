import { PaintDetails } from '../types';
import { getPaint } from './getPaint';

// Mock data for paints
const mockPaints: PaintDetails[] = [
  {
    name: 'Praxeti White',
    category: 'Citadel Dry',
    type: ['dry'],
    color: 'white',
    hex: '#FFFFFF',
    stroke: '#6b6b6b',
    availability: 'available',
    company: 'Citadel',
  },
  {
    name: 'Mephiston Red',
    category: 'Citadel Air',
    type: ['air'],
    color: 'red',
    hex: '#960C09',
    availability: 'available',
    company: 'Citadel',
  },
  {
    name: 'Mephiston Red',
    category: 'Citadel Base',
    type: ['core'],
    color: 'red',
    hex: '#960C09',
    availability: 'available',
    company: 'Citadel',
  },
  {
    name: 'Paint C',
    category: 'Vallejo Game Color',
    company: 'Vallejo',
    hex: '#0000FF',
    color: 'blue',
    availability: 'available',
    type: ['core'],
  },
];

describe('getPaint Function', () => {
  it('returns the correct paint when only one paint matches the name', () => {
    const result = getPaint('Praxeti White');
    expect(result).toEqual({ paint: mockPaints[0] });
  });

  it('returns the correct paint when multiple paints match and category is specified', () => {
    const result = getPaint('Mephiston Red', 'Citadel Air');
    expect(result).toEqual({ paint: mockPaints[1] });
  });

  it('returns the correct paint when multiple exist and no category is specified', () => {
    const result = getPaint('Mephiston Red');
    expect(result).toEqual({ paint: mockPaints[2] });
  });

  it('returns an error when no paint matches the name', () => {
    const result = getPaint('Nonexistent Paint');
    expect(result).toEqual({
      error: 'Incorrect Paint Name',
      type: 'Nonexistent Paint',
    });
  });

  it('returns an error when no paint matches the category', () => {
    // @ts-expect-error Testing invalid category
    const result = getPaint('Mephiston Red', 'Nonexistent Category');
    expect(result).toEqual({
      error: 'Incorrect Paint Category',
      type: 'Nonexistent Category',
    });
  });
});
