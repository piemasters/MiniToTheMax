const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { kebabCase } = require('lodash');

module.exports.onCreateNode = ({ node, getNode, actions }) => {
  /**
   * Handle local markdown posts
   */
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: `` });
    createNodeField({
      node,
      name: 'slug',
      value: `${slug}`,
    });
  }
};

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve('./src/templates/post.tsx');
  const blogTemplate = path.resolve('./src/templates/blog.tsx');
  const tagTemplate = path.resolve('src/templates/tags.tsx');

  /**
   * Handle local markdown posts
   */
  const result = await graphql(`
    query {
      posts: allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              tags
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  // Create blog post pages
  const posts = result.data.posts.edges;

  posts.forEach((edge, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;
    createPage({
      component: postTemplate,
      path: edge.node.fields.slug,
      context: {
        slug: edge.node.fields.slug,
        previous,
        next,
      },
    });
  });

  // Extract tag data from query
  const tags = result.data.tagsGroup.group;
  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tags/${kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    });
  });

  // Create blog post list pages
  const postsPerPage = 10;
  const numPages = Math.ceil(posts.length / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog/` : `/blog/${i + 1}`,
      component: blogTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });
};
