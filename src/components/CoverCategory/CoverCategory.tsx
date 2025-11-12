import { FC } from 'react';
import type { IGatsbyImageData } from 'gatsby-plugin-image';
import { PageLink } from '../PageLink/PageLink';
import { CoverImage } from '../CoverImage/CoverImage';
import { removeCategoryName } from './removeCategoryName';

/**
 * The CoverCategory component is a banner image for a category, largely used when selecting a category from a list
 */
export const CoverCategory: FC<{
  slug: string;
  title: string;
  img?: IGatsbyImageData;
}> = ({ slug, title, img }) => {
  return (
    <div
      className="my-4 duration-300 hover:shadow-3xl"
      data-testid="cover-category"
    >
      <PageLink to={slug} type={'cover'} direction={'up'}>
        {img && <CoverImage image={img} title={removeCategoryName(title)} />}
      </PageLink>
    </div>
  );
};

export default CoverCategory;
