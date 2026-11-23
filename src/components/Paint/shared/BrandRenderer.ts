import type { ReactNode } from 'react';
import type { PaintDetails } from '../types';
import type { GradientSpec } from './PaintGradient';

/**
 * Everything needed to draw one brand's paints. To add a brand, create one of
 * these and register it in `brands.ts`.
 *
 * Members use method syntax on purpose: it lets a brand declare its own paint
 * type (e.g. `BrandRenderer<PaintDetailsVallejo>`) and still be stored in the
 * shared registry.
 */
/** A box in the shape path's own coordinate space. */
export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface BrandRenderer<P extends PaintDetails = PaintDetails> {
  /**
   * Tight bounding box of the shape path (ignoring stroke). `Paint` scales
   * this to a fixed height so every brand's pots line up.
   */
  bounds(paint: P): Bounds;
  shapePath(paint: P): string;
  /** Only used when the paint has a `gradient`. */
  gradient(paint: P): GradientSpec;
  /** Extra `<defs>` children, rendered alongside the main gradient. */
  defs?(paint: P): ReactNode;
  /** Drawn on top of the shape: badges, gloss highlights, etc. */
  overlay?(paint: P): ReactNode;
  /** Replaces the whole SVG when it returns something, e.g. a photo. */
  image?(paint: P): ReactNode;
  /** Text under the swatch. Defaults to the paint name. */
  label?(paint: P): string;
}
