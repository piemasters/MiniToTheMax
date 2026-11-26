import { baseRetributorArmour } from '../../data/paints/citadel/base';
import { backupFileName, createBackup, readBackup } from './collectionBackup';
import { paintId } from './paintId';

const id = paintId(baseRetributorArmour);
const date = new Date('2026-03-04T12:00:00Z');

describe('collection backup', () => {
  it('names the file after the day', () => {
    expect(backupFileName(date)).toBe('minitothemax-paints-2026-03-04.json');
  });

  it('reads back what it wrote', () => {
    expect(readBackup(createBackup({ [id]: 'owned' }, date))).toEqual({
      paints: { [id]: 'owned' },
      unknown: 0,
    });
  });

  it('skips and counts paints that are not in the list', () => {
    const text = createBackup({ [id]: 'wishlist', gone: 'owned' }, date);
    expect(readBackup(text)).toEqual({
      paints: { [id]: 'wishlist' },
      unknown: 1,
    });
  });

  it.each([
    'not json',
    'null',
    '[]',
    '{"some":"other file"}',
    '{"app":"minitothemax-paints","version":2,"paints":{}}',
    '{"app":"minitothemax-paints","version":1,"paints":[]}',
  ])('rejects %p', (text) => {
    expect(readBackup(text)).toBeNull();
  });
});
