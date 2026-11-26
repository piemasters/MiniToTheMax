import { type ChangeEvent, useId, useMemo, useRef } from 'react';
import type { PaintDetails } from '../../types';
import {
  type Collection,
  type CollectionChanges,
  type CollectionStatus,
  getStatus,
} from '../../util/paints/collection';
import {
  MAX_BACKUP_BYTES,
  backupFileName,
  createBackup,
  readBackup,
} from '../../util/paints/collectionBackup';
import { paintId } from '../../util/paints/paintId';
import type { useCollectionEdits } from '../../util/paints/useCollectionEdits';
import { clsx } from '../util';

const plural = (count: number) => (count === 1 ? 'paint' : 'paints');

const changeAll = (
  paints: PaintDetails[],
  status: CollectionStatus | null
): CollectionChanges =>
  Object.fromEntries(paints.map((paint) => [paintId(paint), status]));

// FileReader rather than file.text(), which the test environment lacks
const readText = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });

/**
 * The tools for recording which paints you own: marking everything shown at
 * once, tapping swatches (the page makes them toggles while this is open), and
 * saving or loading a backup file.
 */
export const MyPaintsEditor = ({
  id,
  editing,
  results,
  collection,
  edits,
}: {
  /** For the button that opens this to point at. */
  id: string;
  editing: boolean;
  /** The paints currently shown, which the bulk buttons act on. */
  results: PaintDetails[];
  collection: Collection;
  edits: ReturnType<typeof useCollectionEdits>;
}) => {
  const headingId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const markRef = useRef<HTMLButtonElement>(null);

  const { owned, notOwned } = useMemo(() => {
    const owned: PaintDetails[] = [];
    const notOwned: PaintDetails[] = [];
    for (const paint of results) {
      (getStatus(collection, paint) === 'owned' ? owned : notOwned).push(paint);
    }
    return { owned, notOwned };
  }, [results, collection]);
  const saved = Object.keys(collection).length;

  const markShown = () => {
    if (notOwned.length === 0) return;
    edits.apply(() => ({
      changes: changeAll(notOwned, 'owned'),
      message: `Marked ${notOwned.length} ${plural(notOwned.length)} as owned.`,
    }));
  };

  const unmarkShown = () => {
    if (owned.length === 0) return;
    edits.apply(() => ({
      changes: changeAll(owned, null),
      message: `Unmarked ${owned.length} ${plural(owned.length)}.`,
    }));
  };

  const download = () => {
    if (saved === 0) return;
    const now = new Date();
    const url = URL.createObjectURL(
      new Blob([createBackup(collection, now)], { type: 'application/json' })
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = backupFileName(now);
    link.click();
    // Not at once: some browsers haven't started the download yet
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    edits.report(`Downloaded a backup of ${saved} ${plural(saved)}.`);
  };

  const load = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const file = input.files?.[0];
    if (!file) return;
    // Cleared so that choosing the same file again still counts as a change
    input.value = '';

    const backup =
      file.size <= MAX_BACKUP_BYTES
        ? await readText(file).then(readBackup, () => null)
        : null;
    if (!backup) {
      edits.report('That file isn’t a paint backup. Nothing was changed.');
      return;
    }
    const count = Object.keys(backup.paints).length;
    const skipped = backup.unknown
      ? ` Skipped ${backup.unknown} not in the paint list.`
      : '';
    // Added to what is here, so loading a backup never removes anything
    edits.apply(() => ({
      changes: backup.paints,
      message: `Loaded ${count} ${plural(count)} from the backup.${skipped}`,
    }));
  };

  return (
    <div id={id}>
      {editing && (
        <section
          aria-labelledby={headingId}
          className="p-3 mb-3 border border-gray-300 rounded-md bg-gray-50"
        >
          <h2 id={headingId} className="m-0! mb-1! text-base!">
            Edit my paints
          </h2>
          <p className="m-0! mb-3! text-sm text-gray-700">
            Tap a paint to mark it as owned, or tap it again to unmark it. To do
            many at once, filter or search first, then use these buttons.
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {/* aria-disabled, so focus isn't lost once there's nothing left */}
            <button
              ref={markRef}
              type="button"
              onClick={markShown}
              aria-disabled={notOwned.length === 0}
              className={clsx(
                'px-3 py-2 text-sm! font-bold! border rounded-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 aria-disabled:opacity-50 aria-disabled:cursor-default',
                'text-white bg-green-700 border-green-700 hover:bg-green-800'
              )}
            >
              Mark {notOwned.length} shown as owned
            </button>
            <button
              type="button"
              onClick={unmarkShown}
              aria-disabled={owned.length === 0}
              className={clsx(
                'px-3 py-2 text-sm! font-bold! border rounded-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 aria-disabled:opacity-50 aria-disabled:cursor-default',
                'bg-white border-gray-300 hover:bg-gray-50'
              )}
            >
              Unmark {owned.length} shown
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <button
              type="button"
              onClick={download}
              aria-disabled={saved === 0}
              className={clsx(
                'px-3 py-2 text-sm! font-bold! border rounded-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 aria-disabled:opacity-50 aria-disabled:cursor-default',
                'bg-white border-gray-300 hover:bg-gray-50'
              )}
            >
              Download backup
            </button>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className={clsx(
                'px-3 py-2 text-sm! font-bold! border rounded-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 aria-disabled:opacity-50 aria-disabled:cursor-default',
                'bg-white border-gray-300 hover:bg-gray-50'
              )}
            >
              Load backup
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".json,application/json"
              aria-label="Backup file"
              onChange={load}
              hidden
            />
          </div>
          <p className="m-0! mt-2! text-xs text-gray-600">
            Your paints are saved only in this browser. A backup keeps them safe
            and moves them to another device. Loading one adds to what is
            already here.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-2 min-h-8">
            <p role="status" className="m-0! text-sm font-bold">
              {edits.message}
            </p>
            {edits.canUndo && (
              <button
                type="button"
                onClick={() => {
                  edits.undo();
                  markRef.current?.focus();
                }}
                className="text-sm! font-bold! text-blue-800 underline cursor-pointer"
              >
                Undo
              </button>
            )}
          </div>
        </section>
      )}
    </div>
  );
};
