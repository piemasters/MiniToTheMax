import type { Bounds } from './BrandRenderer';

/** Rendered size of every paint swatch, in px. */
export const SWATCH_WIDTH = 60;
export const SWATCH_HEIGHT = 71;

/** Room for the 1px outline stroke, which straddles the path edge. */
const STROKE_PADDING = 0.5;

/**
 * Builds a viewBox that fits the pot's height exactly to the swatch and
 * centres it horizontally, so pots from every brand end up the same height.
 */
export const potViewBox = ({ x, y, width, height }: Bounds) => {
  const vbHeight = height + STROKE_PADDING * 2;
  const vbWidth = Math.max(
    vbHeight * (SWATCH_WIDTH / SWATCH_HEIGHT),
    width + STROKE_PADDING * 2
  );
  const vbX = x + width / 2 - vbWidth / 2;
  const vbY = y - STROKE_PADDING;

  return [vbX, vbY, vbWidth, vbHeight].map((n) => +n.toFixed(2)).join(' ');
};
