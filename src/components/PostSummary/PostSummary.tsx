import { FC } from 'react';
import type { IGatsbyImageData } from 'gatsby-plugin-image';

import { CoverImage } from '../CoverImage/CoverImage';
import { PageLink } from '../PageLink/PageLink';

export const PostSummary: FC<{
  slug: string;
  title: string;
  date: string;
  img?: IGatsbyImageData;
  excerpt: string;
  tall?: boolean;
}> = ({ slug, title, date, img, excerpt, tall }) => {
  return (
    <div
      className="my-4 duration-300 bg-gray-100 hover:bg-gray-200 hover:shadow-3xl"
      data-testid="post-summary"
    >
      <PageLink
        className="block no-underline"
        to={slug}
        type={'cover'}
        direction={'up'}
      >
        {img && <CoverImage image={img} title={title} tall={tall} />}
        <div className="p-4 text-gray-600">
          <p className="mb-2! text-xs font-bold">{date}</p>
          <hr />
          <p className="m-0 italic text-gray-600 text-xs/loose">{excerpt}</p>
        </div>
      </PageLink>
    </div>
  );
};

export default PostSummary;
