import { FC } from 'react';
import { PageLink } from '../PageLink/PageLink';

type SimplePaginationNode = {
  slug: string;
  title: string;
};

export const SimplePagination: FC<{
  previous?: SimplePaginationNode;
  next?: SimplePaginationNode;
}> = ({ previous, next }) => {
  return (
    <div
      data-testid="simple-pagination"
      className="grid grid-cols-1 gap-4 py-4 no-underline list-none md:grid-cols-2 auto-rows-fr"
    >
      {next && (
        <PageLink
          to={next.slug}
          type={'cover'}
          direction={'left'}
          className="h-full text-blue-500 visited:text-blue-500 hover:text-blue-700"
        >
          <div className="flex items-center justify-start h-full max-w-full px-4 py-8 bg-neutral-50 hover:bg-neutral-100">
            <div className="pr-4">←</div>
            <div className="">{next.title}</div>
          </div>
        </PageLink>
      )}
      {previous && (
        <PageLink
          to={previous.slug}
          type={'cover'}
          direction={'right'}
          className="h-full text-blue-500 visited:text-blue-500 hover:text-blue-700"
        >
          <div className="flex items-center justify-end h-full max-w-full px-4 py-8 bg-neutral-50 hover:bg-neutral-100">
            <div className="">{previous.title}</div>
            <div className="pl-4">→</div>
          </div>
        </PageLink>
      )}
    </div>
  );
};

export default SimplePagination;
