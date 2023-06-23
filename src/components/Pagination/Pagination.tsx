import type { FC } from 'react';
import { css, useTheme } from '@emotion/react';

import { PageLink } from '../PageLink';
import { Theme } from '../../styles/theme';
import { getPages } from '../../util';

export interface PaginationProps {
  isFirst: boolean;
  isLast: boolean;
  prevPage: string;
  nextPage: string;
  numPages: number;
  currentPage: number;
  maxPages?: number;
  baseUrl: string;
}

export const Pagination: FC<PaginationProps> = ({
  numPages,
  currentPage,
  maxPages = 8,
  baseUrl,
}) => {
  const theme = useTheme() as Theme;

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

  // Return an array of pages to repeat
  const pages = getPages({ numPages, maxPages, currentPage });

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
