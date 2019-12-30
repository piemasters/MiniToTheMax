import React from 'react';
import Layout from '../layouts/layout';
import Seo from '../components/seo';
import { graphql } from 'gatsby';
import PageLink from '../components/page-link';

const PostCategory = ({
  pageContext,
  data,
}: {
  pageContext: any;
  data: any;
}) => {
  return (
    <Layout>
      <Seo
        title={pageContext.category}
        description={`${pageContext.type} articles on the subject of ${pageContext.category}`}
        pathname={pageContext.url}
      />

      <h1>{pageContext.category}</h1>

      <ul>
        {data.allMdx.edges.map(({ node }: { node: any }) => {
          const { slug } = node.fields;
          const { title } = node.frontmatter;
          return (
            <li key={slug}>
              <PageLink to={slug} type={'cover'} direction={'up'}>
                {title}
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
    allMdx(
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
                  ...GatsbyImageSharpFluid
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
