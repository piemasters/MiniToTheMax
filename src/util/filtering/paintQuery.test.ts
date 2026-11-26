import { initialFilters } from './paintFilters';
import {
  type PaintQuery,
  initialQuery,
  readQuery,
  writeQuery,
} from './paintQuery';

const withGroup = (
  field: keyof PaintQuery['filters'],
  changes: Record<string, boolean>
): PaintQuery => ({
  ...initialQuery,
  filters: {
    ...initialFilters,
    [field]: { ...initialFilters[field], ...changes },
  },
});

describe('writeQuery', () => {
  it('is empty for the default query', () => {
    expect(writeQuery(initialQuery)).toBe('');
  });

  it('writes search and sort', () => {
    const search = writeQuery({
      ...initialQuery,
      search: ' dark red ',
      sort: 'hue',
    });
    expect(new URLSearchParams(search).get('q')).toBe('dark red');
    expect(new URLSearchParams(search).get('sort')).toBe('hue');
  });

  it('lists the hidden options when fewer are hidden than shown', () => {
    const params = new URLSearchParams(
      writeQuery(withGroup('company', { Vallejo: false }))
    );
    expect(params.getAll('x-company')).toEqual(['Vallejo']);
    expect(params.has('company')).toBe(false);
  });

  it('lists the shown options when fewer are shown than hidden', () => {
    const everythingOff = Object.fromEntries(
      Object.keys(initialFilters.category).map((key) => [key, false])
    );
    const params = new URLSearchParams(
      writeQuery(
        withGroup('category', { ...everythingOff, 'Citadel Base': true })
      )
    );
    expect(params.getAll('category')).toEqual(['Citadel Base']);
    expect(params.has('x-category')).toBe(false);
  });

  it('writes an empty value when nothing is shown', () => {
    const none = Object.fromEntries(
      Object.keys(initialFilters.availability).map((key) => [key, false])
    );
    const params = new URLSearchParams(
      writeQuery(withGroup('availability', none))
    );
    expect(params.getAll('availability')).toEqual(['']);
  });

  it('writes the color match without the #', () => {
    const search = writeQuery({
      ...initialQuery,
      color: { enabled: true, hex: '#B22222', threshold: 12 },
    });
    const params = new URLSearchParams(search);
    expect(params.get('hex')).toBe('b22222');
    expect(params.get('delta')).toBe('12');
  });

  it('leaves unrelated params alone and replaces our own', () => {
    const search = writeQuery(
      { ...initialQuery, search: 'red' },
      '?utm_source=news&q=old&sort=hue&x-company=Ionic'
    );
    const params = new URLSearchParams(search);
    expect(params.get('utm_source')).toBe('news');
    expect(params.get('q')).toBe('red');
    expect(params.has('sort')).toBe(false);
    expect(params.has('x-company')).toBe(false);
  });
});

describe('readQuery', () => {
  it('gives the default query for no params', () => {
    expect(readQuery('')).toEqual(initialQuery);
  });

  it('ignores unknown params, options and sort values', () => {
    const query = readQuery(
      '?utm=1&company=Nope&x-type=nope&sort=bogus&hex=nothex&delta=9'
    );
    expect(query.sort).toBe('default');
    expect(query.color.enabled).toBe(false);
    // A stale or mistyped link degrades to "no narrowing", not "show nothing"
    expect(query.filters.company).toEqual(initialFilters.company);
    expect(query.filters.type).toEqual(initialFilters.type);
  });

  it('clamps and defaults the color closeness', () => {
    expect(readQuery('?hex=b22222&delta=999').color.threshold).toBe(50);
    expect(readQuery('?hex=b22222&delta=0').color.threshold).toBe(15);
    expect(readQuery('?hex=b22222&delta=abc').color.threshold).toBe(15);
  });

  it('only keeps sort=closest while a color is matched', () => {
    expect(readQuery('?sort=closest').sort).toBe('default');
    expect(readQuery('?sort=closest&hex=b22222').sort).toBe('closest');
  });
});

describe('writeQuery then readQuery', () => {
  const roundTrip = (query: PaintQuery) => readQuery(writeQuery(query));

  it('restores each kind of narrowing exactly', () => {
    const queries: PaintQuery[] = [
      withGroup('company', { Vallejo: false }),
      withGroup('type', { metallic: false, ink: false, wash: false }),
      {
        ...initialQuery,
        search: 'dark red',
        sort: 'closest',
        color: { enabled: true, hex: '#b22222', threshold: 20 },
      },
      withGroup(
        'category',
        Object.fromEntries(
          Object.keys(initialFilters.category).map((key) => [
            key,
            key === 'Citadel Base',
          ])
        )
      ),
      withGroup(
        'availability',
        Object.fromEntries(
          Object.keys(initialFilters.availability).map((key) => [key, false])
        )
      ),
    ];
    for (const query of queries) {
      expect(roundTrip(query)).toEqual(query);
    }
  });
});

describe('collection filter in the URL', () => {
  it('is written and read back', () => {
    const query = { ...initialQuery, collection: 'owned' as const };
    const search = writeQuery(query);
    expect(search).toBe('?mine=owned');
    expect(readQuery(search).collection).toBe('owned');
  });

  it('is left out when showing everything, and ignored when unknown', () => {
    expect(writeQuery(initialQuery)).toBe('');
    expect(readQuery('?mine=bogus').collection).toBe('all');
  });
});
