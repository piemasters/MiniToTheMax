import React from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import PageLink from './page-link';
import Img, { FluidObject } from 'gatsby-image';
import { Theme } from '../types/app.types';

interface PostSummaryProps {
  slug: string;
  title: string;
  date: string;
  img: FluidObject;
  excerpt: string;
  timeToRead: number;
}

const PostSummary = (post: PostSummaryProps) => {
  const theme: Theme = useTheme();

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
    <div css={postStyle} data-testid="post-summary">
      <PageLink
        linkStyle={postLinkStyle}
        to={post.slug}
        type={'cover'}
        direction={'up'}
      >
        <h2 css={postHeaderStyle}>{post.title}</h2>
        <p css={postParagraphStyle}>
          {post.date} - {post.timeToRead} min read
        </p>
        <Img fluid={post.img} />
        <br />
        <p css={postParagraphStyle}>{post.excerpt}</p>
      </PageLink>
    </div>
  );
};

export default PostSummary;
