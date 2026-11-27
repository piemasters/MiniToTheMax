import { type KeyboardEvent, useId, useMemo, useRef, useState } from 'react';
import type { PaintDetails } from '../../types';
import {
  ColorSchemeDescriptions,
  ColorSchemeLabels,
  ColorSchemes,
  type ColorScheme,
  type SchemeEntry,
  getColorScheme,
  hasHue,
} from '../../util/color/colorSchemes';
import { paintId } from '../../util/paints/paintId';
import {
  noMatchesMessage,
  useSuggestionPaints,
} from '../../util/paints/useSuggestionPaints';
import { getColorByBgColor } from '../Paint/util/getColorByBgColor';
import { clsx } from '../../util/clsx';

// Wheel geometry, in the SVG's own 200 x 200 units
const CENTER = 100;
const DOT_RADIUS = 80;

// Cuts out the middle so only the ring is left
const RING_MASK = 'radial-gradient(circle, transparent 62%, #000 63%)';

const RING_GRADIENT = `conic-gradient(from 0deg, ${[
  0, 60, 120, 180, 240, 300, 360,
]
  .map((hue) => `hsl(${hue} 70% 50%)`)
  .join(', ')})`;

// Hue 0 (red) is at the top, increasing clockwise, like the conic gradient
const position = (hue: number, radius: number) => {
  const radians = (hue * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.sin(radians),
    y: CENTER - radius * Math.cos(radians),
  };
};

const tabId = (id: string, scheme: ColorScheme) => `${id}-tab-${scheme}`;

/** The hue wheel, with a dot on it for each paint in the scheme. */
const Wheel = ({
  entries,
  stacked,
}: {
  entries: SchemeEntry[];
  /** One hue in several lightnesses: spread the dots inward instead. */
  stacked: boolean;
}) => {
  const baseHue = entries.find((entry) => entry.isBase)?.hue ?? 0;
  const points = entries.map((entry, index) => ({
    entry,
    ...position(
      stacked ? baseHue : entry.hue,
      stacked ? DOT_RADIUS - (entries.length - 1 - index) * 22 : DOT_RADIUS
    ),
  }));
  const outline = points.map(({ x, y }) => `${x},${y}`).join(' ');

  return (
    <div className="relative w-44 h-44 shrink-0" aria-hidden="true">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundImage: RING_GRADIENT,
          WebkitMask: RING_MASK,
          mask: RING_MASK,
        }}
      />
      <svg viewBox="0 0 200 200" className="absolute inset-0">
        {points.length > 2 ? (
          <polygon
            points={outline}
            fill="rgb(0 0 0 / 0.06)"
            stroke="#6b7280"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
        ) : (
          <polyline
            points={outline}
            fill="none"
            stroke="#6b7280"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
        )}
        {points.map(({ entry, x, y }, index) => (
          <g key={`${entry.role}-${paintId(entry.paint)}`}>
            <circle
              cx={x}
              cy={y}
              r={entry.isBase ? 17 : 14}
              fill={entry.paint.hex}
              stroke="#fff"
              strokeWidth="2.5"
            />
            <text
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="14"
              fontWeight="bold"
              fontFamily="sans-serif"
              fill={getColorByBgColor(entry.paint.hex)}
            >
              {index + 1}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

/**
 * Color schemes for a paint (complementary, triadic and so on): a wheel showing
 * where each paint sits, and the paints themselves.
 */
export const ColorSchemesSection = ({
  paint,
  allBrands,
  ownedOnly = false,
  headingId,
  onSelectPaint,
}: {
  paint: PaintDetails;
  allBrands: boolean;
  ownedOnly?: boolean;
  headingId: string;
  onSelectPaint?: (paint: PaintDetails) => void;
}) => {
  const [scheme, setScheme] = useState<ColorScheme>('triadic');
  const id = useId();
  const tabs = useRef<Record<string, HTMLButtonElement | null>>({});

  const paints = useSuggestionPaints(ownedOnly);
  const entries = useMemo(
    () => getColorScheme(paint, scheme, { allBrands, paints }),
    [paint, scheme, allBrands, paints]
  );

  // A black, white or grey paint has no hue to build a scheme round
  if (!hasHue(paint)) return null;

  const moveTab = (event: KeyboardEvent, from: number) => {
    const last = ColorSchemes.length - 1;
    const to = {
      ArrowRight: from === last ? 0 : from + 1,
      ArrowLeft: from === 0 ? last : from - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (to === undefined) return;
    event.preventDefault();
    setScheme(ColorSchemes[to]);
    tabs.current[ColorSchemes[to]]?.focus();
  };

  return (
    <section
      className="py-4 border-t border-gray-200"
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="m-0! mb-3! text-base!">
        Color schemes
      </h3>

      <div
        role="tablist"
        aria-labelledby={headingId}
        // One row once the dialog is wide enough; they wrap on smaller screens
        className="flex flex-wrap gap-2 mb-3 md:flex-nowrap md:gap-1"
      >
        {ColorSchemes.map((option, index) => (
          <button
            key={option}
            ref={(element) => {
              tabs.current[option] = element;
            }}
            id={tabId(id, option)}
            type="button"
            role="tab"
            aria-selected={scheme === option}
            aria-controls={`${id}-panel`}
            tabIndex={scheme === option ? 0 : -1}
            onClick={() => setScheme(option)}
            onKeyDown={(event) => moveTab(event, index)}
            className={`px-3 py-1.5 text-xs! md:px-2 md:whitespace-nowrap border rounded-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
              scheme === option
                ? 'font-bold! text-white bg-gray-800 hover:bg-gray-700 border-gray-800'
                : 'bg-white border-gray-300 hover:bg-gray-200'
            }`}
          >
            {ColorSchemeLabels[option]}
          </button>
        ))}
      </div>

      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={tabId(id, scheme)}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <div className="flex flex-col items-center w-44 gap-3 shrink-0">
          {entries && (
            <Wheel entries={entries} stacked={scheme === 'monochromatic'} />
          )}
          <p className="m-0! text-xs italic text-center text-gray-700 min-h-30">
            {ColorSchemeDescriptions[scheme]}
          </p>
        </div>

        <div className="flex-1 min-w-52">
          <div className="min-h-105">
            <ol className="p-0! m-0! list-none! text-sm">
              {entries?.map((entry, index) => {
                return (
                  <li
                    key={`${entry.role}-${paintId(entry.paint)}`}
                    className="m-0! mb-1.5! list-none!"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        !(entry.isBase || !onSelectPaint) &&
                        onSelectPaint(entry.paint)
                      }
                      className={clsx(
                        'flex items-center w-full h-19 gap-3 px-3 cursor-pointer',
                        'border border-gray-200 rounded-md',
                        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700',
                        entry.isBase
                          ? 'bg-gray-50'
                          : 'bg-white hover:bg-gray-50'
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className="w-6 h-6 border border-gray-300 rounded shrink-0"
                        style={{ backgroundColor: entry.paint.hex }}
                      />
                      <span className="flex-1 min-w-0 text-left">
                        <span className="block text-[0.65rem] tracking-wide text-gray-600 uppercase">
                          {index + 1}. {entry.role}
                        </span>
                        <span className="block font-bold truncate">
                          {entry.paint.name}
                        </span>
                        <span className="block text-xs text-gray-600 truncate">
                          {entry.paint.category}
                        </span>
                      </span>
                      <span className="text-xs tabular-nums text-gray-700">
                        ΔE {entry.deltaE.toFixed(1)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
            {entries && entries.length === 1 && (
              <p className="m-0! text-sm text-gray-600">
                {noMatchesMessage(allBrands, ownedOnly)}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
