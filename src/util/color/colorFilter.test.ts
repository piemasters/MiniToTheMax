import type { PaintDetails } from '../../types';
import {
  colorDifference,
  filterByColor,
  hexToHsl,
  parseHex,
} from './colorFilter';

const paint = (name: string, hex: string): PaintDetails => ({
  name,
  hex,
  category: 'Citadel Base',
  company: 'Citadel',
  color: 'red',
  availability: 'available',
  type: ['core'],
});

describe('colorDifference', () => {
  it('is 0 for the same color, regardless of case', () => {
    expect(colorDifference('#B22222', '#b22222')).toBe(0);
  });

  it('is 100 between black and white', () => {
    expect(colorDifference('#000000', '#FFFFFF')).toBeCloseTo(100, 1);
  });

  it('rates a darker red closer to red than a blue is', () => {
    expect(colorDifference('#FF0000', '#CC0000')).toBeLessThan(
      colorDifference('#FF0000', '#0000FF')
    );
  });
});

describe('filterByColor', () => {
  const red = paint('Red', '#FF0000');
  const darkRed = paint('Dark Red', '#E00000');
  const blue = paint('Blue', '#0000FF');
  const paints = [blue, darkRed, red];

  it('returns paints unchanged when disabled', () => {
    expect(
      filterByColor(paints, { enabled: false, hex: '#FF0000', threshold: 1 })
    ).toBe(paints);
  });

  it('keeps only paints within the threshold, in their existing order', () => {
    expect(
      filterByColor(paints, { enabled: true, hex: '#FF0000', threshold: 15 })
    ).toEqual([darkRed, red]);
  });

  it('can match nothing', () => {
    expect(
      filterByColor(paints, { enabled: true, hex: '#00FF00', threshold: 5 })
    ).toEqual([]);
  });
});

describe('parseHex', () => {
  it.each([
    ['#B22222', '#b22222'],
    ['b22222', '#b22222'],
    ['  #b22222  ', '#b22222'],
  ])('reads %s', (input, expected) => {
    expect(parseHex(input)).toBe(expected);
  });

  it('only expands 3 digit shorthand when asked, so typing is not cut short', () => {
    expect(parseHex('#b22')).toBeNull();
    expect(parseHex('#b22', true)).toBe('#bb2222');
  });

  it.each(['', '#', '#12345', '#1234567', '#gggggg', 'red'])(
    'rejects %p',
    (input) => {
      expect(parseHex(input, true)).toBeNull();
    }
  );
});

describe('hexToHsl', () => {
  it.each([
    ['#ff0000', 0],
    ['#00ff00', 120],
    ['#0000ff', 240],
    ['#ffff00', 60],
  ])('puts %s at hue %i', (hex, hue) => {
    expect(hexToHsl(hex).h).toBeCloseTo(hue, 0);
  });

  it('has no saturation for greys, black and white', () => {
    expect(hexToHsl('#808080').s).toBe(0);
    expect(hexToHsl('#000000')).toEqual({ h: 0, s: 0, l: 0 });
    expect(hexToHsl('#ffffff').l).toBe(1);
  });

  it('reports lightness', () => {
    expect(hexToHsl('#ff0000').l).toBeCloseTo(0.5, 2);
  });
});
