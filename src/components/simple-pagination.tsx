import React from 'react';
import { css } from '@emotion/core';
import PageLink from './page-link';

interface SimplePaginationProps {
  previous: any;
  next: any;
}

const SimplePagination = ({ previous, next }: SimplePaginationProps) => {
  const containerStyle = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style: none;
    padding: 0;
  `;

  return (
    <ul css={containerStyle}>
      <li>
        {previous && (
          <PageLink
            to={previous.fields.slug}
            type={'cover'}
            direction={'right'}
          >
            ← {previous.frontmatter.title}
          </PageLink>
        )}
      </li>
      <li>
        {next && (
          <PageLink to={next.fields.slug} type={'cover'} direction={'left'}>
            {next.frontmatter.title} →
          </PageLink>
        )}
      </li>
    </ul>
  );
};

export default SimplePagination;
