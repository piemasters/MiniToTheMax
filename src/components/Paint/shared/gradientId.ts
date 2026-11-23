import { textToId } from '../util/textToId';

/**
 * The single source of truth for gradient ids, so the shape's `fill` and the
 * `<defs>` entry can never drift apart.
 */
export const gradientId = (
  category: string,
  hex: string,
  kind: 'gradient' | 'gloss_gradient' = 'gradient'
) => `${textToId(category)}_${kind}_${hex.substring(1, 7)}`;
