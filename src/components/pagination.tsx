import React from 'react';
import { css } from '@emotion/core';
import PageLink from './page-link';

interface PaginationProps {
  isFirst: boolean;
  isLast: boolean;
  prevPage: string;
  nextPage: string;
  numPages: number;
  currentPage: number;
  baseUrl: string;
}

const Pagination = ({
  isFirst,
  isLast,
  prevPage,
  nextPage,
  numPages,
  currentPage,
  baseUrl,
}: PaginationProps) => {
  const containerStyle = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    padding: 0;
  `;

  const numberStyle = css`
    margin: 0;
  `;

  const linkStyle = (i: number) => {
    return css`
      text-decoration: none;
      color: ${i + 1 === currentPage ? '#ffffff' : ''};
      background: ${i + 1 === currentPage ? '#007acc' : ''};
    `;
  };

  return (
    <ul data-testid="pagination" css={containerStyle}>
      {!isFirst && (
        <PageLink to={prevPage} type={'cover'} direction={'right'}>
          ← Previous Page
        </PageLink>
      )}
      {Array.from({ length: numPages }, (_, i) => (
        <li key={`pagination-number${i + 1}`} css={numberStyle}>
          <PageLink
            to={`${baseUrl}${i === 0 ? '' : i + 1}`}
            type={'cover'}
            direction={'up'}
            linkStyle={linkStyle(i)}
          >
            {i + 1}
          </PageLink>
        </li>
      ))}
      {!isLast && (
        <PageLink to={nextPage} type={'cover'} direction={'left'}>
          Next Page →
        </PageLink>
      )}
    </ul>
  );
};

export default Pagination;
