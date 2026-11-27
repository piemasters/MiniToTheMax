import { getCollection, type CollectionEntry } from 'astro:content';
import kebabCase from 'lodash.kebabcase';

export type Post = CollectionEntry<'posts'>;

const newestFirst = (posts: Post[]) =>
  posts.sort(
    (a, b) => b.data.date.localeCompare(a.data.date) || a.id.localeCompare(b.id)
  );

/** `yarn dev-unpublished` shows the drafts and nothing else. */
const draftsOnly =
  !import.meta.env.PROD && Boolean(process.env.UNPUBLISHED_ONLY);

/** Whether listing pages show a post: normally, once it is published. */
const isListed = ({ data }: Post) => data.published !== draftsOnly;

/** Every post, drafts included, unless only the drafts are wanted. */
export const getAllPosts = async () =>
  newestFirst(
    await getCollection('posts', (post) => !draftsOnly || isListed(post))
  );

/** What listing pages show. */
export const getListedPosts = async () =>
  (await getAllPosts()).filter(isListed);

/** The posts that get a page. Drafts have one only while developing. */
export const getPosts = async () =>
  import.meta.env.PROD ? getListedPosts() : getAllPosts();

/** The values of a list field with how many listed posts have each. */
export const groupBy = async (field: 'tags' | 'categories') => {
  const counts = new Map<string, number>();
  for (const post of await getAllPosts()) {
    for (const value of new Set(post.data[field])) {
      counts.set(value, (counts.get(value) ?? 0) + (isListed(post) ? 1 : 0));
    }
  }
  return [...counts]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => a.value.localeCompare(b.value));
};

/**
 * One page for each tag or category address with posts to list. Spellings that
 * share an address, such as "Orks" and "orks", are listed together.
 */
export const getGroupPages = async (field: 'tags' | 'categories') => {
  const listed = await getListedPosts();
  const names = new Map<string, string[]>();
  for (const { value } of await groupBy(field)) {
    const slug = kebabCase(value);
    names.set(slug, [...(names.get(slug) ?? []), value]);
  }
  const pages = [...names].map(([slug, values]) => ({
    slug,
    name: values[0]!,
    posts: listed.filter(({ data }) =>
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
