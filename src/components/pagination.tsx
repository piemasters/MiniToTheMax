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
    // Calculate start and end pages
    if (currentPage <= maxPages / 2 + 1) {
      startPage = 1;
      endPage = maxPages;
    } else if (currentPage + (maxPages / 2 - 1) >= numPages) {
      startPage = numPages - maxPages - 1;
      endPage = numPages;
    } else {
      startPage = Math.ceil(currentPage - maxPages / 2);
      endPage = Math.ceil(currentPage + (maxPages / 2 - 1));
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
