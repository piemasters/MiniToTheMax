import React from 'react';
import { graphql } from 'gatsby';
import Seo from '../components/seo';
import PageLink from '../components/page-link';
import Layout from '../layouts/layout';

interface CategoryContext {
  category: string;
  url: string;
}

interface CategoryEdge {
  node: {
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
    };
  };
}

interface CategoryData {
  categories: {
    totalCount: number;
    edges: CategoryEdge[];
  };
}

interface Category {
  slug: string;
  title: string;
}

const Category = ({
  pageContext,
  data,
}: {
  pageContext: CategoryContext;
  data: CategoryData;
}) => {
  const categoryHeader = `${data.categories.totalCount} post${
    data.categories.totalCount === 1 ? '' : 's'
  } tagged with "${pageContext.category}"`;

  const categories: Category[] = data.categories.edges.map(
    (edge: CategoryEdge) => ({
      slug: edge.node.fields.slug,
      title: edge.node.frontmatter.title,
    })
  );

  return (
    <Layout>
      <Seo
        title={pageContext.category}
        pathname={pageContext.url}
        description={categoryHeader}
      />
      <h1>{categoryHeader}</h1>
      <ul>
        {categories.map((category: Category) => {
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
  query($category: String) {
    categories: allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$category] } } }
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
