import type { PaintDetails } from '../../types';
import {
  type ColorFilter,
  differenceFrom,
  hexToHsl,
} from '../color/colorFilter';
import { sortPaints } from '../paints/sortPaints';

export const SortKeys = [
  'default',
  'name',
  'hue',
  'lightness',
  'closest',
] as const;
export type SortKey = (typeof SortKeys)[number];

export const SortLabels: Record<SortKey, string> = {
  default: 'Brand and category',
  name: 'Name (A–Z)',
  hue: 'Hue (rainbow order)',
  lightness: 'Lightness (dark to light)',
  closest: 'Closest to the picked color',
};

export const isSortKey = (value: unknown): value is SortKey =>
  SortKeys.includes(value as SortKey);

// Below this saturation (or at the extremes of lightness) a hue is meaningless
const NEUTRAL_SATURATION = 0.12;
const NEUTRAL_LIGHTNESS = [0.05, 0.95];

const hueKey = (
  hex: string
): [group: number, hue: number, lightness: number] => {
  const { h, s, l } = hexToHsl(hex);
  const neutral =
    s < NEUTRAL_SATURATION ||
    l < NEUTRAL_LIGHTNESS[0] ||
    l > NEUTRAL_LIGHTNESS[1];
  // Colours first, in rainbow order; neutrals last, dark to light
  return neutral ? [1, 0, l] : [0, h, l];
};

const sortedBy = (
  paints: PaintDetails[],
  key: (paint: PaintDetails) => number[]
) => {
  const keys = new Map(paints.map((paint) => [paint, key(paint)]));
  return [...paints].sort((a, b) => {
    const [ka, kb] = [keys.get(a) as number[], keys.get(b) as number[]];
    for (let i = 0; i < ka.length; i++) {
      if (ka[i] !== kb[i]) return ka[i] - kb[i];
    }
    return sortPaints(a, b);
  });
};

/**
 * Orders results for display. `default` keeps the incoming order (company,
 * category, name); `closest` needs an active color match and otherwise does
 * nothing. Ties always fall back to the default order, so results are stable.
 */
export const sortPaintResults = (
  paints: PaintDetails[],
  sort: SortKey,
  color: ColorFilter
): PaintDetails[] => {
  switch (sort) {
    case 'name':
      return [...paints].sort(
        (a, b) => a.name.localeCompare(b.name) || sortPaints(a, b)
      );
    case 'hue':
      return sortedBy(paints, (paint) => hueKey(paint.hex));
    case 'lightness':
      return sortedBy(paints, (paint) => [hexToHsl(paint.hex).l]);
    case 'closest': {
      if (!color.enabled) return paints;
      const distance = differenceFrom(color.hex);
      return sortedBy(paints, (paint) => [distance(paint.hex)]);
    }
    default:
      return paints;
  }
};
