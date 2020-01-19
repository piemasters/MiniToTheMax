import React from 'react';
import kebabCase from 'lodash.kebabcase';
import { graphql } from 'gatsby';
import Seo from '../components/seo';
import PageLink from '../components/page-link';
import { Tag, Tags } from '../types/app.types';

const TagsPage = (data: Tags) => (
  <div>
    <Seo title={'Tags'} description={'All blog tags'} pathname={'/tags'} />
    <div>
      <h1>Tags</h1>
      <ul>
        {data.tags.group.map((tag: Tag) => (
          <li key={tag.fieldValue}>
            <PageLink
              to={`/tags/${kebabCase(tag.fieldValue)}/`}
              type={'cover'}
              direction={'up'}
            >
              {tag.fieldValue} ({tag.totalCount})
            </PageLink>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default TagsPage;

export const pageQuery = graphql`
  query {
    tags: allMdx(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
