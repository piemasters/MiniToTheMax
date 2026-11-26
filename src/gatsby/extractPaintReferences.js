// Plain JS, not TypeScript, because gatsby-node.js (CommonJS) loads it.

// <Paint name={'Abaddon Black'} /> or <Paint name="X" category="Citadel Air" />
const PAINT_TAG =
  /<Paint\s+name=\{?(['"])((?:\\.|(?!\1).)*)\1\}?(?:\s+category=\{?(['"])((?:\\.|(?!\3).)*)\3\}?)?/g;

const unescape = (text) => text.replace(/\\(.)/g, '$1');

/** Separates name from category in a reference. Neither contains it. */
const SEPARATOR = '::';

/**
 * The paints a post's source uses, as `name` or `name::category`, each once, in
 * order of first use.
 */
const extractPaintReferences = (source) => {
  const found = new Set();
  for (const [, , name, , category] of source.matchAll(PAINT_TAG)) {
    found.add(
      category
        ? `${unescape(name)}${SEPARATOR}${unescape(category)}`
        : unescape(name)
    );
  }
  return [...found];
};

module.exports = { extractPaintReferences, SEPARATOR };
