import React from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import PageLink from './page-link';
import Img, { FluidObject } from 'gatsby-image';
import * as CSS from 'csstype';

interface PostSummaryProps {
  slug: string;
  title: string;
  date: string;
  img: FluidObject;
}

const PostSummary = (post: PostSummaryProps) => {
  const theme: CSS.Properties = useTheme();

  const postStyle = css`
    margin: 1rem 0;
  `;

  const postHeaderStyle = css`
    margin-bottom: 0;
  `;

  const postParagraphStyle = css`
    color: #777777;
    font-size: 0.8rem;
    font-style: italic;
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
    <li css={postStyle} key={post.slug} data-testid="post-summary">
      <PageLink
        linkStyle={postLinkStyle}
        to={post.slug}
        type={'cover'}
        direction={'up'}
      >
        <h2 css={postHeaderStyle}>{post.title}</h2>
        <p css={postParagraphStyle}>{post.date}</p>
        <Img fluid={post.img} />
      </PageLink>
    </li>
  );
};

export default PostSummary;
