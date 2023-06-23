import React, { FC } from 'react';
import { graphql } from 'gatsby';

import Layout from '../layouts/layout';
import { PageLink, StatefulSeo as Seo } from '../components';
import { Categories, MdxEdge, TagLink } from '../types';

export interface CategoryContext {
  category: string;
  url: string;
}

export interface CategoryTemplateProps {
  pageContext: CategoryContext;
  data: Categories;
}

export const Category: FC<CategoryTemplateProps> = ({ pageContext, data }) => {
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
