import { FC } from 'react';
import { graphql } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import Layout from '../layouts/layout';
import { Pagination } from '../components/Pagination/Pagination';
import { PostSummary } from '../components/PostSummary/PostSummary';
import { StatefulSeo as Seo } from '../components/stateful/StatefulSeo/StatefulSeo';
import type { AllMdx, MdxEdge } from '../types';

type PostContext = {
  limit: number;
  skip: number;
  numPostPages: number;
  currentPage: number;
};

type PostSummaryType = {
  slug: string;
  title: string;
  date: string;
  img: IGatsbyImageData;
  excerpt: string;
};

export const Blog: FC<{
  data: {
    posts: AllMdx;
  };
  pageContext: PostContext;
}> = ({ data, pageContext }) => {
  const page = {
    isFirst: pageContext.currentPage === 1,
    isLast: pageContext.currentPage === pageContext.numPostPages,
    prevPage:
      '/blog/' +
      (pageContext.currentPage - 1 === 1
        ? ''
        : (pageContext.currentPage - 1).toString()),
    nextPage: '/blog/' + (pageContext.currentPage + 1).toString(),
    numPages: pageContext.numPostPages,
    currentPage: pageContext.currentPage,
    baseUrl: '/blog/',
  };

  const posts: PostSummaryType[] = data.posts.edges.map((edge: MdxEdge) => ({
    slug: edge.node.fields.slug,
    title: edge.node.frontmatter.title,
    date: edge.node.frontmatter.date,
    img: edge.node.frontmatter.featuredImage.childImageSharp.gatsbyImageData,
    excerpt: edge.node.excerpt,
  }));

  return (
    <Layout>
      <h1>Blog</h1>
      <ol className="m-0! list-none">
        {posts.map((post: PostSummaryType) => {
          return (
            <li key={post.slug}>
              <PostSummary
                date={post.date}
                img={post.img}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                tall={true}
              />
            </li>
          );
        })}
      </ol>

      <Pagination
        numPages={page.numPages}
        currentPage={page.currentPage}
        baseUrl={page.baseUrl}
      />
    </Layout>
  );
};

export const postQuery = graphql`
  query blogPageQuery($skip: Int, $limit: Int) {
    posts: allMdx(
      filter: { frontmatter: { published: { eq: false } } }
      sort: { frontmatter: { date: DESC } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt(pruneLength: 300)
          frontmatter {
            title
            date
            featuredImage {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED)
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default Blog;

export const Head = ({ pageContext }: { pageContext: PostContext }) => (
  <Seo
    title={'Blog'}
    description={'Blog Posts'}
    pathname={`/blog/${pageContext?.currentPage}`}
  />
);
