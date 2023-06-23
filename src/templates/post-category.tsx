import React, { FC } from 'react';
import { graphql } from 'gatsby';

import Layout from '../layouts/layout';
import { CoverCategory, StatefulSeo as Seo } from '../components';
import { Categories, MdxEdge, PostLink } from '../types';

export interface PostCategoryContext {
  type: string;
  category: string;
  url: string;
}

export interface PostCategoryTemplateProps {
  pageContext: PostCategoryContext;
  data: Categories;
}

const PostCategory: FC<PostCategoryTemplateProps> = ({ pageContext, data }) => {
  const postCategories: PostLink[] = data.categories.edges.map(
    (edge: MdxEdge) => ({
      slug: edge.node.fields.slug,
      title: edge.node.frontmatter.title,
      img: edge.node.frontmatter.featuredImage.childImageSharp.gatsbyImageData,
    })
  );

  return (
    <Layout>
      <h1>{pageContext.category}</h1>
      <ul>
        {postCategories.map((postCategory: PostLink) => {
          return (
            <CoverCategory
              key={postCategory.slug}
              img={postCategory.img}
              slug={postCategory.slug}
              title={postCategory.title}
            />
          );
        })}
      </ul>
    </Layout>
  );
};

export default PostCategory;

export const pageQuery = graphql`
  query ($category: String!, $type: String!) {
    categories: allMdx(
      filter: {
        frontmatter: {
          categories: { in: [$type], eq: $category }
          published: { eq: true }
        }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            categories
            title
            featuredImage {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`;

export const Head = ({ pageContext }) => (
  <Seo
    title={pageContext?.category}
    description={`${pageContext?.type} articles on the subject of ${pageContext?.category}`}
    pathname={pageContext?.url}
  />
);
