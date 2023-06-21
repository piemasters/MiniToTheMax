import React from 'react';
import { graphql } from 'gatsby';
import Seo from '../components/stateful/seo';
import PageLink from '../components/page-link';
import Layout from '../layouts/layout';
import { Categories, TagLink } from '../types/app.types';
import { MdxEdge } from '../types/base.types';

interface CategoryContext {
  category: string;
  url: string;
}

const Category = ({
  pageContext,
  data,
}: {
  pageContext: CategoryContext;
  data: Categories;
}): React.ReactNode => {
  const categoryHeader = `${data.categories.totalCount} post${
    data.categories.totalCount === 1 ? '' : 's'
  } tagged with "${pageContext.category}"`;

  const categories: TagLink[] = data.categories.edges.map((edge: MdxEdge) => ({
    slug: edge.node.fields.slug,
    title: edge.node.frontmatter.title,
  }));

  return (
    <Layout>
      <h1>{categoryHeader}</h1>
      <ul>
        {categories.map((category: TagLink) => {
          return (
            <li key={category.slug}>
              <PageLink to={category.slug} type={'cover'} direction={'up'}>
                {category.title}
              </PageLink>
            </li>
          );
        })}
      </ul>
      <PageLink to="/categories" type={'cover'} direction={'up'}>
        All categories
      </PageLink>
    </Layout>
  );
};

export default Category;

export const pageQuery = graphql`
  query ($category: String) {
    categories: allMdx(
      limit: 2000
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: {
          published: { eq: true }
          categories: { in: [$category] }
        }
      }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;

export const Head = ({ pageContext }) => (
  <Seo
    title={pageContext?.category}
    pathname={pageContext?.url}
    description={pageContext?.category}
  />
);
