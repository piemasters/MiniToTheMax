import React from 'react';
import kebabCase from 'lodash.kebabcase';
import { graphql } from 'gatsby';
import Seo from '../components/stateful/seo';
import PageLink from '../components/page-link';
import { Categories, Category } from '../types/app.types';
import Layout from '../layouts/layout';

const CategoriesPage = ({ data }: { data: Categories }): React.ReactNode => (
  <Layout>
    <Seo
      title={'Categories'}
      description={'All blog categories'}
      pathname={'/categories'}
    />
    <div>
      <h1>Categories</h1>
      <ul>
        {data.categories.group.map((category: Category) => (
          <li key={category.fieldValue}>
            <PageLink
              to={`/categories/${kebabCase(category.fieldValue)}/`}
              type={'cover'}
              direction={'up'}
            >
              {category.fieldValue} ({category.totalCount})
            </PageLink>
          </li>
        ))}
      </ul>
    </div>
  </Layout>
);

export default CategoriesPage;

export const pageQuery = graphql`{
  categories: allMdx(limit: 2000, filter: {frontmatter: {published: {eq: true}}}) {
    group(field: {frontmatter: {categories: SELECT}}) {
      fieldValue
      totalCount
    }
  }
}`;
