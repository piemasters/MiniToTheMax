import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import Layout from '../layouts/layout';
import Seo from '../components/stateful/seo';
import Video from '../components/video';
import PostSummary from '../components/post-summary';
import Badges from '../components/badges';

const IndexPage = () => {
  return (
    <StaticQuery
      query={graphql`
        query latestPostQuery {
          posts: allMdx(
            sort: { fields: [frontmatter___date], order: DESC }
            limit: 1
            filter: { frontmatter: { published: { eq: true } } }
          ) {
            edges {
              node {
                excerpt(pruneLength: 300)
                timeToRead
                frontmatter {
                  title
                  date
                  featuredImage {
                    childImageSharp {
                      fluid(maxWidth: 800, maxHeight: 400) {
                        ...GatsbyImageSharpFluid
                        presentationWidth
                        presentationHeight
                      }
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
      `}
      render={(data) => (
        <Layout>
          <Seo />
          <Badges />
          <h2>Latest Video</h2>
          <Video
            src="https://www.youtube.com/embed/7LLB6kuu58s"
            title="Warhammer Quest: Horrors"
          />
          <h2>Latest Post</h2>

          <PostSummary
            date={data.posts.edges[0].node.frontmatter.date}
            img={
              data.posts.edges[0].node.frontmatter.featuredImage.childImageSharp
                .fluid
            }
            slug={data.posts.edges[0].node.fields.slug}
            title={data.posts.edges[0].node.frontmatter.title}
            excerpt={data.posts.edges[0].node.excerpt}
            timeToRead={data.posts.edges[0].node.timeToRead}
          />
        </Layout>
      )}
    />
  );
};

export default IndexPage;
