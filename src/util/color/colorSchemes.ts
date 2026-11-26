import type { PaintDetails } from '../../types';
import { colorDifference, hexToHsl } from './colorFilter';
import { getAllSortedPaints } from '../paints/getAllSortedPaints';
import { getShadeHighlight, isBlendable } from './shadeHighlight';

export const ColorSchemes = [
  'triadic',
  'complementary',
  'split-complementary',
  'analogous',
  'tetradic',
  'monochromatic',
] as const;
export type ColorScheme = (typeof ColorSchemes)[number];

export const ColorSchemeLabels: Record<ColorScheme, string> = {
  triadic: 'Triadic',
  complementary: 'Complementary',
  'split-complementary': 'Split-complementary',
  analogous: 'Analogous',
  tetradic: 'Tetradic',
  monochromatic: 'Monochromatic',
};

export const ColorSchemeDescriptions: Record<ColorScheme, string> = {
  triadic:
    'Three hues evenly spaced round the wheel. Vibrant and varied, one leads while the others support.',
  complementary:
    'The color directly opposite on the wheel. The strongest contrast: use it sparingly as an accent.',
  'split-complementary':
    'Two colors either side of the opposite hue. Nearly as vivid as a complement, but easier to balance.',
  analogous:
    'Neighbours on the wheel. Calm and harmonious, because the colors blend into one another.',
  tetradic:
    'Four hues, two complementary pairs. Rich and busy, so keep one dominant and tone down the rest.',
  monochromatic:
    'One hue in lighter and darker steps. Always cohesive, and the basis of shading and highlighting.',
};

interface Slot {
  role: string;
  /** Degrees round the wheel from the base paint's hue. */
  offset: number;
}

const SLOTS: Record<Exclude<ColorScheme, 'monochromatic'>, Slot[]> = {
  triadic: [
    { role: 'Secondary', offset: 120 },
    { role: 'Tertiary', offset: 240 },
  ],
  complementary: [{ role: 'Complement', offset: 180 }],
  'split-complementary': [
    { role: 'Accent 1', offset: 150 },
    { role: 'Accent 2', offset: 210 },
  ],
  analogous: [
    { role: 'Neighbour 1', offset: -30 },
    { role: 'Neighbour 2', offset: 30 },
  ],
  tetradic: [
    { role: 'Accent 1', offset: 90 },
    { role: 'Accent 2', offset: 180 },
    { role: 'Accent 3', offset: 270 },
  ],
};

const BASE_ROLE: Record<ColorScheme, string> = {
  triadic: 'Primary',
  complementary: 'Base',
  'split-complementary': 'Base',
  analogous: 'Base',
  tetradic: 'Base',
  monochromatic: 'Base',
};

export interface SchemeEntry {
  role: string;
  paint: PaintDetails;
  /** Where the paint sits on the wheel (HSL hue, degrees). */
  hue: number;
  /** How far it is from the ideal color for its place: 0 is exact. */
  deltaE: number;
  isBase?: boolean;
}

// Below this a color has no meaningful hue, so no scheme can be built round it
const MIN_SATURATION = 0.15;
// Candidates need a real hue too, and to be neither near black nor near white
const MIN_CANDIDATE_SATURATION = 0.2;
const LIGHTNESS_RANGE = [0.1, 0.9];
// Farthest, in degrees, a paint may be from the hue it stands in for
const MAX_HUE_ERROR = 40;
// Degrees of hue error that a full unit of lightness or saturation difference costs
const LIGHTNESS_WEIGHT = 100;
const SATURATION_WEIGHT = 60;

const wrap = (degrees: number) => ((degrees % 360) + 360) % 360;
const hueGap = (a: number, b: number) => {
  const gap = Math.abs(wrap(a) - wrap(b));
  return Math.min(gap, 360 - gap);
};

const hslToHex = (h: number, s: number, l: number) => {
  const a = s * Math.min(l, 1 - l);
  const channel = (n: number) => {
    const k = (n + h / 30) % 12;
    const value = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(value * 255)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${channel(0)}${channel(8)}${channel(4)}`;
};

/** Whether a paint has a hue to build a color scheme round. */
export const hasHue = (paint: PaintDetails) =>
  isBlendable(paint) && hexToHsl(paint.hex).s >= MIN_SATURATION;

/**
 * The paints that make up a color scheme round `base`, starting with the base
 * itself. A scheme is hues at fixed angles from the base's; each is filled by
 * the paint nearest that hue, preferring one of similar lightness and
 * saturation. A place no paint is near enough is left out. Returns null when
 * the base is too grey, black or white to have a hue.
 */
export const getColorScheme = (
  base: PaintDetails,
  scheme: ColorScheme,
  { allBrands = false, paints = getAllSortedPaints() } = {}
): SchemeEntry[] | null => {
  if (!hasHue(base)) return null;
  const { h, s, l } = hexToHsl(base.hex);
  const baseEntry: SchemeEntry = {
    role: BASE_ROLE[scheme],
    paint: base,
    hue: h,
    deltaE: 0,
    isBase: true,
  };

  if (scheme === 'monochromatic') {
    const { shades, highlights } = getShadeHighlight(base, {
      allBrands,
      paints,
    });
    const entry = (paint: PaintDetails, role: string): SchemeEntry => ({
      role,
      paint,
      hue: hexToHsl(paint.hex).h,
      deltaE: colorDifference(base.hex, paint.hex),
    });
    return [
      ...shades.map((paint, i) => entry(paint, `Shade ${shades.length - i}`)),
      baseEntry,
      ...highlights.map((paint, i) => entry(paint, `Highlight ${i + 1}`)),
    ];
  }

  const baseIsMetallic = base.type.includes('metallic');
  const candidates = paints
    .filter(
      (paint) =>
        paint.name !== base.name &&
        isBlendable(paint) &&
        paint.type.includes('metallic') === baseIsMetallic &&
        (allBrands || paint.company === base.company)
    )
    .map((paint) => ({ paint, hsl: hexToHsl(paint.hex) }))
    .filter(
      ({ hsl }) =>
        hsl.s >= MIN_CANDIDATE_SATURATION &&
        hsl.l >= LIGHTNESS_RANGE[0] &&
        hsl.l <= LIGHTNESS_RANGE[1]
    );

  const used = new Set([base.name]);
  const entries: SchemeEntry[] = [];

  for (const { role, offset } of SLOTS[scheme]) {
    const idealHue = wrap(h + offset);
    let best: (typeof candidates)[number] | undefined;
    let bestScore = Infinity;

    for (const candidate of candidates) {
      if (used.has(candidate.paint.name)) continue;
      const error = hueGap(candidate.hsl.h, idealHue);
      if (error > MAX_HUE_ERROR) continue;
      const score =
        error +
        Math.abs(candidate.hsl.l - l) * LIGHTNESS_WEIGHT +
        Math.abs(candidate.hsl.s - s) * SATURATION_WEIGHT;
      if (score < bestScore) {
        best = candidate;
        bestScore = score;
      }
    }

    if (!best) continue;
    used.add(best.paint.name);
    entries.push({
      role,
      paint: best.paint,
      hue: best.hsl.h,
      // Against the ideal: the base's own lightness and saturation at this hue
      deltaE: colorDifference(hslToHex(idealHue, s, l), best.paint.hex),
    });
  }

  return [baseEntry, ...entries];
};
