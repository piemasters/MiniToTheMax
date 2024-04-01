import React, { FC } from 'react';

import { PageLink } from '../PageLink';
import { getPages } from '../../util';

export interface PaginationProps {
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
  // Return an array of pages to repeat
  const pages = getPages({ numPages, maxPages, currentPage });

  return (
    <ul
      className="flex flex-wrap justify-between items-center p-0 my-8 list-none"
      data-testid="pagination"
    >
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
            className={`p-2 no-underline text-blue-500 hover:bg-blue-500 hover:text-white ${page === currentPage ? 'bg-blue-500 text-white' : ''}`}
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
