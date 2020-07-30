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
    position: relative;
  `;

  const postHeaderStyle = css`
    background-color: rgba(0, 0, 0, 0.7);
    bottom: 0px;
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
    position: absolute;
    right: 1rem;
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
        <Img fluid={category.img} />
        <h2 css={postHeaderStyle}>
          {category.title.slice(0, 10) === 'Showcase: '
            ? category.title.slice(10)
            : category.title}
        </h2>
      </PageLink>
    </div>
  );
};

export default ShowcaseCategory;
