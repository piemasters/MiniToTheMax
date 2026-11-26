import { baseRetributorArmour } from '../../data/paints/citadel/base';
import { gameColorPolishedGold } from '../../data/paints/vallejo/game';
import {
  applyChanges,
  filterByCollection,
  getStatus,
  parseCollection,
  withStatus,
} from './collection';
import { paintId } from './paintId';

const owned = paintId(baseRetributorArmour);
const wanted = paintId(gameColorPolishedGold);
const collection = { [owned]: 'owned', [wanted]: 'wishlist' } as const;
const paints = [baseRetributorArmour, gameColorPolishedGold];

describe('parseCollection', () => {
  it('reads stored JSON', () => {
    expect(parseCollection(JSON.stringify(collection))).toEqual(collection);
  });

  it.each([null, '', 'not json', '[]', '"x"', 'null'])(
    'treats %p as empty',
    (raw) => {
      expect(parseCollection(raw)).toEqual({});
    }
  );

  it('drops entries that are not a known status', () => {
    expect(parseCollection('{"a":"owned","b":"nope","c":3}')).toEqual({
      a: 'owned',
    });
  });
});

describe('withStatus', () => {
  it('sets, replaces and clears without changing the original', () => {
    const original = { a: 'owned' } as const;
    expect(withStatus(original, 'b', 'wishlist')).toEqual({
      a: 'owned',
      b: 'wishlist',
    });
    expect(withStatus(original, 'a', 'wishlist')).toEqual({ a: 'wishlist' });
    expect(withStatus(original, 'a', null)).toEqual({});
    expect(original).toEqual({ a: 'owned' });
  });
});

describe('filterByCollection', () => {
  it('shows everything for all', () => {
    expect(filterByCollection(paints, 'all', {})).toEqual(paints);
  });

  it('shows owned paints, or wishlist paints', () => {
    expect(filterByCollection(paints, 'owned', collection)).toEqual([
      baseRetributorArmour,
    ]);
    expect(filterByCollection(paints, 'wishlist', collection)).toEqual([
      gameColorPolishedGold,
    ]);
  });

  it('shows everything not owned, wishlist included, for missing', () => {
    expect(filterByCollection(paints, 'missing', collection)).toEqual([
      gameColorPolishedGold,
    ]);
    expect(filterByCollection(paints, 'missing', {})).toEqual(paints);
  });

  it('finds the status of a paint', () => {
    expect(getStatus(collection, gameColorPolishedGold)).toBe('wishlist');
    expect(getStatus({}, gameColorPolishedGold)).toBeUndefined();
  });
});

describe('applyChanges', () => {
  it('makes every change and returns what would reverse them', () => {
    const result = applyChanges(collection, {
      [owned]: null,
      [wanted]: 'owned',
      added: 'wishlist',
    });
    expect(result.collection).toEqual({
      [wanted]: 'owned',
      added: 'wishlist',
    });
    expect(applyChanges(result.collection, result.inverse).collection).toEqual(
      collection
    );
  });

  it('leaves out changes that change nothing', () => {
    expect(
      applyChanges(collection, { [owned]: 'owned', missing: null }).inverse
    ).toEqual({});
  });
});
