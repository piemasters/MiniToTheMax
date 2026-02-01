import { FC } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import Layout from '../layouts/layout';
import { StatefulSeo as Seo } from '../components/stateful/StatefulSeo/StatefulSeo';
import { Badges } from '../components/Badges/Badges';
import { PostSummary } from '../components/PostSummary/PostSummary';
import { Video } from '../components/Video/Video';

export const IndexPage: FC = () => {
  const data = useStaticQuery(graphql`
    query latestPostQuery {
      posts: allMdx(
        sort: { frontmatter: { date: DESC } }
        limit: 1
        filter: { frontmatter: { published: { eq: true } } }
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
  `);

  return (
    <Layout>
      <Badges />
      <h2>Latest Video</h2>
      <Video
        videoId="tfsRyVlUbOU"
        title="Moonstone Doug the Flatulent, Beaky Bobby, Vicious Syd and Grub"
      />
      <h2>Latest Post</h2>

      <PostSummary
        date={data.posts.edges[0].node.frontmatter.date}
        img={getImage(data.posts.edges[0].node.frontmatter.featuredImage)}
        slug={data.posts.edges[0].node.fields.slug}
        title={data.posts.edges[0].node.frontmatter.title}
        excerpt={data.posts.edges[0].node.excerpt}
      />
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <Seo />;
