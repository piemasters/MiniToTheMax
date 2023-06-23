import React, { FC } from 'react';
import { graphql } from 'gatsby';
import kebabCase from 'lodash.kebabcase';

import Layout from '../layouts/layout';
import { PageLink, StatefulSeo as Seo } from '../components';
import type { Tag, Tags } from '../types';

export interface TagsPageProps {
  data: Tags;
}

export const TagsPage: FC<TagsPageProps> = ({ data }) => (
  <Layout>
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
  </Layout>
);

export default TagsPage;

export const pageQuery = graphql`
  {
    tags: allMdx(
      limit: 2000
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;

export const Head = () => (
  <Seo title={'Tags'} description={'All blog tags'} pathname={'/tags'} />
);
