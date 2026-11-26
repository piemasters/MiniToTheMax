import { useCallback, useState } from 'react';
import type { Collection, CollectionChanges } from './collection';

export interface CollectionEdit {
  changes: CollectionChanges;
  /** Said once the change is made. */
  message: string;
}

/**
 * Changes to the collection that say what they did, with the latest one able to
 * be undone.
 */
export const useCollectionEdits = (
  update: (
    changes: (current: Collection) => CollectionChanges
  ) => CollectionChanges
) => {
  const [message, setMessage] = useState('');
  const [undoChanges, setUndoChanges] = useState<CollectionChanges | null>(
    null
  );

  const apply = useCallback(
    (edit: (current: Collection) => CollectionEdit) => {
      let said = '';
      const inverse = update((current) => {
        const result = edit(current);
        said = result.message;
        return result.changes;
      });
      setMessage(said);
      // If nothing changed, an earlier edit is still the one to undo
      if (Object.keys(inverse).length > 0) setUndoChanges(inverse);
    },
    [update]
  );

  const undo = useCallback(() => {
    if (!undoChanges) return;
    update(() => undoChanges);
    setUndoChanges(null);
    setMessage('Change undone.');
  }, [undoChanges, update]);

  const reset = useCallback(() => {
    setMessage('');
    setUndoChanges(null);
  }, []);

  return {
    message,
    canUndo: undoChanges !== null,
    apply,
    undo,
    reset,
    /** Reports something without changing anything. */
    report: setMessage,
  };
};
