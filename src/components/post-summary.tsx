import React from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import PageLink from './page-link';
import Img, { FluidObject } from 'gatsby-image';
import { Theme } from '../styles/theme';
import CoverImage from './cover-image';

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

  const postParagraphStyle = css`
    color: ${theme.colors.textSecondary};
    font-size: 0.8rem;
    font-style: italic;
    margin: 0;
  `;

  const postLinkStyle = css`
    background-color: ${theme.colors.lightgrey};
    display: block;
    text-decoration: none;
    transition: 0.3s;
    &:hover {
      background-color: ${theme.colors.lightgreyHover};
      box-shadow: 6px 6px 60px 5px ${theme.colors.backgroundTransparent};
    }
  `;

  const postContents = css`
    padding: 1rem;
  `;

  return (
    <div css={postStyle} data-testid="post-summary">
      <PageLink
        linkStyle={postLinkStyle}
        to={post.slug}
        type={'cover'}
        direction={'up'}
      >
        <CoverImage image={post.img} title={post.title} tall={true} />
        <div css={postContents}>
          {' '}
          <p css={postParagraphStyle}>
            <strong>
              {post.date} - {post.timeToRead} min read
            </strong>
          </p>
          <hr />
          <p css={postParagraphStyle}>{post.excerpt}</p>
        </div>
      </PageLink>
    </div>
  );
};

export default PostSummary;
