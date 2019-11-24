import React from 'react';
import Layout from '../layouts/layout';
import { Link, graphql } from 'gatsby';
import Head from '../components/head';
import Img from 'gatsby-image';
import { kebabCase } from 'lodash';
import SimplePagination from '../components/simple-pagination';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { safe } from '../utils';
import { MDXSharpImg, MDXSrcImg, safeFluid } from '../components/images';

export const query = graphql`
  query($slug: String!) {
    post: mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
        tags
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800, maxHeight: 400) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        images {
          publicURL
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
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
  const { images } = safe(frontmatter);

  console.log(props);
  console.log(images);

  const imgs: { [k: string]: React.ReactNode } = {};
  if (images) {
    images.forEach((image, i) => {
      const { childImageSharp: c, publicURL } = safe(image);
      const { fluid: f } = safe(c);
      imgs[`Img${i + 1}`] = ({ align, width }) =>
        f ? (
          <MDXSharpImg align={align} width={width} fluid={safeFluid(f)} />
        ) : (
          <MDXSrcImg align={align} width={width} src={publicURL || ''} />
        );
    });
  }

  const test = images[0];
  console.log(test);
  console.log(imgs);

  return (
    <Layout>
      <Head title={post.frontmatter.title} />
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

      {post.frontmatter.tags.map((tag: any) => (
        <Link key={tag} to={`/tags/${kebabCase(tag)}/`}>
          {tag}
        </Link>
      ))}

      <MDXRenderer imgs={imgs} test={test}>
        {post.body}
      </MDXRenderer>

      {/*<div dangerouslySetInnerHTML={{ __html: post.html }} />*/}

      <SimplePagination previous={previous} next={next} />
    </Layout>
  );
};

export default Post;
