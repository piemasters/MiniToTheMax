import React from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import PageLink from './page-link';
import Img, { FluidObject } from 'gatsby-image';
import { Theme } from '../styles/theme';
import CoverImage from './cover-image';

interface ShowcaseCategoryProps {
  slug: string;
  title: string;
  img: FluidObject;
}

const ShowcaseCategory = (category: ShowcaseCategoryProps) => {
  const theme: Theme = useTheme();

  const postStyle = css`
    margin: 1rem 0;
  `;

  const postLinkStyle = css`
    background-color: #f4f4f4;
    color: #000000;
    display: block;
    text-decoration: none;
    &:hover {
      background-color: #e4e4e4;
    }
  `;

  return (
    <div css={postStyle} data-testid="showcase-category">
      <PageLink
        linkStyle={postLinkStyle}
        to={category.slug}
        type={'cover'}
        direction={'up'}
      >
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
