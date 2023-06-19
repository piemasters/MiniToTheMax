import React from 'react';
import kebabCase from 'lodash.kebabcase';
import { graphql } from 'gatsby';
import Seo from '../components/stateful/seo';
import PageLink from '../components/page-link';
import { Tag, Tags } from '../types/app.types';
import Layout from '../layouts/layout';

const TagsPage = ({ data }: { data: Tags }): React.ReactNode => (
  <Layout>
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
  </Layout>
);

export default TagsPage;

export const pageQuery = graphql`{
  tags: allMdx(limit: 2000, filter: {frontmatter: {published: {eq: true}}}) {
    group(field: {frontmatter: {tags: SELECT}}) {
      fieldValue
      totalCount
    }
  }
}`;
