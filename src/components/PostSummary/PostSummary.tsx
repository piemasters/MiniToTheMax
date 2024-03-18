import React, { FC } from 'react';
import type { IGatsbyImageData } from 'gatsby-plugin-image';

import { CoverImage } from '../CoverImage';
import { PageLink } from '../PageLink';

export interface PostSummaryProps {
  slug: string;
  title: string;
  date: string;
  img?: IGatsbyImageData;
  excerpt: string;
  tall?: boolean;
}

export const PostSummary: FC<PostSummaryProps> = ({
  slug,
  title,
  date,
  img,
  excerpt,
  tall,
}) => {
  return (
    <div className="my-4" data-testid="post-summary">
      <PageLink
        className="block no-underline bg-gray-200 duration-300 hover:shadow-3xl"
        to={slug}
        type={'cover'}
        direction={'up'}
      >
        {img && <CoverImage image={img} title={title} tall={tall} />}
        <div className="p-4 text-gray-600">
          <p className="text-xs font-bold mb-2">{date}</p>
          <hr />
          <p className="italic m-0 text-xs/loose text-gray-600">{excerpt}</p>
        </div>
      </PageLink>
    </div>
  );
};

export default PostSummary;
