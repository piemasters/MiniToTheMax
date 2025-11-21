import { getAllSortedPaints } from './getAllSortedPaints';

jest.mock('../data/paints/citadel', () => ({
  airPaints: [
    {
      name: 'Air Paint A',
      category: 'Citadel Air',
      company: 'Citadel',
      hex: '#FF0000',
      color: 'red',
      availability: 'available',
      type: ['air'],
    },
  ],
  basePaints: [
    {
      name: 'Base Paint A',
      category: 'Citadel Base',
      company: 'Citadel',
      hex: '#00FF00',
      color: 'green',
      availability: 'available',
      type: ['core'],
    },
  ],
  contrastPaints: [],
  dryPaints: [],
  layerPaints: [],
  shadePaints: [],
  sprayPaints: [],
  technicalPaints: [],
}));
jest.mock('../data/paints/vallejo', () => ({
  gameColorPaints: [
    {
      name: 'Game Color Paint A',
      category: 'Vallejo Game Color',
      company: 'Vallejo',
      hex: '#0000FF',
      color: 'blue',
      availability: 'available',
      type: ['core'],
    },
    {
      name: 'Game Color Paint B',
      category: 'Vallejo Game Color',
      company: 'Vallejo',
      hex: '#FFFF00',
      color: 'yellow',
      availability: 'available',
      type: ['core'],
    },
  ],
  modelColorPaints: [],
  xpressColorPaints: [],
}));

describe('getAllSortedPaints', () => {
  it('combines all paint arrays into a single sorted array', () => {
    const sortedPaints = getAllSortedPaints();

    expect(sortedPaints).toEqual([
      {
        name: 'Air Paint A',
        category: 'Citadel Air',
        company: 'Citadel',
        hex: '#FF0000',
        color: 'red',
        availability: 'available',
        type: ['air'],
      },
      {
        name: 'Base Paint A',
        category: 'Citadel Base',
        company: 'Citadel',
        hex: '#00FF00',
        color: 'green',
        availability: 'available',
        type: ['core'],
      },
      {
        name: 'Game Color Paint A',
        category: 'Vallejo Game Color',
        company: 'Vallejo',
        hex: '#0000FF',
        color: 'blue',
        availability: 'available',
        type: ['core'],
      },
      {
        name: 'Game Color Paint B',
        category: 'Vallejo Game Color',
        company: 'Vallejo',
        hex: '#FFFF00',
        color: 'yellow',
        availability: 'available',
        type: ['core'],
      },
    ]);
  });

  it('removes duplicate paints based on unique keys', () => {
    jest.mock('../data/paints', () => ({
      gameColorPaints: [
        {
          name: 'Game Color Paint A',
          category: 'Vallejo Game Color',
          company: 'Vallejo',
          hex: '#0000FF',
          color: 'blue',
          availability: 'available',
          type: ['core'],
        },
        {
          name: 'Game Color Paint A',
          category: 'Vallejo Game Color',
          company: 'Vallejo',
          hex: '#0000FF',
          color: 'blue',
          availability: 'available',
          type: ['core'],
        },
      ],
    }));

    const sortedPaints = getAllSortedPaints();

    expect(sortedPaints).toEqual([
      {
        name: 'Air Paint A',
        category: 'Citadel Air',
        company: 'Citadel',
        hex: '#FF0000',
        color: 'red',
        availability: 'available',
        type: ['air'],
      },
      {
        name: 'Base Paint A',
        category: 'Citadel Base',
        company: 'Citadel',
        hex: '#00FF00',
        color: 'green',
        availability: 'available',
        type: ['core'],
      },
      {
        name: 'Game Color Paint A',
        category: 'Vallejo Game Color',
        company: 'Vallejo',
        hex: '#0000FF',
        color: 'blue',
        availability: 'available',
        type: ['core'],
      },
      {
        name: 'Game Color Paint B',
        category: 'Vallejo Game Color',
        company: 'Vallejo',
        hex: '#FFFF00',
        color: 'yellow',
        availability: 'available',
        type: ['core'],
      },
    ]);
  });

  it('sorts paints using the sortPaints function', () => {
    const sortedPaints = getAllSortedPaints();

    expect(sortedPaints[0].name).toBe('Air Paint A');
    expect(sortedPaints[sortedPaints.length - 1].name).toBe(
      'Game Color Paint B'
    );
  });
});
