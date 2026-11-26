import { useCallback, useSyncExternalStore } from 'react';
import {
  type Collection,
  type CollectionChanges,
  type CollectionStatus,
  applyChanges,
  emptyCollection,
  parseCollection,
  serializeCollection,
  withStatus,
} from './collection';

const STORAGE_KEY = 'paint-collection';

// One shared store, so every component sees the same collection, and other
// tabs (via the `storage` event) too
const listeners = new Set<() => void>();
let cachedRaw: string | null | undefined;
let cached: Collection = emptyCollection;

// Set once storage refuses a write; from then on this page's memory is the truth
let memoryOnly = false;
let memoryRaw: string | null = null;

const read = (): string | null => {
  if (memoryOnly) return memoryRaw;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const getSnapshot = (): Collection => {
  const raw = read();
  // The same object until the stored text changes, as useSyncExternalStore needs
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cached = parseCollection(raw);
  }
  return cached;
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) listener();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
};

const write = (collection: Collection) => {
  const raw = serializeCollection(collection);
  memoryRaw = raw;
  try {
    window.localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    // Quota or blocked: keep the collection in memory for this visit
    memoryOnly = true;
  }
  listeners.forEach((listener) => listener());
};

/**
 * Which paints the visitor owns or wants, kept in localStorage. Empty on the
 * server and during hydration, so the page markup matches.
 */
export const useCollection = () => {
  const collection = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => emptyCollection
  );

  const setStatus = useCallback(
    (id: string, status: CollectionStatus | null) =>
      write(withStatus(getSnapshot(), id, status)),
    []
  );

  /**
   * Makes many changes in one write. They can be worked out from the latest
   * collection, so callers needn't be re-created each time it changes.
   * Returns the changes that would undo these.
   */
  const update = useCallback(
    (
      changes: CollectionChanges | ((current: Collection) => CollectionChanges)
    ) => {
      const current = getSnapshot();
      const result = applyChanges(
        current,
        typeof changes === 'function' ? changes(current) : changes
      );
      if (Object.keys(result.inverse).length > 0) write(result.collection);
      return result.inverse;
    },
    []
  );

  return { collection, setStatus, update };
};
