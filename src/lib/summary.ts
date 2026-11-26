import { coverImage } from './images';
import { excerptOf, slugOf, type Post } from './posts';

/** What the PostSummary component shows of a post. */
export const summaryOf = async (post: Post) => ({
  slug: slugOf(post),
  title: post.data.title,
  date: post.data.date,
  img: await coverImage(post.data.featuredImage),
  excerpt: excerptOf(post, 300),
});
