import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layouts/layout';
import Seo from '../components/seo';
import PageLink from '../components/page-link';
import { FluidObject } from 'gatsby-image';
import Category from './category';

interface PostCategoryContext {
  type: string;
  category: string;
  url: string;
}

interface PostCategoryEdge {
  node: {
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
      categories: string[];
      featuredImage: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
    };
  };
}

interface PostCategoryData {
  postCategories: {
    edges: PostCategoryEdge[];
  };
}

interface PostCategory {
  slug: string;
  title: string;
}

const PostCategory = ({
  pageContext,
  data,
}: {
  pageContext: PostCategoryContext;
  data: PostCategoryData;
}) => {
  const postCategories: PostCategory[] = data.postCategories.edges.map(
    (edge: PostCategoryEdge) => ({
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
        {postCategories.map((postCategory: PostCategory) => {
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
    postCategories: allMdx(
      filter: { frontmatter: { categories: { in: [$type], eq: $category } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 800, maxHeight: 400) {
                  base64
                  tracedSVG
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                  originalImg
                  originalName
                  presentationWidth
                  presentationHeight
                }
              }
            }
            categories
            title
          }
        }
      }
    }
  }
`;
