import { memo } from 'react';
import type { CollectionStatus } from '../../util/paints/collection';
import { paintId } from '../../util/paints/paintId';
import type { PaintDetails } from '../../types';
import { brands } from './brands';
import { PaintGradient } from './shared/PaintGradient';
import { PaintShape } from './shared/PaintShape';
import { usePaintIds } from './shared/paintIds';
import { potViewBox, SWATCH_HEIGHT, SWATCH_WIDTH } from './shared/potViewBox';
import { clsx } from '../util';

export const Paint = memo(function Paint({
  paint,
  onSelect,
  status,
  selectOwned = false,
}: {
  paint: PaintDetails;
  /** Makes the swatch a button, e.g. to show the paint's details. */
  onSelect?: (paint: PaintDetails) => void;
  /** Marks the pot as one the visitor owns, or wants. */
  status?: CollectionStatus;
  /**
   * Makes the button an "I own this" toggle, pressed when owned, rather than
   * one that opens something.
   */
  selectOwned?: boolean;
}) {
  const brand = brands[paint.company];
  const ids = usePaintIds();
  const { gradient, hex, name } = paint;
  const label = brand.label?.(paint) ?? name;

  const swatch = (
    <span
      className={clsx(
        'w-15 flex flex-col justify-center',
        status && ' relative'
      )}
    >
      {status && (
        <span
          aria-hidden="true"
          className={clsx(
            'absolute top-0 right-0 z-10 flex items-center justify-center w-4 h-4 text-[0.6rem] leading-none text-white rounded-full',
            status === 'owned' ? 'bg-green-700' : 'bg-purple-700'
          )}
        >
          {status === 'owned' ? '✓' : '★'}
        </span>
      )}
      <span className="block mb-2">
        {brand.image?.(paint) || (
          <svg
            viewBox={potViewBox(brand.bounds(paint))}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            height={SWATCH_HEIGHT}
            width={SWATCH_WIDTH}
          >
            <PaintShape
              d={brand.shapePath(paint)}
              gradientId={ids.gradient}
              paint={paint}
            />
            {gradient && (
              <defs>
                <PaintGradient
                  id={ids.gradient}
                  spec={brand.gradient(paint)}
                  stops={gradient}
                />
                {brand.defs?.(paint, ids)}
              </defs>
            )}
            {brand.overlay?.(paint, ids)}
          </svg>
        )}
      </span>
      <span className="block flex-1 text-[0.6rem] leading-4 text-center max-w-full">
        {label}
      </span>
    </span>
  );

  return (
    <div
      data-testid={`paint_${paintId(paint)}`}
      className="inline-block m-1 w-full"
    >
      {onSelect ? (
        <button
          type="button"
          onClick={() => onSelect(paint)}
          aria-haspopup={selectOwned ? undefined : 'dialog'}
          aria-pressed={selectOwned ? status === 'owned' : undefined}
          title={`${label} · ${hex.toUpperCase()}`}
          className={clsx(
            'flex w-full h-full justify-center px-0 py-1 border-0 rounded cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700',
            selectOwned && status === 'owned'
              ? 'bg-green-100 inset-ring-2 inset-ring-green-700'
              : 'bg-transparent hover:bg-gray-100'
          )}
        >
          {swatch}
          <span className="sr-only">
            Hex {hex.toUpperCase()}
            {status === 'owned' && !selectOwned && ', owned'}
            {status === 'wishlist' && ', on wishlist'}
          </span>
        </button>
      ) : (
        swatch
      )}
    </div>
  );
});

export default Paint;
