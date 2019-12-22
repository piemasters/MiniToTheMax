/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: 'MiniToTheMax',
    author: 'David Norton',
    url: 'https://minitothemax.app',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [process.env.GA_TRACKING_ID],
        gtagConfig: {
          optimize_id: process.env.OPT_CONTAINER_ID,
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: true,
          respectDNT: true,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cache',
      options: {
        cachePublic: true, // TODO: remove to avoid netlify breaking
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sass',
    'gatsby-plugin-emotion',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/assets/images`,
        name: `images`,
      },
    },
    'gatsby-plugin-sharp',
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 750,
              withWebp: true,
              linkImagesToOriginal: false,
            },
          },
        ],
        plugins: ['gatsby-remark-images'],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `MiniToTheMax`,
        short_name: `MiniToTheMax`,
        description: `A warhammer blog`,
        lang: `en`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#eb1c22`,
        display: `standalone`,
        icon: `content/assets/images/icon.png`,
        cache_busting_mode: `query`,
      },
    },
    `gatsby-remark-images-modal`,
  ],
};
