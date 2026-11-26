import { Link } from 'gatsby';
import { useId, useState } from 'react';
import type { PostLink } from '../../util/paints/paintPosts';
import { clsx } from '../util';

const COLLAPSED_POSTS = 4;

/** Posts that show the paint. Long lists start short, and scroll once opened. */
export const SeenIn = ({
  posts,
  headingId,
}: {
  posts: PostLink[];
  headingId: string;
}) => {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const hidden = posts.length - COLLAPSED_POSTS;
  const shown = expanded ? posts : posts.slice(0, COLLAPSED_POSTS);

  return (
    <section className="px-5 py-4" aria-labelledby={headingId}>
      <h2 id={headingId} className="m-0! mb-2! text-base!">
        Seen in{' '}
        <span className="text-sm font-normal text-gray-600">
          ({posts.length} {posts.length === 1 ? 'post' : 'posts'})
        </span>
      </h2>
      <ul
        id={listId}
        className={clsx(
          'p-0! m-0! text-sm list-none! border border-gray-200 rounded-md divide-y divide-gray-200',
          expanded ? 'max-h-60 overflow-y-auto' : ''
        )}
      >
        {shown.map((post) => (
          <li key={post.slug} className="m-0! list-none!">
            <Link
              to={post.slug}
              className="block px-3 py-2 no-underline! hover:bg-gray-50 hover:underline!"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      {hidden > 0 && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={listId}
          onClick={() => setExpanded((open) => !open)}
          className="mt-2 text-sm! font-bold! text-blue-800 underline cursor-pointer"
        >
          {expanded ? 'Show fewer' : `Show ${hidden} more`}
        </button>
      )}
    </section>
  );
};
