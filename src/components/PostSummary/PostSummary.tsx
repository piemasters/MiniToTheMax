import type { FC } from 'react';
import { css, useTheme } from '@emotion/react';
import type { IGatsbyImageData } from 'gatsby-plugin-image';

import { CoverImage } from '../CoverImage';
import { PageLink } from '../PageLink';
import { Theme } from '../../styles/theme';

export interface PostSummaryProps {
  slug: string;
  title: string;
  date: string;
  img?: IGatsbyImageData;
  excerpt: string;
  tall?: boolean;
}

export const PostSummary: FC<PostSummaryProps> = ({
  slug,
  title,
  date,
  img,
  excerpt,
  tall,
}) => {
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
        to={slug}
        type={'cover'}
        direction={'up'}
      >
        {img && <CoverImage image={img} title={title} tall={tall} />}
        <div css={postContents}>
          <p css={postParagraphStyle}>
            <strong>{date}</strong>
          </p>
          <hr />
          <p css={postParagraphStyle}>{excerpt}</p>
        </div>
      </PageLink>
    </div>
  );
};

export default PostSummary;
