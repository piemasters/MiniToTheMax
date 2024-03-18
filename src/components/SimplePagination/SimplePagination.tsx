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
      className="flex flex-wrap justify-between list-none p-0 no-underline"
    >
      <div className="flex-1 py-8 pr-8">
        {next && (
          <PageLink to={next.slug} type={'cover'} direction={'left'}>
            <div className="flex text-right">
              <div className="pr-2">← </div>
              <div className="flex-1">{next.title}</div>
            </div>
          </PageLink>
        )}
      </div>
      <div className="flex-1 py-8 pl-8">
        {previous && (
          <PageLink to={previous.slug} type={'cover'} direction={'right'}>
            <div className="flex">
              <div className="flex-1">{previous.title}</div>
              <div className="pl-2">→</div>
            </div>
          </PageLink>
        )}
      </div>
    </div>
  );
};

export default SimplePagination;
