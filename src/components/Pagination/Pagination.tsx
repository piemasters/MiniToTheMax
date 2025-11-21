import { FC } from 'react';
import PageLink from '../PageLink/PageLink';
import { getPages } from './getPages';

export const Pagination: FC<{
  numPages: number;
  currentPage: number;
  maxPages?: number;
  baseUrl: string;
}> = ({ numPages, currentPage, maxPages = 8, baseUrl }) => {
  // Return an array of pages to repeat
  const pages = getPages({ numPages, maxPages, currentPage });

  return (
    <ul
      className="flex flex-wrap items-center justify-between p-0 my-8"
      data-testid="pagination"
    >
      <li className="list-none!">
        <PageLink
          to={`${baseUrl}`}
          type={'cover'}
          direction={'right'}
          disabled={currentPage === 1}
          className="p-2 rounded no-underline text-blue-500 hover:bg-blue-500! hover:text-white"
        >
          &lt;&lt;
        </PageLink>
      </li>
      {/* <li>
        <PageLink
          to={`${baseUrl}${currentPage - 1 === 1 ? '' : currentPage - 1}`}
          type={'cover'}
          direction={'right'}
          disabled={currentPage === 1}
        >
          &lt;
        </PageLink>
      </li> */}
      {pages.map((page: number, index: number) => (
        <li key={index} className="list-none!">
          <PageLink
            to={`${baseUrl}${page === 1 ? '' : page}`}
            type={'cover'}
            direction={page > currentPage ? 'left' : 'right'}
            className={`py-2 px-3 rounded no-underline text-blue-500 hover:bg-blue-500! hover:text-white ${page === currentPage ? 'bg-blue-500! text-white' : ''}`}
          >
            {page}
          </PageLink>
        </li>
      ))}
      {/* <li>
        <PageLink
          to={`${baseUrl}${currentPage + 1}`}
          type={'cover'}
          direction={'right'}
          disabled={currentPage === numPages}
        >
          &gt;
        </PageLink>
      </li> */}
      <li className="list-none!">
        <PageLink
          to={`${baseUrl}${numPages}`}
          type={'cover'}
          direction={'right'}
          disabled={currentPage === numPages}
          className="p-2 rounded no-underline text-blue-500 hover:bg-blue-500! hover:text-white"
        >
          &gt;&gt;
        </PageLink>
      </li>
    </ul>
  );
};

export default Pagination;
