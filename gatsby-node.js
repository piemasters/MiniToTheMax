const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { kebabCase } = require('lodash');
const { readdirSync } = require('fs');

module.exports.onCreateNode = ({ node, getNode, actions }) => {
  /**
   * Handle local markdown posts
   */
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
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
  const tagTemplate = path.resolve('src/templates/tag.tsx');
  const categoryTemplate = path.resolve('src/templates/category.tsx');
  const postCategoryTemplate = path.resolve('src/templates/post-category.tsx');

  /**
   * Handle local markdown posts
   */
  const result = await graphql(`
    query {
      posts: allMdx(
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
      tagsGroup: allMdx(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
      categoriesGroup: allMdx(limit: 2000) {
        group(field: frontmatter___categories) {
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

  // Function for getting a list of directories in a path
  const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

  // Function for converting a string into Title Case
  const titleCase = str => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => {
        return word.replace(word[0], word[0].toUpperCase());
      })
      .join(' ');
  };

  /* Get a list of all directories under content/blog,
   * then all categories under those and flatten */
  const postCategories = getDirectories('./content/blog')
    .map(root =>
      getDirectories(`./content/blog/${root}`).map(dir => ({
        type: titleCase(root.replace(/-/, ' ')),
        url: `/${root}/${dir}`,
        name: titleCase(dir.replace(/-/, ' ')),
      }))
    )
    .flat();
  // Make post category pages
  postCategories.forEach(category => {
    createPage({
      path: category.url,
      component: postCategoryTemplate,
      context: {
        type: category.type,
        category: category.name,
        url: category.url,
      },
    });
  });

  // Extract tag data from query
  const tags = result.data.tagsGroup.group;
  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tags/${kebabCase(tag.fieldValue)}`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
        url: `/tags/${kebabCase(tag.fieldValue)}`,
      },
    });
  });

  // Extract category data from query
  const categories = result.data.categoriesGroup.group;
  // Make tag pages
  categories.forEach(category => {
    createPage({
      path: `/categories/${kebabCase(category.fieldValue)}`,
      component: categoryTemplate,
      context: {
        category: category.fieldValue,
        url: `/categories/${kebabCase(category.fieldValue)}`,
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
