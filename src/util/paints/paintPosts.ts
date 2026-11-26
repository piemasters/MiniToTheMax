import type { PaintCategory } from '../../types';
import { getPaint } from './getPaint';
import { paintId } from './paintId';

const SEPARATOR = '::';

export interface PostLink {
  title: string;
  slug: string;
}

/** The part of a post the paints page queries for. */
export interface PaintPostNode {
  fields: { slug: string };
  paintReferences?: readonly string[] | null;
  frontmatter: { title: string; published?: boolean | null };
}

/**
 * paintId -> the posts that show that paint, in the order the nodes arrive.
 * References are resolved the way the <Paint> component resolves them, so a
 * post is listed under exactly the paint it displays. Unpublished posts are
 * left out when `onlyPublished` is set (as on the live site).
 */
export const buildPaintPosts = (
  nodes: readonly PaintPostNode[],
  onlyPublished: boolean
): Record<string, PostLink[]> => {
  const byPaint: Record<string, PostLink[]> = {};

  for (const { fields, frontmatter, paintReferences } of nodes) {
    if (onlyPublished && frontmatter.published !== true) continue;
    const link = { title: frontmatter.title, slug: fields.slug };

    const seen = new Set<string>();
    for (const reference of paintReferences ?? []) {
      const [name, category] = reference.split(SEPARATOR);
      const { paint } = getPaint(name, category as PaintCategory | undefined);
      if (!paint) continue;

      const id = paintId(paint);
      if (seen.has(id)) continue;
      seen.add(id);
      (byPaint[id] ??= []).push(link);
    }
  }

  return byPaint;
};
