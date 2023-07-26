import type { FC } from 'react';
import { css, useTheme } from '@emotion/react';
import type { IGatsbyImageData } from 'gatsby-plugin-image';

import { PageLink } from '../PageLink';
import { CoverImage } from '../CoverImage';
import { Theme } from '../../styles/theme';
import { removeCategoryName } from '../../util';

export interface CoverCategoryProps {
  slug: string;
  title: string;
  img?: IGatsbyImageData;
}
/**
 * The CoverCategory component is a banner image for a category, largely used when selecting a category from a list
 */
export const CoverCategory: FC<CoverCategoryProps> = ({ slug, title, img }) => {
  const theme = useTheme() as Theme;
  const postStyle = css`
    margin: 1rem 0;
    transition: 0.3s;
    &:hover {
      box-shadow: 6px 6px 60px 5px ${theme.colors.backgroundTransparent};
    }
  `;

  return (
    <div css={postStyle} data-testid="cover-category">
      <PageLink to={slug} type={'cover'} direction={'up'}>
        {img && <CoverImage image={img} title={removeCategoryName(title)} />}
      </PageLink>
    </div>
  );
};

export default CoverCategory;
