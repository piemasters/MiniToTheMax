import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import Layout from '../layouts/layout';
import Seo from '../components/stateful/seo';
import Video from '../components/video';
import PostSummary from '../components/post-summary';
import Badges from '../components/badges';
import { getImage } from 'gatsby-plugin-image';

const IndexPage = (): React.ReactNode => {
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
      `}
      render={(data) => (
        <Layout>
          <Seo />
          <Badges />
          <h2>Latest Video</h2>
          <Video
            src="https://www.youtube.com/embed/mkZ8rqvsHnw"
            title="Gloomspite Gitz: Loonboss with Battle Standard"
          />
          <h2>Latest Post</h2>

          <PostSummary
            date={data.posts.edges[0].node.frontmatter.date}
            img={getImage(data.posts.edges[0].node.frontmatter.featuredImage)}
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
