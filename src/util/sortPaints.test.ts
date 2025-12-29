import { airMephistonRed } from '../data/paints/citadel/air';
import { baseBugmansGlow, baseMephistonRed } from '../data/paints/citadel/base';
import { gameColorBloodyRed } from '../data/paints/vallejo/game';
import { PaintDetails } from '../types';
import { sortPaints } from './sortPaints';

describe('sortPaints', () => {
  it('sorts paints by company, category, and name in ascending order', () => {
    const paints: PaintDetails[] = [
      gameColorBloodyRed,
      baseMephistonRed,
      airMephistonRed,
    ];
    const sortedPaints = paints.sort(sortPaints);
    expect(sortedPaints).toEqual([
      airMephistonRed,
      baseMephistonRed,
      gameColorBloodyRed,
    ]);
  });

  it('handles paints with the same company and category but different names', () => {
    const paints: PaintDetails[] = [baseMephistonRed, baseBugmansGlow];
    const sortedPaints = paints.sort(sortPaints);
    expect(sortedPaints).toEqual([baseBugmansGlow, baseMephistonRed]);
  });

  it('handles paints with the same company but different categories', () => {
    const paints: PaintDetails[] = [airMephistonRed, baseMephistonRed];
    const sortedPaints = paints.sort(sortPaints);
    expect(sortedPaints).toEqual([airMephistonRed, baseMephistonRed]);
  });

  it('handles paints with the same name but different companies and categories', () => {
    const paints: PaintDetails[] = [
      { ...gameColorBloodyRed, name: 'Mephiston Red' },
      baseMephistonRed,
    ];

    const sortedPaints = paints.sort(sortPaints);

    expect(sortedPaints).toEqual([
      baseMephistonRed,
      { ...gameColorBloodyRed, name: 'Mephiston Red' },
    ]);
  });

  it('returns 0 when two paints are identical', () => {
    expect(sortPaints(baseMephistonRed, baseMephistonRed)).toBe(0);
  });
});
