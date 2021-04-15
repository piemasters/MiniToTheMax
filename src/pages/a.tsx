import React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

const APage = ({ data }: { data: any }): React.ReactNode => {
  const queryImage =
    data.posts.edges[0].node.frontmatter.featuredImage.childImageSharp
      .gatsbyImageData;

  return (
    <div>
      <div>
        <div>Page A</div>
        <Link to="/b">To B</Link>
      </div>

      {/*This throws the error when navigating to Page B*/}
      <GatsbyImage
        alt={data.posts.edges[0].node.frontmatter.title}
        image={queryImage}
      />

      {/*This doesn't throw an error when navigating to Page B */}
      {/*<GatsbyImage*/}
      {/*    alt={data.posts.edges[0].node.frontmatter.title}*/}
      {/*    image={image}*/}
      {/*/>*/}
    </div>
  );
};

export default APage;

export const pageQuery = graphql`
  query {
    posts: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      edges {
        node {
          frontmatter {
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

// Same image as returned from query above, just manually entered into an object after console.logging it
const image: IGatsbyImageData = {
  backgroundColor: '#080808',
  height: 900,
  images: {
    fallback: {
      sizes: '(min-width: 1800px) 1800px, 100vw',
      src:
        '/static/35bb649151d59c08d4ab7ad171da7985/7be0f/iron-battlefield-cover.jpg',
      srcSet:
        '/static/35bb649151d59c08d4ab7ad171da7985/1b9ec/iron-battlefield-cover.jpg 450w, /static/35bb649151d59c08d4ab7ad171da7985/b0c7a/iron-battlefield-cover.jpg 900w, /static/35bb649151d59c08d4ab7ad171da7985/7be0f/iron-battlefield-cover.jpg 1800w',
    },
    sources: [
      {
        sizes: '(min-width: 1800px) 1800px, 100vw',
        srcSet:
          '/static/35bb649151d59c08d4ab7ad171da7985/ba134/iron-battlefield-cover.webp 450w, /static/35bb649151d59c08d4ab7ad171da7985/e7f7d/iron-battlefield-cover.webp 900w, /static/35bb649151d59c08d4ab7ad171da7985/fc420/iron-battlefield-cover.webp 1800w',
        type: 'image/webp',
      },
    ],
  },
  layout: 'constrained',
  width: 1800,
};

function deepEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      console.log('Static Object: ', val1);
      console.log('Query Result: ', val2);
      return false;
    }
  }

  return true;
}

function isObject(object) {
  return object != null && typeof object === 'object';
}
