import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import type { PaintPostNode } from '../../../src/util/paints/paintPosts';
import { getPublishedPosts, slugOf } from './posts';

// CommonJS, because gatsby-node.js loads it too, so it can't be imported. The
// path is relative to the astro folder, where the commands are run.
const { extractPaintReferences } = createRequire(resolve('package.json'))(
  '../src/gatsby/extractPaintReferences.js'
) as { extractPaintReferences: (source: string) => string[] };

/** Which paints each published post shows, as the paints page needs it. */
export const getPaintPostNodes = async (): Promise<PaintPostNode[]> =>
  (await getPublishedPosts()).map((post) => ({
    fields: { slug: slugOf(post) },
    paintReferences: extractPaintReferences(post.body ?? ''),
    frontmatter: { title: post.data.title, published: post.data.published },
  }));
