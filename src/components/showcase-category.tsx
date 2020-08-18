import React from 'react';
import { css } from '@emotion/core';
import PageLink from './page-link';
import { FluidObject } from 'gatsby-image';
import CoverImage from './cover-image';
import { Theme } from '../styles/theme';
import { useTheme } from 'emotion-theming';

interface ShowcaseCategoryProps {
  slug: string;
  title: string;
  img: FluidObject;
}

const ShowcaseCategory = (category: ShowcaseCategoryProps) => {
  const theme: Theme = useTheme();
  const postStyle = css`
    margin: 1rem 0;
    &:hover {
      box-shadow: 6px 6px 60px 5px ${theme.colors.backgroundTransparent};
    }
  `;

  return (
    <div css={postStyle} data-testid="showcase-category">
      <PageLink to={category.slug} type={'cover'} direction={'up'}>
        <CoverImage
          image={category.img}
          title={
            category.title.slice(0, 10) === 'Showcase: '
              ? category.title.slice(10)
              : category.title
          }
        />
      </PageLink>
    </div>
  );
};

export default ShowcaseCategory;
