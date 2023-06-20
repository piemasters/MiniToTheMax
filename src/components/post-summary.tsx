import React from 'react';
import { css, useTheme } from '@emotion/react';
import PageLink from './page-link';
import { Theme } from '../styles/theme';
import CoverImage from './cover-image';
import { IGatsbyImageData } from 'gatsby-plugin-image';

interface PostSummaryProps {
  slug: string;
  title: string;
  date: string;
  img?: IGatsbyImageData;
  excerpt: string;
  tall?: boolean;
}

const PostSummary = (post: PostSummaryProps): JSX.Element => {
  const theme = useTheme() as Theme;

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
        {post.img && (
          <CoverImage image={post.img} title={post.title} tall={post.tall} />
        )}
        <div css={postContents}>
          {' '}
          <p css={postParagraphStyle}>
            <strong>{post.date}</strong>
          </p>
          <hr />
          <p css={postParagraphStyle}>{post.excerpt}</p>
        </div>
      </PageLink>
    </div>
  );
};

export default PostSummary;
