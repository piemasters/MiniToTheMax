import React from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import PageLink from './page-link';
import Img, { FluidObject } from 'gatsby-image';
import { Theme } from '../styles/theme';

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

  const postHeaderStyle = css`
    margin-bottom: 0;
  `;

  const postLinkStyle = css`
    background-color: #f4f4f4;
    color: #000000;
    display: block;
    padding: 1rem;
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
        <h2 css={postHeaderStyle}>{category.title}</h2>
        <Img fluid={category.img} />
        <br />
      </PageLink>
    </div>
  );
};

export default ShowcaseCategory;
