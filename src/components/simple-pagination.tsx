import React from 'react';
import { css } from '@emotion/core';
import PageLink from './page-link';

interface PureNode {
  slug: string;
  title: string;
}

interface PureSimplePaginationProps {
  previous: PureNode;
  next: PureNode;
}

interface Node {
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    tags?: string[];
  };
}

interface SimplePaginationProps {
  previous: Node;
  next: Node;
}

export const PureSimplePagination = ({
  previous,
  next,
}: PureSimplePaginationProps) => {
  const containerStyle = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style: none;
    padding: 0;
  `;
  return (
    <ul data-testid="simple-pagination" css={containerStyle}>
      <li>
        {previous && (
          <PageLink to={previous.slug} type={'cover'} direction={'right'}>
            ← {previous.title}
          </PageLink>
        )}
      </li>
      <li>
        {next && (
          <PageLink to={next.slug} type={'cover'} direction={'left'}>
            {next.title} →
          </PageLink>
        )}
      </li>
    </ul>
  );
};

const SimplePagination = ({ previous, next }: SimplePaginationProps) => {
  const p = {
    slug: previous.fields.slug,
    title: previous.frontmatter.title,
  };

  const n = {
    slug: next.fields.slug,
    title: next.frontmatter.title,
  };

  return <PureSimplePagination previous={p} next={n} />;
};

export default SimplePagination;
