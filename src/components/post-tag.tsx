import React from 'react';
import PageLink from './page-link';
import kebabCase from 'lodash.kebabcase';
import { Theme } from '../styles/theme';
import { useTheme } from 'emotion-theming';
import { css } from '@emotion/core';

const PostTag = ({ name, type }: { name: string; type: string }) => {
  const theme: Theme = useTheme();

  const tagStyles = css`
    display: inline-block;
  `;

  const tagLinkStyles = css`
    background-color: ${theme.colors.lightgrey};
    border-radius: 5px;
    color: ${theme.colors.textSecondary};
    cursor: pointer;
    display: inline-block;
    font-size: 0.7rem;
    margin: 0.2rem;
    padding: 0.1rem 0.6rem;
    text-decoration: none;
    transition: all 300ms ease-in-out;
    &:hover {
      color: ${theme.colors.textLight};
      background-color: ${theme.colors.primary};
    }
  `;

  return (
    <div data-testid="post-tag" css={tagStyles}>
      <PageLink
        key={name}
        to={`/${type}/${kebabCase(name)}/`}
        type={'cover'}
        direction={'up'}
        linkStyle={tagLinkStyles}
      >
        {name}
      </PageLink>
    </div>
  );
};

export default PostTag;
