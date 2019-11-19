const path = require('path');
const { createFilePath } = require("gatsby-source-filesystem");

module.exports.onCreateNode = ({ node, getNode, actions }) => {
  /**
   * Handle local markdown posts
   */
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    //const slugOld = path.basename(node.fileAbsolutePath, '.md');
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
  const postTemplate = path.resolve('./src/templates/blog.js');
  const blogTemplate = path.resolve('./src/pages/blog.js');

  /**
   * Handle local markdown posts
   */
  const result = await graphql(`
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

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges;
  console.log(posts)

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

  // Create blog post list pages
  const postsPerPage = 2;
  const numPages = Math.ceil(posts.length / postsPerPage);


  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: blogTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

};
