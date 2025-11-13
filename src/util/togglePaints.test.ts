import { PaintDetails } from '../types';
import { AllPaintFilters, togglePaints } from './togglePaints';

// Mock data for paints
const mockPaints: PaintDetails[] = [
  {
    name: 'Paint A',
    category: 'Citadel Base',
    company: 'Citadel',
    hex: '#FF0000',
    color: 'red',
    availability: 'available',
    type: ['core'],
  },
  {
    name: 'Paint B',
    category: 'Citadel Layer',
    company: 'Citadel',
    hex: '#00FF00',
    color: 'green',
    availability: 'available',
    type: ['core'],
  },
  {
    name: 'Paint C',
    category: 'Vallejo Game Color',
    company: 'Vallejo',
    hex: '#0000FF',
    color: 'blue',
    availability: 'available',
    type: ['core', 'metallic'],
  },
];

// Mock getAllSortedPaints function
jest.mock('./getAllSortedPaints', () => ({
  getAllSortedPaints: jest.fn(() => mockPaints),
}));

jest.mock('./sortPaints', () => ({
  sortPaints: jest.fn((paints) => paints), // Return paints as-is for simplicity
}));

describe('togglePaints', () => {
  it('returns all paints when no filters are inactive', () => {
    const filters: AllPaintFilters = {
      company: { Citadel: true, Vallejo: true },
      category: {
        'Citadel Base': true,
        'Citadel Layer': true,
        'Vallejo Game Color': true,
      },
      color: { red: true, green: true, blue: true },
      type: { core: true, metallic: true },
      availability: { available: true },
    };

    const result = togglePaints(filters);
    expect(result).toEqual(mockPaints);
  });

  it('filters out paints based on inactive company filters', () => {
    const filters: AllPaintFilters = {
      company: { Citadel: false, Vallejo: true },
      category: {
        'Citadel Base': true,
        'Citadel Layer': true,
        'Vallejo Game Color': true,
      },
      color: { red: true, green: true, blue: true },
      type: { core: true, metallic: true },
      availability: { available: true },
    };

    const result = togglePaints(filters);
    expect(result).toEqual([mockPaints[2]]); // Only Vallejo paint remains
  });

  it('filters out paints based on inactive category filters', () => {
    const filters: AllPaintFilters = {
      company: { Citadel: true, Vallejo: true },
      category: {
        'Citadel Base': false,
        'Citadel Layer': true,
        'Vallejo Game Color': true,
      },
      color: { red: true, green: true, blue: true },
      type: { core: true, metallic: true },
      availability: { available: true },
    };

    const result = togglePaints(filters);
    expect(result).toEqual([mockPaints[1], mockPaints[2]]); // Excludes Citadel Base
  });

  it('filters out paints based on inactive type filters', () => {
    const filters: AllPaintFilters = {
      company: { Citadel: true, Vallejo: true },
      category: {
        'Citadel Base': true,
        'Citadel Layer': true,
        'Vallejo Game Color': true,
      },
      color: { red: true, green: true, blue: true },
      type: { core: false, metallic: true },
      availability: { available: true },
    };

    const result = togglePaints(filters);
    expect(result).toEqual([mockPaints[2]]); // Only Paint C remains (has metallic type)
  });

  it('filters out paints based on inactive color filters', () => {
    const filters: AllPaintFilters = {
      company: { Citadel: true, Vallejo: true },
      category: {
        'Citadel Base': true,
        'Citadel Layer': true,
        'Vallejo Game Color': true,
      },
      color: { red: false, green: true, blue: true },
      type: { base: true, layer: true, core: true, metallic: true },
      availability: { available: true },
    };

    const result = togglePaints(filters);
    expect(result).toEqual([mockPaints[1], mockPaints[2]]); // Excludes red color
  });

  it('filters out paints based on inactive availability filters', () => {
    const filters: AllPaintFilters = {
      company: { Citadel: true, Vallejo: true },
      category: {
        'Citadel Base': true,
        'Citadel Layer': true,
        'Vallejo Game Color': true,
      },
      color: { red: true, green: true, blue: true },
      type: { base: true, layer: true, core: true, metallic: true },
      availability: { available: false },
    };

    const result = togglePaints(filters);
    expect(result).toEqual([]); // No paints remain
  });
});
