import type { Ref } from 'react';
import { clsx } from '../util';

/** Opens and closes the tools for recording which paints you own. */
export const EditPaintsButton = ({
  editing,
  onEditingChange,
  panelId,
  ref,
}: {
  editing: boolean;
  onEditingChange: (editing: boolean) => void;
  /** The element the tools appear in. */
  panelId: string;
  ref?: Ref<HTMLButtonElement>;
}) => (
  <button
    ref={ref}
    type="button"
    aria-expanded={editing}
    aria-controls={panelId}
    onClick={() => onEditingChange(!editing)}
    className={clsx(
      'h-10 px-3 text-sm! font-bold! whitespace-nowrap border rounded cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700',
      editing
        ? 'text-white bg-gray-800 border-gray-800 hover:bg-gray-700'
        : 'bg-white border-gray-400 hover:bg-gray-50'
    )}
  >
    {editing ? 'Done editing' : 'Edit my paints'}
  </button>
);
