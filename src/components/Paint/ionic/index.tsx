import type { IonicPaintCategory, PaintDetailsIonic } from '../types';
import type { BrandRenderer } from '../shared/BrandRenderer';
import { LetterBadge } from '../shared/LetterBadge';
import { radialGradient } from '../shared/PaintGradient';

const potShapePath =
  'M3 0H18.7Q21.3 0 21.3 2.5V18.6L20.9 19.2L21.7 19.8V34.5Q21.7 36 20.2 36H1.5Q0 36 0 34.5V19.8L0.8 19.2L0.4 18.6V2.5Q0.4 0 3 0Z';

const badges: Partial<Record<IonicPaintCategory, string>> = {
  'IONIC Smart Colors': 'SC',
};

export const ionic: BrandRenderer<PaintDetailsIonic> = {
  bounds: () => ({ x: 0, y: 0, width: 21.7, height: 36 }),

  shapePath: () => potShapePath,

  gradient: () => radialGradient('translate(10.85 24) scale(18)'),

  overlay: ({ category, hex }) => {
    const badge = badges[category];
    return (
      badge && (
        <LetterBadge text={badge} x={10.85} y={30.3} fontSize={6.5} hex={hex} />
      )
    );
  },
};
