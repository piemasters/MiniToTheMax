import { useId } from 'react';

/** Ids for the SVG defs one rendered paint owns. */
export interface PaintIds {
  gradient: string;
  gloss: string;
  clip: string;
}

/**
 * Ids unique to this rendered instance, so two paints that share a category and
 * hex (or the same paint shown twice on a page) never collide. A collision makes
 * the browser use the first definition for every element with that id, which
 * paints the wrong gradient.
 */
export const usePaintIds = (): PaintIds => {
  const id = useId();
  return {
    gradient: `${id}-gradient`,
    gloss: `${id}-gloss`,
    clip: `${id}-clip`,
  };
};
