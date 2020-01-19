import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layouts/layout';
import Seo from '../components/seo';
import PageLink from '../components/page-link';
import { Categories, TagLink } from '../types/app.types';
import { MdxEdge } from '../types/base.types';

interface PostCategoryContext {
  type: string;
  category: string;
  url: string;
}

const PostCategory = ({
  pageContext,
  data,
}: {
  pageContext: PostCategoryContext;
  data: Categories;
}) => {
  const postCategories: TagLink[] = data.categories.edges.map(
    (edge: MdxEdge) => ({
      slug: edge.node.fields.slug,
      title: edge.node.frontmatter.title,
    })
  );

  return (
    <Layout>
      <Seo
        title={pageContext.category}
        description={`${pageContext.type} articles on the subject of ${pageContext.category}`}
        pathname={pageContext.url}
      />

      <h1>{pageContext.category}</h1>

      <ul>
        {postCategories.map((postCategory: TagLink) => {
          return (
            <li key={postCategory.slug}>
              <PageLink to={postCategory.slug} type={'cover'} direction={'up'}>
                {postCategory.title}
              </PageLink>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default PostCategory;

export const pageQuery = graphql`
  query($category: String!, $type: String!) {
    categories: allMdx(
      filter: { frontmatter: { categories: { in: [$type], eq: $category } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            categories
            title
          }
        }
      }
    }
  }
`;
