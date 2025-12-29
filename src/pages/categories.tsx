import { FC } from 'react';
import kebabCase from 'lodash.kebabcase';
import { graphql } from 'gatsby';
import Layout from '../layouts/layout';
import { StatefulSeo as Seo } from '../components/stateful/StatefulSeo/StatefulSeo';
import { PageLink } from '../components/PageLink/PageLink';
import type { AllMdx, MdxEdge, MdxNode, PageInfo } from '../types';

type Category = {
  totalCount: number;
  edges: [MdxEdge];
  nodes: [MdxNode];
  pageInfo: PageInfo;
  field: string;
  fieldValue: string;
};

export const CategoriesPage: FC<{
  data: { categories: AllMdx };
}> = ({ data }) => (
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
