import React from 'react';
import PageLink from './page-link';
import { FluidObject } from 'gatsby-image';
import CoverImage from './cover-image';
import { Theme } from '../styles/theme';
import { css, useTheme } from '@emotion/react';

interface CoverCategoryProps {
  slug: string;
  title: string;
  img: FluidObject;
}

const CoverCategory = (category: CoverCategoryProps) => {
  const theme = useTheme() as Theme;
  const postStyle = css`
    margin: 1rem 0;
    transition: 0.3s;
    &:hover {
      box-shadow: 6px 6px 60px 5px ${theme.colors.backgroundTransparent};
    }
  `;

  const removeCategoryName = (title: string) => {
    if (title.slice(0, 15) === 'Battle Report: ') {
      return title.slice(15);
    } else if (title.slice(0, 8) === 'Review: ') {
      return title.slice(8);
    } else if (title.slice(0, 10) === 'Showcase: ') {
      return title.slice(10);
    } else if (title.slice(0, 10) === 'Tutorial: ') {
      return title.slice(10);
    } else if (title.slice(0, 19) === 'Review & Tutorial: ') {
      return title.slice(19);
    } else {
      return title;
    }
  };

  return (
    <div css={postStyle} data-testid="cover-category">
      <PageLink to={category.slug} type={'cover'} direction={'up'}>
        <CoverImage
          image={category.img}
          title={removeCategoryName(category.title)}
        />
      </PageLink>
    </div>
  );
};

export default CoverCategory;
