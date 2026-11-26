import { getPaint } from '../paints/getPaint';
import { getShadeHighlight, isBlendable } from './shadeHighlight';

const paintNamed = (name: string) => {
  const { paint } = getPaint(name);
  if (!paint) throw new Error(`Missing paint ${name}`);
  return paint;
};

describe('getShadeHighlight', () => {
  it('suggests up to two darker and two lighter paints of the same color', () => {
    const base = paintNamed('Mephiston Red');
    const { shades, highlights } = getShadeHighlight(base);

    expect(shades).toHaveLength(1);
    expect(highlights).toHaveLength(2);
    expect(shades[0].name).toBe('Khorne Red');
  });

  it('steps away from the base in order', () => {
    const base = paintNamed('Pink');
    const { shades, highlights } = getShadeHighlight(base);
    const lightness = (hex: string) =>
      parseInt(hex.slice(1, 3), 16) + parseInt(hex.slice(3, 5), 16);

    const all = [...shades, base, ...highlights].map((paint) =>
      lightness(paint.hex)
    );
    expect(all).toEqual([...all].sort((a, b) => a - b));
    expect(shades.length).toBeGreaterThan(0);
    expect(highlights.length).toBeGreaterThan(0);
  });

  it('only uses the same brand unless asked', () => {
    const base = paintNamed('Gory Red');
    const same = getShadeHighlight(base);
    expect(
      [...same.shades, ...same.highlights].every((p) => p.company === 'Vallejo')
    ).toBe(true);

    const any = getShadeHighlight(base, { allBrands: true });
    expect(
      [...any.shades, ...any.highlights].some((p) => p.company !== 'Vallejo')
    ).toBe(true);
  });

  it('offers only highlights for a very dark paint, and only shades for a very light one', () => {
    const black = getShadeHighlight(paintNamed('Abaddon Black'));
    expect(black.shades).toEqual([]);
    expect(black.highlights.length).toBeGreaterThan(0);

    const white = getShadeHighlight(paintNamed('Corax White'));
    expect(white.highlights).toEqual([]);
    expect(white.shades.length).toBeGreaterThan(0);
  });

  it('never suggests the paint itself, repeats, or washes and thinners', () => {
    const base = paintNamed('Corvus Black');
    const result = getShadeHighlight(base, { allBrands: true });
    const all = [...result.shades, ...result.highlights];

    expect(all.map((p) => p.name)).not.toContain(base.name);
    expect(new Set(all.map((p) => p.name)).size).toBe(all.length);
    expect(all.every(isBlendable)).toBe(true);
  });

  it('keeps metallics with metallics', () => {
    const base = paintNamed('Leadbelcher');
    const { shades, highlights } = getShadeHighlight(base);
    for (const paint of [...shades, ...highlights]) {
      expect(paint.type).toContain('metallic');
    }
  });

  it('has nothing to say about washes, which are not blended with', () => {
    const wash = paintNamed('Agrax Earthshade');
    expect(isBlendable(wash)).toBe(false);
    expect(getShadeHighlight(wash)).toEqual({ shades: [], highlights: [] });
  });
});
