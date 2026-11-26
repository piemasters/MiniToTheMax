import type { PaintDetails } from '../../types';
import { initialColorFilter } from '../color/colorFilter';
import { isSortKey, sortPaintResults } from './sortPaintResults';

const paint = (name: string, hex: string): PaintDetails => ({
  name,
  hex,
  category: 'Citadel Base',
  company: 'Citadel',
  color: 'red',
  availability: 'available',
  type: ['core'],
});

const red = paint('Red', '#ff0000');
const yellow = paint('Yellow', '#ffff00');
const blue = paint('Blue', '#0000ff');
const darkRed = paint('Dark Red', '#400000');
const grey = paint('Grey', '#808080');
const black = paint('Black', '#000000');
const white = paint('White', '#ffffff');

const names = (paints: PaintDetails[]) => paints.map((p) => p.name);

describe('sortPaintResults', () => {
  const input = [white, blue, grey, red, black, yellow];

  it('keeps the incoming order by default', () => {
    expect(sortPaintResults(input, 'default', initialColorFilter)).toBe(input);
  });

  it('sorts by name without changing the input', () => {
    const copy = [...input];
    expect(names(sortPaintResults(input, 'name', initialColorFilter))).toEqual([
      'Black',
      'Blue',
      'Grey',
      'Red',
      'White',
      'Yellow',
    ]);
    expect(input).toEqual(copy);
  });

  it('sorts colors in rainbow order, then neutrals dark to light', () => {
    expect(names(sortPaintResults(input, 'hue', initialColorFilter))).toEqual([
      'Red',
      'Yellow',
      'Blue',
      'Black',
      'Grey',
      'White',
    ]);
  });

  it('breaks hue ties by lightness', () => {
    const result = sortPaintResults([red, darkRed], 'hue', initialColorFilter);
    expect(names(result)).toEqual(['Dark Red', 'Red']);
  });

  it('sorts by lightness, dark to light, with ties in name order', () => {
    // Blue, Red and Yellow are all exactly 50% light; Grey is a hair above
    expect(
      names(sortPaintResults(input, 'lightness', initialColorFilter))
    ).toEqual(['Black', 'Blue', 'Red', 'Yellow', 'Grey', 'White']);
  });

  it('sorts by closeness to the picked color', () => {
    const color = { enabled: true, hex: '#ff0000', threshold: 50 };
    expect(
      names(sortPaintResults([blue, darkRed, red], 'closest', color))
    ).toEqual(['Red', 'Dark Red', 'Blue']);
  });

  it('does nothing for closest without a color match', () => {
    expect(sortPaintResults(input, 'closest', initialColorFilter)).toBe(input);
  });

  it('falls back to the default order for ties', () => {
    const a = { ...paint('A', '#ff0000'), category: 'Citadel Air' as const };
    const b = paint('B', '#ff0000');
    expect(names(sortPaintResults([b, a], 'hue', initialColorFilter))).toEqual([
      'A',
      'B',
    ]);
  });
});

describe('isSortKey', () => {
  it('accepts known keys only', () => {
    expect(isSortKey('hue')).toBe(true);
    expect(isSortKey('bogus')).toBe(false);
    expect(isSortKey(null)).toBe(false);
  });
});
