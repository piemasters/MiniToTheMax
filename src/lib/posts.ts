import { getCollection, type CollectionEntry } from 'astro:content';
import kebabCase from 'lodash.kebabcase';

export type Post = CollectionEntry<'posts'>;

const newestFirst = (posts: Post[]) =>
  posts.sort(
    (a, b) => b.data.date.localeCompare(a.data.date) || a.id.localeCompare(b.id)
  );

/** Every post, drafts included. */
export const getAllPosts = async () =>
  newestFirst(await getCollection('posts'));

/** What listing pages show. */
export const getPublishedPosts = async () =>
  (await getAllPosts()).filter(({ data }) => data.published);

/** The posts that get a page. Drafts have one only while developing. */
export const getPosts = async () =>
  import.meta.env.PROD ? getPublishedPosts() : getAllPosts();

/** The values of a list field with how many published posts have each. */
export const groupBy = async (field: 'tags' | 'categories') => {
  const counts = new Map<string, number>();
  for (const { data } of await getAllPosts()) {
    for (const value of new Set(data[field])) {
      counts.set(value, (counts.get(value) ?? 0) + (data.published ? 1 : 0));
    }
  }
  return [...counts]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => a.value.localeCompare(b.value));
};

/**
 * One page for each tag or category address with published posts. Spellings that share an address,
 * such as "Orks" and "orks", are listed together.
 */
export const getGroupPages = async (field: 'tags' | 'categories') => {
  const published = await getPublishedPosts();
  const names = new Map<string, string[]>();
  for (const { value } of await groupBy(field)) {
    const slug = kebabCase(value);
    names.set(slug, [...(names.get(slug) ?? []), value]);
  }
  const pages = [...names].map(([slug, values]) => ({
    slug,
    name: values[0]!,
    posts: published.filter(({ data }) =>
      data[field].some((value) => values.includes(value))
    ),
  }));
  return pages.filter((page) => page.posts.length > 0);
};

/** A post's address. Disqus comments are keyed on it, so it must not change. */
export const slugOf = (post: Post) => `/${post.id}/`;

/** Plain text from the start of a post, for summaries and meta descriptions. */
export const excerptOf = (post: Post, length = 140) => {
  const text = (post.body ?? '')
    .replace(/^(import|export) .*$/gm, '')
    .replace(/<[^>]*>/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^\s*(#{1,6}|>|[-*+])\s+/gm, '')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= length) return text;
  return `${text.slice(0, text.lastIndexOf(' ', length))}…`;
};
