import { type ReactNode, useEffect, useId, useRef } from 'react';

const canScroll = (scroller: HTMLElement) =>
  typeof scroller.scrollTo === 'function' &&
  typeof IntersectionObserver !== 'undefined';

const nextFrames = (count: number) =>
  new Promise<void>((resolve) => {
    const step = (left: number) =>
      requestAnimationFrame(() => (left > 1 ? step(left - 1) : resolve()));
    step(count);
  });

const openDrawer = async (dialog: HTMLDialogElement, scroller: HTMLElement) => {
  dialog.showModal();
  if (!canScroll(scroller)) return;

  if (!window.CSS?.supports?.('scroll-initial-target', 'nearest')) {
    // Start from the closed position, so the scroll below animates it in.
    // Two frames: a single one lets the second scrollTo cancel the first.
    scroller.scrollTo({ left: scroller.scrollWidth, behavior: 'instant' });
    await nextFrames(2);
  }
  // 'auto' defers to the CSS scroll-behavior, which is instant for people who
  // prefer reduced motion; scroll-snap then settles it fully open
  scroller.scrollTo({ left: 0, behavior: 'auto' });
};

/**
 * A modal slide-in panel that can be swiped away. The native <dialog> provides
 * the inert page, focus handling (the first control, Close, is focused on open
 * and focus returns to the trigger on close) and Esc to dismiss.
 *
 * The swipe is the browser's own scrolling: the sheet sits on a horizontal
 * scroll-snap scroller with an open and a closed stop, which gives momentum and
 * interruptible drags for free. An IntersectionObserver notices the sheet
 * leaving the window, however it got there, and closes the dialog. Styles are
 * in global.css under `.filter-drawer`.
 */
export const FilterDrawer = ({
  open,
  onOpenChange,
  resultCount,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resultCount: number;
  children: ReactNode;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const pressedInside = useRef(false);
  const titleId = useId();

  // Open, or slide away, when asked to
  useEffect(() => {
    const dialog = dialogRef.current;
    const scroller = scrollerRef.current;
    if (!dialog || !scroller) return;

    if (open && !dialog.open) {
      void openDrawer(dialog, scroller);
    } else if (!open && dialog.open) {
      if (canScroll(scroller)) {
        // The observer closes it once it has slid out of view
        scroller.scrollTo({ left: scroller.scrollWidth, behavior: 'auto' });
      } else {
        dialog.close();
      }
    }
  }, [open]);

  // The sheet leaving the window, by any route, is what closes the dialog.
  // Closing fires the dialog's `close` event, which keeps `open` in step.
  useEffect(() => {
    const dialog = dialogRef.current;
    const sheet = sheetRef.current;
    if (!dialog || !sheet || typeof IntersectionObserver === 'undefined')
      return;

    // "Any pixel visible" counts as not yet closed
    const visible = 1 / window.innerWidth;
    const observer = new IntersectionObserver(
      (entries) => {
        // Only the latest entry describes where the sheet is now
        const latest = entries.at(-1);
        if (latest && latest.intersectionRatio < visible && dialog.open) {
          dialog.close();
        }
      },
      { root: dialog, threshold: [visible, 1] }
    );
    observer.observe(sheet);
    return () => observer.disconnect();
  }, []);

  // Without scroll-driven animations, fade the backdrop from the scroll position
  useEffect(() => {
    const dialog = dialogRef.current;
    const scroller = scrollerRef.current;
    const sheet = sheetRef.current;
    if (!dialog || !scroller || !sheet) return;
    if (window.CSS?.supports?.('animation-timeline: scroll()')) return;

    const fade = () => {
      if (sheet.offsetWidth <= 0) return;
      const shown = 1 - scroller.scrollLeft / sheet.offsetWidth;
      dialog.style.setProperty('--drawer-backdrop', String(shown));
    };
    scroller.addEventListener('scroll', fade, { passive: true });
    return () => scroller.removeEventListener('scroll', fade);
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="filter-drawer"
      aria-labelledby={titleId}
      onCancel={(event) => {
        if (event.cancelable) {
          event.preventDefault();
          onOpenChange(false);
        }
      }}
      onClose={() => onOpenChange(false)}
      // Light dismiss: a tap on the dimmed area, which is the dialog and the
      // scroller around the sheet. A drag that starts inside the sheet and ends
      // outside it (selecting text) must not close it.
      onPointerDown={(event) => {
        pressedInside.current = Boolean(
          sheetRef.current?.contains(event.target as Node)
        );
      }}
      onClick={(event) => {
        const inside = sheetRef.current?.contains(event.target as Node);
        if (!inside && !pressedInside.current) onOpenChange(false);
        pressedInside.current = false;
      }}
    >
      <div ref={scrollerRef} className="filter-drawer-scroller">
        <div ref={sheetRef} className="filter-drawer-sheet">
          <div className="flex items-center justify-between gap-2 p-3 border-b">
            <h1 id={titleId} className="m-0! text-lg!">
              Filters
            </h1>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-3 py-2 text-sm! font-bold! bg-white border border-gray-400 rounded cursor-pointer hover:bg-gray-50"
            >
              Close
            </button>
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain">
            {children}
          </div>
          <div className="p-3 border-t">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="w-full px-3 py-3 text-sm! font-bold! text-white bg-gray-800 rounded cursor-pointer hover:bg-gray-700"
            >
              Show {resultCount} {resultCount === 1 ? 'paint' : 'paints'}
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};
