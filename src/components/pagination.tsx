import React from 'react';
import { css } from '@emotion/core';
import PageLink from './page-link';
import { Theme } from '../styles/theme';
import { useTheme } from 'emotion-theming';

interface PaginationProps {
  isFirst: boolean;
  isLast: boolean;
  prevPage: string;
  nextPage: string;
  numPages: number;
  currentPage: number;
  maxPages?: number;
  baseUrl: string;
}

const Pagination = ({
  isFirst,
  isLast,
  prevPage,
  nextPage,
  numPages,
  currentPage,
  maxPages = 8,
  baseUrl,
}: PaginationProps) => {
  const theme: Theme = useTheme();

  const containerStyle = css`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style: none;
    padding: 0;
    margin: 2rem 0;
  `;

  const linkStyle = (i: number) => {
    return css`
      background: ${i === currentPage ? theme.colors.hyperlinkActive : ''};
      color: ${i === currentPage ? '#ffffff' : theme.colors.hyperlink};
      padding: 0.5rem;
      text-decoration: none;
      &:visited {
        color: ${i === currentPage ? '#ffffff' : theme.colors.hyperlink};
      }
      &:hover {
        color: ${i === currentPage ? '#ffffff' : theme.colors.hyperlinkActive};
      }
    `;
  };

  let startPage: number;
  let endPage: number;
  if (numPages <= maxPages) {
    // Show all pages
    startPage = 1;
    endPage = numPages;
  } else {
    if (currentPage <= Math.floor(maxPages / 2)) {
      // Left end [ 1 [2] 3 4 ] || [ 1 [2] 3 ]
      startPage = 1;
      endPage = maxPages;
    } else if (numPages - currentPage < Math.floor(maxPages / 2) + 1) {
      // Right end [ 7 [8] 9 10 ] || [ 8 [9] 10 ]
      startPage = numPages - maxPages + 1;
      endPage = numPages;
    } else {
      // Middle [ 4 5 [6] 7 8 ] || [ 4 [5] 6 7 ]
      const even = maxPages % 2 === 0;
      startPage = even
        ? currentPage - Math.floor(maxPages / 2) + 1
        : currentPage - Math.floor(maxPages / 2);
      endPage = even
        ? currentPage + Math.ceil(maxPages / 2)
        : currentPage + Math.ceil(maxPages / 2) - 1;
    }
  }

  // Return an array of pages to repeat
  const pages = [...Array(endPage + 1 - startPage).keys()].map(
    (i) => startPage + i
  );

  return (
    <ul css={containerStyle} data-testid="pagination">
      <li>
        <PageLink
          to={`${baseUrl}`}
          type={'cover'}
          direction={'right'}
          disabled={currentPage === 1}
        >
          &lt;&lt;
        </PageLink>
      </li>
      {/*<li>*/}
      {/*  <PageLink*/}
      {/*    to={`${baseUrl}${currentPage - 1 === 1 ? '' : currentPage - 1}`}*/}
      {/*    type={'cover'}*/}
      {/*    direction={'right'}*/}
      {/*    disabled={currentPage === 1}*/}
      {/*  >*/}
      {/*    &lt;*/}
      {/*  </PageLink>*/}
      {/*</li>*/}
      {pages.map((page: number, index: number) => (
        <li key={index}>
          <PageLink
            to={`${baseUrl}${page === 1 ? '' : page}`}
            type={'cover'}
            direction={page > currentPage ? 'left' : 'right'}
            linkStyle={linkStyle(page)}
          >
            {page}
          </PageLink>
        </li>
      ))}
      {/*<li>*/}
      {/*  <PageLink*/}
      {/*    to={`${baseUrl}${currentPage + 1}`}*/}
      {/*    type={'cover'}*/}
      {/*    direction={'right'}*/}
      {/*    disabled={currentPage === numPages}*/}
      {/*  >*/}
      {/*    &gt;*/}
      {/*  </PageLink>*/}
      {/*</li>*/}
      <li>
        <PageLink
          to={`${baseUrl}${numPages}`}
          type={'cover'}
          direction={'right'}
          disabled={currentPage === numPages}
        >
          &gt;&gt;
        </PageLink>
      </li>
    </ul>
  );
};

export default Pagination;
