import { useEffect, useId, useState } from 'react';
import { type ColorFilter, parseHex } from '../../util/color/colorFilter';
import { CollapsibleFilter, type HeadingLevel } from './CollapsibleFilter';

// The EyeDropper API isn't in TypeScript's DOM types yet
type EyeDropperConstructor = new () => {
  open(): Promise<{ sRGBHex: string }>;
};

export const ColorFilterGroup = ({
  filter,
  headingLevel,
  onChange,
}: {
  filter: ColorFilter;
  headingLevel: HeadingLevel;
  onChange: (filter: ColorFilter) => void;
}) => {
  const id = useId();
  const update = (changes: Partial<ColorFilter>) =>
    onChange({ ...filter, ...changes });

  // What is being typed in the hex field. Null means "show the current color".
  const [draft, setDraft] = useState<string | null>(null);
  const [invalid, setInvalid] = useState(false);

  // Only known on the client, so check after mounting to keep hydration in step
  const [canPickFromScreen, setCanPickFromScreen] = useState(false);
  useEffect(() => setCanPickFromScreen('EyeDropper' in window), []);

  const commitDraft = () => {
    if (draft === null) return;
    const parsed = parseHex(draft, true);
    if (parsed) {
      update({ hex: parsed, enabled: true });
      setDraft(null);
    } else if (draft.trim() === '') {
      setDraft(null);
    } else {
      setInvalid(true);
    }
  };

  const pickFromScreen = async () => {
    const { EyeDropper } = window as unknown as {
      EyeDropper: EyeDropperConstructor;
    };
    try {
      const { sRGBHex } = await new EyeDropper().open();
      setDraft(null);
      setInvalid(false);
      update({ hex: sRGBHex.toLowerCase(), enabled: true });
    } catch {
      // Cancelled with Esc
    }
  };

  return (
    <CollapsibleFilter
      title="Hex Color"
      summary={
        filter.enabled
          ? `${filter.hex.toUpperCase()} ±${filter.threshold}`
          : null
      }
      headingLevel={headingLevel}
    >
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
        <label className="flex items-center gap-2 text-xs font-bold">
          <input
            type="checkbox"
            checked={filter.enabled}
            onChange={() => update({ enabled: !filter.enabled })}
          />
          Match a color
        </label>
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor={`${id}-color`}>Color</label>
          {/* Picking a color turns the filter on */}
          <input
            id={`${id}-color`}
            type="color"
            value={filter.hex}
            onChange={(e) => {
              setDraft(null);
              setInvalid(false);
              update({ hex: e.target.value, enabled: true });
            }}
          />
          <label htmlFor={`${id}-hex`} className="sr-only">
            Hex code
          </label>
          <input
            id={`${id}-hex`}
            type="text"
            value={draft ?? filter.hex.toUpperCase()}
            maxLength={7}
            size={8}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            aria-invalid={invalid || undefined}
            aria-describedby={invalid ? `${id}-hex-error` : undefined}
            className="px-2 py-1 font-mono text-xs border border-gray-400 rounded"
            onChange={(e) => {
              setDraft(e.target.value);
              setInvalid(false);
              // Only a full 6 digit value counts while typing; "#b22" is on its
              // way to "#b22222", not "#bb2222"
              const parsed = parseHex(e.target.value);
              if (parsed) update({ hex: parsed, enabled: true });
            }}
            onBlur={commitDraft}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                commitDraft();
              }
            }}
          />
          {canPickFromScreen && (
            <button
              type="button"
              onClick={pickFromScreen}
              className="px-2 py-1.5 text-xs! border border-gray-400 rounded cursor-pointer hover:bg-gray-50"
            >
              Pick from screen
            </button>
          )}
          {invalid && (
            <p
              id={`${id}-hex-error`}
              className="w-full m-0! text-xs text-red-700"
            >
              Enter 6 digits, like #B22222.
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor={`${id}-threshold`}>Closeness</label>
          <input
            id={`${id}-threshold`}
            type="range"
            min={1}
            max={50}
            value={filter.threshold}
            aria-describedby={`${id}-threshold-hint`}
            onChange={(e) =>
              update({ threshold: Number(e.target.value), enabled: true })
            }
          />
          <output htmlFor={`${id}-threshold`} className="w-6 tabular-nums">
            {filter.threshold}
          </output>
        </div>
        <p
          id={`${id}-threshold-hint`}
          className="w-full m-0! text-xs text-gray-600"
        >
          Lower is a closer match. Around 2 is barely noticeable, 10 looks
          similar and 25+ looks clearly different.
        </p>
      </div>
    </CollapsibleFilter>
  );
};
