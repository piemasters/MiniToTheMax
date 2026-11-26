import type { PaintDetails, PaintType } from '../../types';
import { hexToLab } from './colorFilter';
import { getAllSortedPaints } from '../paints/getAllSortedPaints';

export interface ShadeHighlight {
  /** Darker paints, darkest first, so they read left to right toward the base. */
  shades: PaintDetails[];
  /** Lighter paints, lightest last. */
  highlights: PaintDetails[];
}

// Translucent, textured or effect paints make poor steps in a blend
const NOT_BLENDABLE: PaintType[] = [
  'wash',
  'ink',
  'technical',
  'spray',
  'fluorescent',
  'one-coat',
  'dry',
];

/** Whether a paint is one you would shade or highlight with, or from. */
export const isBlendable = (paint: PaintDetails) =>
  paint.color !== 'clear' &&
  !paint.type.some((type) => NOT_BLENDABLE.includes(type));

const isMetallic = (paint: PaintDetails) => paint.type.includes('metallic');

// Lightness steps (Lab L, 0–100) aimed for, nearest first
const STEPS = [10, 20];
// A step may land this far either side of its target
const STEP_TOLERANCE = 6;
// Smallest lightness gap that looks like a different paint
const MIN_GAP = 4;
// How far a paint may drift from the base's color, in Lab a/b units
const MAX_HUE_DRIFT = 24;
// Drift costs this much more than missing the target lightness by the same amount
const DRIFT_WEIGHT = 1.5;

/**
 * Paints to blend a paint into darker and lighter: up to two of each, in the
 * same color family, a step of lightness apart. A paint that is already very
 * dark or very light simply gets fewer on that side, or none. Paints of
 * another brand are only suggested when `allBrands` is set.
 */
export const getShadeHighlight = (
  base: PaintDetails,
  { allBrands = false, paints = getAllSortedPaints() } = {}
): ShadeHighlight => {
  if (!isBlendable(base)) return { shades: [], highlights: [] };

  const [l0, a0, b0] = hexToLab(base.hex.toUpperCase());
  const candidates = paints
    .filter(
      (paint) =>
        paint.name !== base.name &&
        isBlendable(paint) &&
        isMetallic(paint) === isMetallic(base) &&
        (allBrands || paint.company === base.company)
    )
    .map((paint) => {
      const [l, a, b] = hexToLab(paint.hex.toUpperCase());
      return { paint, dL: l - l0, drift: Math.hypot(a - a0, b - b0) };
    })
    .filter(({ drift }) => drift <= MAX_HUE_DRIFT);

  const pick = (direction: 1 | -1) => {
    const chosen: { paint: PaintDetails; dL: number }[] = [];
    const used = new Set<string>([base.name]);

    for (const step of STEPS) {
      const target = step * direction;
      const previous = chosen.at(-1)?.dL ?? 0;
      let best: { paint: PaintDetails; dL: number } | undefined;
      let bestScore = Infinity;

      for (const candidate of candidates) {
        const { paint, dL, drift } = candidate;
        if (used.has(paint.name)) continue;
        // Past the previous step, in the right direction, and near the target
        if ((dL - previous) * direction < MIN_GAP) continue;
        if (Math.abs(dL - target) > STEP_TOLERANCE) continue;

        const score = Math.abs(dL - target) + drift * DRIFT_WEIGHT;
        if (score < bestScore) {
          best = { paint, dL };
          bestScore = score;
        }
      }

      if (!best) break;
      chosen.push(best);
      used.add(best.paint.name);
    }
    return chosen.map(({ paint }) => paint);
  };

  return {
    shades: pick(-1).reverse(),
    highlights: pick(1),
  };
};
