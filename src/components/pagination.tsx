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
  maxPages = 10,
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

  const numberStyle = css`
    margin: 0;
  `;

  const linkStyle = (i: number) => {
    return css`
      background: ${i + 1 === currentPage ? theme.colors.hyperlinkActive : ''};
      color: ${i + 1 === currentPage ? '#ffffff' : theme.colors.hyperlink};
      padding: 0.5rem;
      text-decoration: none;
      &:visited {
        color: ${i + 1 === currentPage ? '#ffffff' : theme.colors.hyperlink};
      }
      &:hover {
        color: ${i + 1 === currentPage
          ? '#ffffff'
          : theme.colors.hyperlinkActive};
      }
    `;
  };

  const pageLength = numPages > maxPages ? maxPages : numPages;
  const offset =
    currentPage > Math.ceil(pageLength / 2)
      ? currentPage + 1 - Math.ceil(pageLength / 2)
      : 1;

  return (
    <ul data-testid="pagination" css={containerStyle}>
      {!isFirst && (
        <PageLink to={prevPage} type={'cover'} direction={'right'}>
          ← Previous Page
        </PageLink>
      )}
      {Array.from({ length: pageLength }, (_, i) => (
        <div key={`pagination-number${i + offset}`}>
          {i + offset <= numPages && (
            <li css={numberStyle}>
              <PageLink
                to={`${baseUrl}${i === 0 ? '' : i + offset}`}
                type={'cover'}
                direction={'up'}
                linkStyle={linkStyle(i + offset - 1)}
              >
                {i + offset}
              </PageLink>
            </li>
          )}
        </div>
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
