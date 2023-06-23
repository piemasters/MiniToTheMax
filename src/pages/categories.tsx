import React, { FC } from 'react';
import kebabCase from 'lodash.kebabcase';
import { graphql } from 'gatsby';

import Layout from '../layouts/layout';
import { PageLink, StatefulSeo as Seo } from '../components';
import type { Categories, Category } from '../types';

export interface CategoriesPageProps {
  data: Categories;
}

export const CategoriesPage: FC<CategoriesPageProps> = ({ data }) => (
  <Layout>
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

export const pageQuery = graphql`
  {
    categories: allMdx(
      limit: 2000
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      group(field: { frontmatter: { categories: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;

export const Head = () => (
  <Seo
    title={'Categories'}
    description={'All blog categories'}
    pathname={'/categories'}
  />
);
