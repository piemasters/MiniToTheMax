import { enableAll, getActiveFilters, summarizeGroup } from './activeFilters';
import { initialColorFilter } from '../color/colorFilter';
import { initialFilters } from './paintFilters';
import type { AllPaintFilters } from './togglePaints';

const withGroup = (
  field: keyof AllPaintFilters,
  changes: Record<string, boolean>
): AllPaintFilters => ({
  ...initialFilters,
  [field]: { ...initialFilters[field], ...changes },
});

describe('getActiveFilters', () => {
  it('is empty when nothing is narrowed', () => {
    expect(getActiveFilters(initialFilters, initialColorFilter)).toEqual([]);
  });

  it('lists the hidden options when only a few are hidden', () => {
    const [chip] = getActiveFilters(
      withGroup('company', { Vallejo: false }),
      initialColorFilter
    );
    expect(chip).toMatchObject({
      kind: 'group',
      field: 'company',
      label: 'Company: not Vallejo',
    });
  });

  it('lists the shown options when only a few are shown', () => {
    const everythingOff = Object.fromEntries(
      Object.keys(initialFilters.category).map((key) => [key, false])
    );
    const [chip] = getActiveFilters(
      withGroup('category', {
        ...everythingOff,
        'Citadel Base': true,
        'Citadel Layer': true,
      }),
      initialColorFilter
    );
    expect(chip.label).toBe('Category: Citadel Base, Citadel Layer');
  });

  it('says none when everything is hidden', () => {
    const everythingOff = Object.fromEntries(
      Object.keys(initialFilters.availability).map((key) => [key, false])
    );
    const [chip] = getActiveFilters(
      withGroup('availability', everythingOff),
      initialColorFilter
    );
    expect(chip.label).toBe('Availability: none');
  });

  it('falls back to a count when both lists are long', () => {
    const keys = Object.keys(initialFilters.category);
    const half = Object.fromEntries(
      keys.map((key, i) => [key, i < keys.length / 2])
    );
    const [chip] = getActiveFilters(
      withGroup('category', half),
      initialColorFilter
    );
    expect(chip.label).toMatch(/^Category: \d+ of \d+$/);
  });

  it('puts a search first, and ignores a blank one', () => {
    const chips = getActiveFilters(
      withGroup('company', { Vallejo: false }),
      initialColorFilter,
      '  dark red '
    );
    expect(chips.map((chip) => chip.id)).toEqual(['search', 'company']);
    expect(chips[0]).toMatchObject({
      kind: 'search',
      label: 'Search: “dark red”',
    });
    expect(getActiveFilters(initialFilters, initialColorFilter, '   ')).toEqual(
      []
    );
  });

  it('adds a colour match entry last, only when enabled', () => {
    const chips = getActiveFilters(withGroup('company', { Vallejo: false }), {
      enabled: true,
      hex: '#b22222',
      threshold: 12,
    });
    expect(chips.map((chip) => chip.id)).toEqual(['company', 'color-match']);
    expect(chips[1]).toMatchObject({ kind: 'color', label: '#B22222 ±12' });
  });
});

describe('summarizeGroup', () => {
  it('is null for an untouched group', () => {
    expect(summarizeGroup(initialFilters.company)).toBeNull();
  });

  it('counts enabled options', () => {
    expect(summarizeGroup({ a: true, b: false, c: false })).toBe('1 of 3');
  });
});

describe('enableAll', () => {
  it('turns every option back on', () => {
    expect(enableAll({ a: false, b: true })).toEqual({ a: true, b: true });
  });
});

describe('getActiveFilters with a collection', () => {
  it('adds a chip when narrowed to some of my paints', () => {
    expect(
      getActiveFilters(initialFilters, initialColorFilter, '', 'owned')
    ).toEqual([
      { id: 'collection', kind: 'collection', label: 'My paints: Owned' },
    ]);
  });

  it('has no chip for all paints', () => {
    expect(
      getActiveFilters(initialFilters, initialColorFilter, '', 'all')
    ).toEqual([]);
  });
});
