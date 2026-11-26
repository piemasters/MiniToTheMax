import { hexToHsl } from './colorFilter';
import { ColorSchemes, getColorScheme, hasHue } from './colorSchemes';
import { getPaint } from '../paints/getPaint';

const paintNamed = (name: string) => {
  const { paint } = getPaint(name);
  if (!paint) throw new Error(`Missing paint ${name}`);
  return paint;
};

const hueGap = (a: number, b: number) => {
  const gap = Math.abs(a - b) % 360;
  return Math.min(gap, 360 - gap);
};

describe('getColorScheme', () => {
  const red = paintNamed('Mephiston Red');

  it('includes the base paint, first except for the ladder', () => {
    for (const scheme of ColorSchemes) {
      const entries = getColorScheme(red, scheme) ?? [];
      const base = entries.find((entry) => entry.isBase);
      expect(base?.paint).toBe(red);
      expect(base?.deltaE).toBe(0);
      if (scheme !== 'monochromatic') expect(entries[0]).toBe(base);
    }
  });

  it.each([
    ['complementary', [180]],
    ['split-complementary', [150, 210]],
    ['triadic', [120, 240]],
    ['analogous', [-30, 30]],
    ['tetradic', [90, 180, 270]],
  ] as const)('places %s paints round the wheel', (scheme, offsets) => {
    const entries = getColorScheme(red, scheme) ?? [];
    const baseHue = hexToHsl(red.hex).h;
    const accents = entries.slice(1);

    expect(accents.length).toBeGreaterThan(0);
    for (const accent of accents) {
      // Each lands near one of the scheme's angles
      const nearest = Math.min(
        ...offsets.map((offset) => hueGap(accent.hue, baseHue + offset))
      );
      expect(nearest).toBeLessThanOrEqual(40);
    }
  });

  it('keeps to the same brand unless asked', () => {
    const same = getColorScheme(red, 'triadic') ?? [];
    expect(same.every((entry) => entry.paint.company === 'Citadel')).toBe(true);

    const any = getColorScheme(red, 'triadic', { allBrands: true }) ?? [];
    expect(any.some((entry) => entry.paint.company !== 'Citadel')).toBe(true);
  });

  it('does not repeat a paint or use washes', () => {
    const entries = getColorScheme(red, 'tetradic', { allBrands: true }) ?? [];
    const names = entries.map((entry) => entry.paint.name);
    expect(new Set(names).size).toBe(names.length);
    expect(entries.every((entry) => !entry.paint.type.includes('wash'))).toBe(
      true
    );
  });

  it('uses the shade and highlight ladder for monochromatic', () => {
    const entries = getColorScheme(red, 'monochromatic') ?? [];
    expect(entries.map((entry) => entry.role)).toEqual([
      'Shade 1',
      'Base',
      'Highlight 1',
      'Highlight 2',
    ]);
  });

  it('has no scheme for a paint without a hue', () => {
    for (const name of ['Corvus Black', 'Corax White', 'Leadbelcher']) {
      const paint = paintNamed(name);
      expect(hasHue(paint)).toBe(false);
      expect(getColorScheme(paint, 'triadic')).toBeNull();
    }
  });
});
