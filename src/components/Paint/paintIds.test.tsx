import { renderToStaticMarkup } from 'react-dom/server';
import { getAllSortedPaints } from '../../util/paints/getAllSortedPaints';
import { Paint } from './Paint';

// Two paints sharing an SVG id make the browser draw both with whichever
// definition comes first, so one of them shows the wrong gradient.
describe('SVG ids across every paint', () => {
  const paints = getAllSortedPaints();

  // Every paint twice, one copy as a button: a busy blog post, and the paints page
  const html = renderToStaticMarkup(
    <>
      {paints.map((paint) => (
        <Paint key={`plain-${paint.name}-${paint.category}`} paint={paint} />
      ))}
      {paints.map((paint) => (
        <Paint
          key={`button-${paint.name}-${paint.category}`}
          paint={paint}
          onSelect={() => undefined}
        />
      ))}
    </>
  );

  it('never uses the same id twice', () => {
    const seen = new Set<string>();
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    const duplicates = ids.filter((id) => seen.size === seen.add(id).size);

    expect(ids.length).toBeGreaterThan(0);
    expect(duplicates).toEqual([]);
  });

  it('only references ids that exist', () => {
    const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
    const references = [...html.matchAll(/url\(#([^)]+)\)/g)].map((m) => m[1]);

    expect(references.length).toBeGreaterThan(0);
    expect(references.filter((ref) => !ids.has(ref))).toEqual([]);
  });
});
