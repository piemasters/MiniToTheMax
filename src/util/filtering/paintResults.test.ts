import { paintId } from '../paints/paintId';
import { initialFilters } from './paintFilters';
import { type PaintQuery, initialQuery } from './paintQuery';
import { getFacetCounts, getPaintResults } from './paintResults';

const hide = (
  field: keyof PaintQuery['filters'],
  ...keys: string[]
): PaintQuery => ({
  ...initialQuery,
  filters: {
    ...initialFilters,
    [field]: {
      ...initialFilters[field],
      ...Object.fromEntries(keys.map((key) => [key, false])),
    },
  },
});

const sum = (counts: Record<string, number>) =>
  Object.values(counts).reduce((total, n) => total + n, 0);

describe('getPaintResults', () => {
  const everything = getPaintResults(initialQuery);

  it('returns every paint for the default query', () => {
    expect(everything.length).toBeGreaterThan(900);
  });

  it('applies filters, search, color match and sort together', () => {
    const results = getPaintResults({
      ...initialQuery,
      filters: hide('company', 'Citadel', 'Vallejo').filters,
      search: 'blue',
      sort: 'name',
    });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((paint) => paint.company === 'Ionic')).toBe(true);
    expect(results.every((paint) => /blue/i.test(paint.name))).toBe(true);
    const names = results.map((paint) => paint.name);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  it('puts the closest match first when sorting by closeness', () => {
    const [first] = getPaintResults({
      ...initialQuery,
      sort: 'closest',
      color: { enabled: true, hex: '#000000', threshold: 50 },
    });
    expect(first.hex.toLowerCase()).toBe('#000000');
  });
});

describe('getFacetCounts', () => {
  const total = getPaintResults(initialQuery).length;

  it('counts every paint once per single-valued group', () => {
    const counts = getFacetCounts(initialQuery);
    expect(sum(counts.company)).toBe(total);
    expect(sum(counts.category)).toBe(total);
    expect(sum(counts.availability)).toBe(total);
  });

  it('still counts an option that is unticked, instead of showing 0', () => {
    const counts = getFacetCounts(hide('company', 'Vallejo'));
    expect(counts.company.Vallejo).toBeGreaterThan(0);
    expect(counts.company.Vallejo).toBe(
      getFacetCounts(initialQuery).company.Vallejo
    );
  });

  it('lets other groups react to a narrowed group', () => {
    const before = getFacetCounts(initialQuery);
    const after = getFacetCounts(hide('company', 'Vallejo'));
    // Vallejo categories now bring nothing, as Vallejo itself is hidden
    expect(before.category['Vallejo Game Color']).toBeGreaterThan(0);
    expect(after.category['Vallejo Game Color']).toBe(0);
    // ...while Citadel categories are unaffected
    expect(after.category['Citadel Base']).toBe(
      before.category['Citadel Base']
    );
  });

  it('applies the search to every group', () => {
    const counts = getFacetCounts({ ...initialQuery, search: 'mephiston' });
    expect(sum(counts.company)).toBeGreaterThan(0);
    expect(sum(counts.company)).toBeLessThan(total);
  });

  it('counts a paint under each of its types', () => {
    const counts = getFacetCounts(initialQuery);
    expect(sum(counts.type)).toBeGreaterThanOrEqual(total);
  });
});

describe('getPaintResults with a collection', () => {
  const [first, second] = getPaintResults(initialQuery);
  const collection = {
    [paintId(first)]: 'owned',
    [paintId(second)]: 'wishlist',
  } as const;

  it('narrows to owned or wishlist paints', () => {
    expect(
      getPaintResults({ ...initialQuery, collection: 'owned' }, collection)
    ).toEqual([first]);
    expect(
      getPaintResults({ ...initialQuery, collection: 'wishlist' }, collection)
    ).toEqual([second]);
  });

  it('counts only the paints that are still shown', () => {
    const counts = getFacetCounts(
      { ...initialQuery, collection: 'owned' },
      collection
    );
    expect(counts.company[first.company]).toBe(1);
  });
});
