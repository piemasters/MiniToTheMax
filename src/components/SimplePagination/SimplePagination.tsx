import { FC } from 'react';
import { css } from '@emotion/react';

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
  const containerStyle = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style: none;
    padding: 0;
    text-decoration: none;
  `;

  const paginationStyleLeft = css`
    flex: 1;
    padding: 2rem 2rem 2rem 0;
  `;

  const paginationStyleRight = css`
    flex: 1;
    padding: 2rem 0 2rem 2rem;
  `;

  const textStyle = css`
    flex: 1;
  `;

  const arrowLeftStyle = css`
    padding-right: 0.4rem;
  `;

  const arrowRightStyle = css`
    padding-left: 0.4rem;
  `;

  const leftStyle = css`
    display: flex;
  `;

  const rightStyle = css`
    display: flex;
    text-align: right;
  `;

  return (
    <div data-testid="simple-pagination" css={containerStyle}>
      <div css={paginationStyleLeft}>
        {next && (
          <PageLink to={next.slug} type={'cover'} direction={'left'}>
            <div css={rightStyle}>
              <div css={arrowLeftStyle}>← </div>
              <div css={textStyle}>{next.title}</div>
            </div>
          </PageLink>
        )}
      </div>
      <div css={paginationStyleRight}>
        {previous && (
          <PageLink to={previous.slug} type={'cover'} direction={'right'}>
            <div css={leftStyle}>
              <div css={textStyle}>{previous.title}</div>
              <div css={arrowRightStyle}>→</div>
            </div>
          </PageLink>
        )}
      </div>
    </div>
  );
};

export default SimplePagination;
