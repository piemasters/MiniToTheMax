import { type Collection, parseCollection } from './collection';
import { getAllSortedPaints } from './getAllSortedPaints';
import { paintId } from './paintId';

/** Identifies our own files, so other JSON isn't read as a collection. */
const BACKUP_APP = 'minitothemax-paints';

/** Far more than every paint marked, but stops a huge file being read. */
export const MAX_BACKUP_BYTES = 1_000_000;

export const backupFileName = (date: Date) =>
  `${BACKUP_APP}-${date.toISOString().slice(0, 10)}.json`;

export const createBackup = (collection: Collection, date: Date) =>
  JSON.stringify(
    {
      app: BACKUP_APP,
      version: 1,
      exported: date.toISOString(),
      paints: collection,
    },
    null,
    2
  );

/**
 * The paints in a backup file, or null if it isn't one. `unknown` counts
 * entries for paints that aren't in the list (renamed or removed since).
 */
export const readBackup = (
  text: string
): { paints: Collection; unknown: number } | null => {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return null;
  }
  const { app, version, paints } = (data ?? {}) as Record<string, unknown>;
  if (app !== BACKUP_APP || version !== 1) return null;
  if (!paints || typeof paints !== 'object' || Array.isArray(paints)) {
    return null;
  }

  const known = new Set(getAllSortedPaints().map(paintId));
  const entries = Object.entries(parseCollection(JSON.stringify(paints)));
  const found = entries.filter(([id]) => known.has(id));
  return {
    paints: Object.fromEntries(found),
    unknown: entries.length - found.length,
  };
};
