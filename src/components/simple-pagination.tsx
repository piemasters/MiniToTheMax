import { Link } from 'gatsby';
import React from 'react';
import { css } from '@emotion/core';

interface SimplePaginationProps {
  previous: any;
  next: any;
}

const SimplePagination = ({ previous, next }: SimplePaginationProps) => {
  const containerStyle = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style: none;
    padding: 0;
  `;

  return (
    <ul css={containerStyle}>
      <li>
        {previous && (
          <Link to={previous.fields.slug} rel="prev">
            ← {previous.frontmatter.title}
          </Link>
        )}
      </li>
      <li>
        {next && (
          <Link to={next.fields.slug} rel="next">
            {next.frontmatter.title} →
          </Link>
        )}
      </li>
    </ul>
  );
};

export default SimplePagination;
