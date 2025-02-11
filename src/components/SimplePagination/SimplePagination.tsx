import React, { FC } from 'react';

import { PageLink } from '../PageLink';

type SimplePaginationNode = {
  slug: string;
  title: string;
};

export interface SimplePaginationProps {
  previous?: SimplePaginationNode;
  next?: SimplePaginationNode;
}

export const SimplePagination: FC<SimplePaginationProps> = ({
  previous,
  next,
}) => {
  return (
    <div
      data-testid="simple-pagination"
      className="flex flex-wrap justify-between p-0 no-underline list-none"
    >
      <div className="flex-1 text-right">
        {next && (
          <PageLink to={next.slug} type={'cover'} direction={'left'}>
            <div className="flex items-center flex-1 p-8 m-2 bg-neutral-50 hover:bg-neutral-100">
              <div className="pr-2">← </div>
              <div className="flex flex-1 text-nowrap">{next.title}</div>
            </div>
          </PageLink>
        )}
      </div>
      <div className="flex-1">
        {previous && (
          <PageLink to={previous.slug} type={'cover'} direction={'right'}>
            <div className="flex flex-1 p-8 m-2 bg-neutral-50 hover:bg-neutral-100">
              <div className="flex flex-1 text-nowrap">{previous.title}</div>
              <div className="pl-2">→</div>
            </div>
          </PageLink>
        )}
      </div>
    </div>
  );
};

export default SimplePagination;
