import { useEffect, useId, useRef, useState } from 'react';
import type { PaintDetails } from '../../types';
import { capitalise } from '../../util/capitalise';
import { closeTopLayer } from '../../util/closeTopLayer';
import type { CollectionStatus } from '../../util/paints/collection';
import { paintId } from '../../util/paints/paintId';
import type { PostLink } from '../../util/paints/paintPosts';
import { isBlendable } from '../../util/color/shadeHighlight';
import { Paint } from '../Paint/Paint';
import { ColorSchemesSection } from './ColorSchemesSection';
import { SeenIn } from './SeenIn';
import { ShadeHighlightSection } from './ShadeHighlightSection';
import { clsx } from '../../util/clsx';

const FEEDBACK_MS = 2000;

/**
 * The native <dialog> provides the inert page, focus handling and Esc.
 * Styles are in global.css under `.paint-dialog`.
 */
export const PaintDetailsDialog = ({
  paint,
  open,
  onOpenChange,
  onFindSimilar,
  status,
  onStatusChange,
  posts = [],
  onSelectPaint,
}: {
  paint: PaintDetails;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFindSimilar: (hex: string) => void;
  /** Whether the visitor owns this paint or has it on their wishlist. */
  status?: CollectionStatus;
  onStatusChange: (status: CollectionStatus | null) => void;
  /** Posts that show this paint. */
  posts?: PostLink[];
  /** Switches the dialog to another paint, e.g. one suggested for blending. */
  onSelectPaint?: (paint: PaintDetails) => void;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pressedBackdrop = useRef(false);
  const titleId = useId();
  const [allBrands, setAllBrands] = useState(false);
  const brandsId = useId();
  const [ownedOnly, setOwnedOnly] = useState(false);
  const ownedId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) void closeTopLayer(dialog);
  }, [open]);

  // Copy feedback. The message sits outside the button, in its own live region,
  // because a button's children are not reliably announced.
  const [message, setMessage] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const lastMessage = useRef('');
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    clearTimeout(timer.current);
    let result = 'Copied';
    try {
      await navigator.clipboard.writeText(paint.hex.toUpperCase());
    } catch {
      // No clipboard (insecure page) or permission denied: say so, don't fail silently
      result = 'Copy failed';
    }
    // VoiceOver skips a message identical to the last one, so make it differ
    if (result === lastMessage.current) result += ' ';
    lastMessage.current = result;

    setMessage('');
    requestAnimationFrame(() => setMessage(result));
    timer.current = setTimeout(() => setMessage(''), FEEDBACK_MS);
  };

  const hex = paint.hex.toUpperCase();
  const details: [label: string, value: string | undefined][] = [
    ['Company', paint.company],
    ['Category', paint.category],
    ['Type', paint.type.map(capitalise).join(', ')],
    ['Color', capitalise(paint.color)],
    ['Availability', capitalise(paint.availability)],
    ['Number', paint.number],
    ['Hex', hex],
  ];

  return (
    <dialog
      ref={dialogRef}
      className="paint-dialog"
      aria-labelledby={titleId}
      // Esc: animate out instead of closing instantly
      onCancel={(event) => {
        event.preventDefault();
        onOpenChange(false);
      }}
      onClose={() => onOpenChange(false)}
      // Light dismiss. Only a press and release on the backdrop (which targets
      // the dialog itself) closes it; a text selection ending there does not.
      onPointerDown={(event) => {
        pressedBackdrop.current = event.target === event.currentTarget;
      }}
      onClick={(event) => {
        if (pressedBackdrop.current && event.target === event.currentTarget) {
          onOpenChange(false);
        }
        pressedBackdrop.current = false;
      }}
    >
      <div className="paint-dialog-panel">
        <header className="flex! items-center justify-between gap-3 px-5 py-3 border-b border-gray-200">
          <h1 id={titleId} className="m-0! text-xl! leading-tight!">
            {paint.name}
          </h1>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className={clsx(
              'px-3 py-2 text-sm! font-bold! border rounded-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700',
              'shrink-0 bg-white border-gray-300 hover:bg-gray-50'
            )}
          >
            Close
          </button>
        </header>

        <div className="paint-dialog-body">
          {/* The swatch, tinted with the paint's own color, beside the actions */}
          <div
            className="flex flex-wrap items-center gap-5 px-5 py-5"
            style={{
              backgroundImage: `linear-gradient(135deg, ${paint.hex}38, transparent 75%)`,
            }}
          >
            <div className="flex items-center justify-center w-28 h-36 mx-auto sm:mx-0">
              <div className="scale-[1.4]">
                <Paint paint={paint} />
              </div>
            </div>

            <div className="flex-1 min-w-48">
              <div
                role="group"
                aria-label="My collection"
                className="grid grid-cols-2 gap-2"
              >
                {(['owned', 'wishlist'] as const).map((option) => {
                  const pressed = status === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={pressed}
                      onClick={() => onStatusChange(pressed ? null : option)}
                      className={clsx(
                        'px-3 py-2 text-sm! font-bold! border rounded-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700',
                        !pressed && 'bg-white border-gray-300 hover:bg-gray-50',
                        pressed &&
                          option === 'owned' &&
                          'text-white bg-green-700 border-green-700 hover:bg-green-800',
                        pressed &&
                          option === 'wishlist' &&
                          'text-white bg-purple-700 border-purple-700 hover:bg-purple-800'
                      )}
                    >
                      <span aria-hidden="true">
                        {option === 'owned' ? '✓ ' : '★ '}
                      </span>
                      {option === 'owned' ? 'Owned' : 'Wishlist'}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-4">
                <button
                  type="button"
                  onClick={copy}
                  className={clsx(
                    'px-2 py-1.5 text-xs! border rounded-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700',
                    'text-white bg-gray-800 border-gray-800 hover:bg-gray-700'
                  )}
                >
                  Copy {hex}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onFindSimilar(paint.hex);
                    onOpenChange(false);
                  }}
                  className={clsx(
                    'px-2 py-1.5 text-xs! border rounded-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700',
                    'bg-white border-gray-300 hover:bg-gray-50'
                  )}
                >
                  Find similar
                </button>
                <span role="status" className="text-xs text-gray-600 italic">
                  {message}
                </span>
              </div>
            </div>
          </div>
          <div className="p-4">
            <dl className="grid grid-cols-2 gap-2 px-5 pt-4 m-0! text-sm">
              {details
                .filter(([, value]) => value)
                .map(([label, value]) => (
                  <div
                    key={label}
                    className="px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                  >
                    <dt className="text-[0.7rem] font-bold tracking-wide text-gray-600 uppercase">
                      {label}
                    </dt>
                    <dd className="flex items-center gap-2 m-0! wrap-break-word">
                      {label === 'Hex' && (
                        <span
                          aria-hidden="true"
                          className="inline-block w-3 h-3 border border-gray-400 rounded-full"
                          style={{ backgroundColor: paint.hex }}
                        />
                      )}
                      {value}
                    </dd>
                  </div>
                ))}
            </dl>
          </div>

          {isBlendable(paint) && (
            <div className="px-5 pt-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="m-0! text-xl!">Suggestions</h2>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  <label
                    htmlFor={brandsId}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      id={brandsId}
                      type="checkbox"
                      checked={allBrands}
                      onChange={(event) => setAllBrands(event.target.checked)}
                    />
                    Include other brands
                  </label>
                  <label
                    htmlFor={ownedId}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      id={ownedId}
                      type="checkbox"
                      checked={ownedOnly}
                      onChange={(event) => setOwnedOnly(event.target.checked)}
                    />
                    Only paints I own
                  </label>
                </div>
              </div>
              <ShadeHighlightSection
                paint={paint}
                allBrands={allBrands}
                ownedOnly={ownedOnly}
                headingId={`${titleId}-blend`}
                onSelectPaint={onSelectPaint}
              />
              <ColorSchemesSection
                paint={paint}
                allBrands={allBrands}
                ownedOnly={ownedOnly}
                headingId={`${titleId}-schemes`}
                onSelectPaint={onSelectPaint}
              />
            </div>
          )}

          {posts.length > 0 && (
            <SeenIn
              key={paintId(paint)}
              posts={posts}
              headingId={`${titleId}-posts`}
            />
          )}
        </div>
      </div>
    </dialog>
  );
};
