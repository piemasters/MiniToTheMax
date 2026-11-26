import type { PaintDetails } from '../../types';

type Lab = [l: number, a: number, b: number];

export interface ColorFilter {
  enabled: boolean;
  hex: string;
  /** Largest colour difference (CIE76 ΔE) still counted as a match. */
  threshold: number;
}

export const initialColorFilter: ColorFilter = {
  enabled: false,
  hex: '#b22222',
  threshold: 15,
};

const labCache = new Map<string, Lab>();

// sRGB hex -> CIELAB (D65 white point)
export const hexToLab = (hex: string): Lab => {
  const cached = labCache.get(hex);
  if (cached) return cached;

  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });

  const xyz = [
    (0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047,
    0.2126 * r + 0.7152 * g + 0.0722 * b,
    (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883,
  ].map((t) =>
    t > 216 / 24389 ? Math.cbrt(t) : ((24389 / 27) * t + 16) / 116
  );

  const lab: Lab = [
    116 * xyz[1] - 16,
    500 * (xyz[0] - xyz[1]),
    200 * (xyz[1] - xyz[2]),
  ];
  labCache.set(hex, lab);
  return lab;
};

/**
 * Perceptual difference between two hex colours (CIE76 ΔE). Around 2 is barely
 * noticeable, 10 looks similar, 25+ looks clearly different. 0–100 for
 * black vs white.
 */
export const colorDifference = (hexA: string, hexB: string) =>
  differenceFrom(hexA)(hexB);

/**
 * Like colorDifference, for comparing many colours against one: the fixed
 * colour is converted once instead of once per comparison.
 */
export const differenceFrom = (hex: string) => {
  const [l1, a1, b1] = hexToLab(hex.toUpperCase());
  return (other: string) => {
    const [l2, a2, b2] = hexToLab(other.toUpperCase());
    return Math.hypot(l1 - l2, a1 - a2, b1 - b2);
  };
};

/** Keeps the paints within the threshold, in their existing order. */
export const filterByColor = (
  paints: PaintDetails[],
  { enabled, hex, threshold }: ColorFilter
): PaintDetails[] => {
  if (!enabled) return paints;
  const distance = differenceFrom(hex);
  return paints.filter((paint) => distance(paint.hex) <= threshold);
};

/**
 * Reads a hex colour typed by a person. Accepts a leading `#` or none, and 3
 * digit shorthand when `allowShort` is set (leave it off while someone is
 * still typing, or "#b22" would be taken as "#bb2222" before they finish).
 * Returns a lowercase `#rrggbb`, or null.
 */
export const parseHex = (text: string, allowShort = false): string | null => {
  const digits = text.trim().replace(/^#/, '');
  if (/^[0-9a-f]{6}$/i.test(digits)) return `#${digits.toLowerCase()}`;
  if (allowShort && /^[0-9a-f]{3}$/i.test(digits)) {
    return `#${[...digits.toLowerCase()].map((d) => d + d).join('')}`;
  }
  return null;
};

export interface Hsl {
  /** 0–360 */
  h: number;
  /** 0–1 */
  s: number;
  /** 0–1 */
  l: number;
}

export const hexToHsl = (hex: string): Hsl => {
  const [r, g, b] = [1, 3, 5].map(
    (i) => parseInt(hex.slice(i, i + 2), 16) / 255
  );
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const delta = max - min;
  if (delta === 0) return { h: 0, s: 0, l };

  const s = delta / (1 - Math.abs(2 * l - 1));
  let h: number;
  if (max === r) h = ((g - b) / delta) % 6;
  else if (max === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;
  return { h: (h * 60 + 360) % 360, s, l };
};
