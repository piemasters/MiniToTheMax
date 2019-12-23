import React from 'react';
import Layout from '../layouts/layout';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { kebabCase } from 'lodash';
import SimplePagination from '../components/simple-pagination';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { safe } from '../utils';
import Gallery from 'react-grid-gallery';
import Seo from '../components/SEO';

export const query = graphql`
  query($slug: String!) {
    post: mdx(fields: { slug: { eq: $slug } }) {
      excerpt
      frontmatter {
        title
        date
        tags
        categories
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800, maxHeight: 400) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        gallery {
          publicURL
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
              presentationWidth
              presentationHeight
            }
          }
        }
      }
      body
    }
  }
`;

const Post = (props: any) => {
  const post = props.data.post;
  const { previous, next } = props.pageContext;

  const { frontmatter } = safe(post);
  const { gallery } = safe(frontmatter);

  const galleryImages = gallery
    ? gallery.map((img: any) => ({
        src: img.childImageSharp.fluid.src,
        thumbnail: img.childImageSharp.fluid.src,
        thumbnailWidth: img.childImageSharp.fluid.presentationWidth,
        thumbnailHeight: img.childImageSharp.fluid.presentationHeight,
        nano: img.childImageSharp.fluid.base64,
        srcSet: img.childImageSharp.fluid.srcSet,
      }))
    : [];

  return (
    <Layout>
      <Seo
        title={post.frontmatter.title}
        description={post.excerpt}
        pathname={post.slug}
        image={post.frontmatter.featuredImage.childImageSharp.fluid.src}
        article={true}
      />
      <h1>{post.frontmatter.title}</h1>
      <p>{post.frontmatter.date}</p>
      <Img
        fluid={
          post.frontmatter.featuredImage
            ? post.frontmatter.featuredImage.childImageSharp.fluid
            : { width: 0, height: 0, src: '', srcSet: null }
        }
      />
      <br />
      TAGS:{' '}
      {post.frontmatter.tags.map((tag: any) => (
        <Link key={tag} to={`/tags/${kebabCase(tag)}/`}>
          {tag}
        </Link>
      ))}
      CATEGORIES:
      {post.frontmatter.categories.map((category: any) => (
        <Link key={category} to={`/categories/${kebabCase(category)}/`}>
          {category}
        </Link>
      ))}
      <MDXRenderer>{post.body}</MDXRenderer>
      <h2>Gallery</h2>
      <Gallery
        images={galleryImages}
        enableImageSelection={false}
        rowHeight={180}
        margin={2}
      />
      <SimplePagination previous={previous} next={next} />
    </Layout>
  );
};

export default Post;
