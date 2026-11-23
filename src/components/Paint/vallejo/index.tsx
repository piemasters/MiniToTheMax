import type { PaintDetailsVallejo, VallejoPaintCategory } from '../../../types';
import type { BrandRenderer } from '../shared/BrandRenderer';
import { LetterBadge } from '../shared/LetterBadge';
import { radialGradient, verticalGradient } from '../shared/PaintGradient';

const potShapePath =
  'M37 51c0-7-6-7-6-7-2 0-2-1-2-2l1-1h2v-2h-3v-2h3l-1-19-1-3s-4-3-4-5l-3-9-4-1-5 1-3 9c0 2-4 5-4 5l-1 3-1 19a413 413 0 0 1 3 2H5v2h2l1 1c0 1 0 2-2 2 0 0-6 0-6 7 0 19 37 19 37 0Zm0 0';

const badges: Partial<Record<VallejoPaintCategory, string>> = {
  'Vallejo Game Color': 'G',
  'Vallejo Model Color': 'M',
  'Vallejo Xpress Color': 'X',
  'Vallejo Liquid Metal': 'LM',
};

export const vallejo: BrandRenderer<PaintDetailsVallejo> = {
  bounds: () => ({ x: 0, y: 0, width: 37, height: 65.25 }),

  shapePath: () => potShapePath,

  gradient: ({ type }) => {
    if (type.includes('wash')) return verticalGradient;
    if (type.includes('technical')) {
      return { kind: 'linear', x1: '0%', y1: '0%', x2: '100%', y2: '100%' };
    }
    return radialGradient('translate(20 45) scale(30)');
  },

  overlay: ({ category, hex }) => {
    const badge = badges[category];
    return badge && <LetterBadge text={badge} x={18.5} y={57} hex={hex} />;
  },

  label: ({ name, number }) => `${name} (${number})`,
};
