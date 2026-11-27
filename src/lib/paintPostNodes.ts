import { extractPaintReferences } from '../util/paints/extractPaintReferences';
import type { PaintPostNode } from '../util/paints/paintPosts';
import { getListedPosts, slugOf } from './posts';

/** Which paints each published post shows, as the paints page needs it. */
export const getPaintPostNodes = async (): Promise<PaintPostNode[]> =>
  (await getListedPosts()).map((post) => ({
    fields: { slug: slugOf(post) },
    paintReferences: extractPaintReferences(post.body ?? ''),
    frontmatter: { title: post.data.title, published: post.data.published },
  }));
