import type { PaintDetails } from '../../types';

// Lowercase, without accents or apostrophes, so "emperor's" finds "Emperors"
const normalize = (text: string) =>
  text.normalize('NFD').replace(/[̀-ͯ'’]/g, '').toLowerCase();

const haystacks = new WeakMap<PaintDetails, string>();

const haystack = (paint: PaintDetails) => {
  let text = haystacks.get(paint);
  if (text === undefined) {
    text = normalize(
      [
        paint.name,
        paint.number,
        paint.company,
        paint.category,
        paint.hex,
        ...paint.type,
      ]
        .filter(Boolean)
        .join(' ')
    );
    haystacks.set(paint, text);
  }
  return text;
};

/**
 * Paints matching every word typed, in the name, number, company, category,
 * type or hex. Order is kept. An empty search keeps everything.
 */
export const searchPaints = (
  paints: PaintDetails[],
  search: string
): PaintDetails[] => {
  const words = normalize(search).split(/\s+/).filter(Boolean);
  if (words.length === 0) return paints;
  return paints.filter((paint) => {
    const text = haystack(paint);
    return words.every((word) => text.includes(word));
  });
};
