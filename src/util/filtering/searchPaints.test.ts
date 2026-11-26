import type { PaintDetails } from '../../types';
import { searchPaints } from './searchPaints';

const paint = (
  overrides: Partial<PaintDetails> & Pick<PaintDetails, 'name'>
): PaintDetails => ({
  hex: '#112233',
  category: 'Citadel Base',
  company: 'Citadel',
  color: 'red',
  availability: 'available',
  type: ['core'],
  ...overrides,
});

const mephiston = paint({ name: 'Mephiston Red', hex: '#960C09' });
const emperors = paint({ name: 'Emperors Children', color: 'pink' });
const gold = paint({
  name: 'Polished Gold',
  company: 'Vallejo',
  category: 'Vallejo Game Color',
  number: '72.057',
  type: ['metallic'],
});
const olive = paint({ name: 'Olivgrün Dark', company: 'Ionic' });
const paints = [mephiston, emperors, gold, olive];

describe('searchPaints', () => {
  it('keeps everything for an empty or blank search', () => {
    expect(searchPaints(paints, '')).toBe(paints);
    expect(searchPaints(paints, '   ')).toBe(paints);
  });

  it('matches names without regard to case', () => {
    expect(searchPaints(paints, 'MEPHISTON')).toEqual([mephiston]);
  });

  it('needs every word, in any order', () => {
    expect(searchPaints(paints, 'red mephiston')).toEqual([mephiston]);
    expect(searchPaints(paints, 'red gold')).toEqual([]);
  });

  it('matches the company, category, type and number', () => {
    expect(searchPaints(paints, 'vallejo')).toEqual([gold]);
    expect(searchPaints(paints, 'game color')).toEqual([gold]);
    expect(searchPaints(paints, 'metallic')).toEqual([gold]);
    expect(searchPaints(paints, '72.057')).toEqual([gold]);
  });

  it('matches a hex code, with or without the #', () => {
    expect(searchPaints(paints, '#960c09')).toEqual([mephiston]);
    expect(searchPaints(paints, '960c09')).toEqual([mephiston]);
  });

  it('ignores accents and apostrophes', () => {
    expect(searchPaints(paints, "emperor's")).toEqual([emperors]);
    expect(searchPaints(paints, 'olivgrun')).toEqual([olive]);
  });

  it('keeps the existing order', () => {
    expect(searchPaints(paints, 'o')).toEqual([
      mephiston,
      emperors,
      gold,
      olive,
    ]);
  });
});
