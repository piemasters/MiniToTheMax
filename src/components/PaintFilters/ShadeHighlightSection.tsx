import { useMemo } from 'react';
import type { PaintDetails } from '../../types';
import {
  getShadeHighlight,
  isBlendable,
} from '../../util/color/shadeHighlight';
import { getStatus } from '../../util/paints/collection';
import { paintId } from '../../util/paints/paintId';
import { useCollection } from '../../util/paints/useCollection';
import {
  noMatchesMessage,
  useSuggestionPaints,
} from '../../util/paints/useSuggestionPaints';
import { Paint } from '../Paint/Paint';
import { clsx } from '../util';

/** Paints to shade and highlight a paint with, picked from its own color family. */
export const ShadeHighlightSection = ({
  paint,
  allBrands,
  ownedOnly = false,
  headingId,
  onSelectPaint,
}: {
  paint: PaintDetails;
  allBrands: boolean;
  /** Suggest only paints the visitor has marked as owned. */
  ownedOnly?: boolean;
  headingId: string;
  onSelectPaint?: (paint: PaintDetails) => void;
}) => {
  const { collection } = useCollection();
  const paints = useSuggestionPaints(ownedOnly);
  const { shades, highlights } = useMemo(
    () => getShadeHighlight(paint, { allBrands, paints }),
    [paint, allBrands, paints]
  );

  // Washes, inks and the like are not blended with
  if (!isBlendable(paint)) return null;

  // Labels count outward from the base: "Shade 1" is the closest one
  const steps: { paint: PaintDetails; label: string; base?: boolean }[] = [
    ...shades.map((shade, index) => ({
      paint: shade,
      label: `Shade ${shades.length - index}`,
    })),
    { paint, label: 'Base', base: true },
    ...highlights.map((highlight, index) => ({
      paint: highlight,
      label: `Highlight ${index + 1}`,
    })),
  ];

  return (
    <section className="py-4" aria-labelledby={headingId}>
      <h3 id={headingId} className="m-0! mb-3! text-base!">
        Shade &amp; highlight
      </h3>
      <ol className="flex flex-wrap justify-center gap-x-1 gap-y-3 p-0! m-0! list-none!">
        {steps.map((step) => (
          <li
            key={`${step.label}-${paintId(step.paint)}`}
            className="flex flex-col items-center m-0! list-none! w-18"
          >
            <span
              className={clsx(
                'mb-1 text-[0.6rem] font-bold tracking-wide uppercase',
                step.base ? 'text-gray-900' : 'text-gray-600'
              )}
            >
              {step.label}
            </span>

            <Paint
              paint={step.paint}
              status={getStatus(collection, step.paint)}
              onSelect={onSelectPaint}
            />

            <span className="text-[0.6rem] leading-tight text-center text-gray-600">
              {step.paint.category}
            </span>
          </li>
        ))}
      </ol>
      {shades.length + highlights.length === 0 && (
        <p className="m-0! mt-2! text-sm text-gray-600 text-center">
          {noMatchesMessage(allBrands, ownedOnly)}
        </p>
      )}
    </section>
  );
};
