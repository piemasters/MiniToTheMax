import React from 'react';
import { css } from '@emotion/core';
import PageLink from './page-link';

interface SimplePaginationNode {
  slug: string;
  title: string;
}

interface SimplePaginationProps {
  previous?: SimplePaginationNode;
  next?: SimplePaginationNode;
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
    <ul data-testid="simple-pagination" css={containerStyle}>
      <li>
        {previous && (
          <PageLink to={previous.slug} type={'cover'} direction={'right'}>
            ← {previous.title}
          </PageLink>
        )}
      </li>
      <li>
        {next && (
          <PageLink to={next.slug} type={'cover'} direction={'left'}>
            {next.title} →
          </PageLink>
        )}
      </li>
    </ul>
  );
};

export default SimplePagination;
