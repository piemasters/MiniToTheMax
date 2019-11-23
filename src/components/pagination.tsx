import { Link } from 'gatsby';
import React from 'react';
import { css } from '@emotion/core';
import Header from './header';

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
    <ul css={containerStyle}>
      {!isFirst && (
        <Link to={prevPage} rel="prev">
          ← Previous Page
        </Link>
      )}
      {Array.from({ length: numPages }, (_, i) => (
        <li key={`pagination-number${i + 1}`} css={numberStyle}>
          <Link to={`${baseUrl}${i === 0 ? '' : i + 1}`} css={linkStyle(i)}>
            {i + 1}
          </Link>
        </li>
      ))}
      {!isLast && (
        <Link to={nextPage} rel="next">
          Next Page →
        </Link>
      )}
    </ul>
  );
};

export default Pagination;
