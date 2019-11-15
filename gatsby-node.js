const { createFilePath } = require("gatsby-source-filesystem")



const path = require('path');

module.exports.onCreateNode = ({ node, getNode, actions }) => {
  /**
   * Handle local markdown posts
   */
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    //const slugOld = path.basename(node.fileAbsolutePath, '.md');
    const slug = createFilePath({ node, getNode, basePath: `src/posts` });
    createNodeField({
      node,
      name: 'slug',
      value: `/blog${slug}`,
    });
  }
};

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogTemplate = path.resolve('./src/templates/blog.js');

  /**
   * Handle local markdown posts
   */
  const res = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  res.data.allMarkdownRemark.edges.forEach(edge => {
    createPage({
      component: blogTemplate,
      path: edge.node.fields.slug,
      context: {
        slug: edge.node.fields.slug,
      },
    });
  });
};
