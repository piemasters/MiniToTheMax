/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  jsxRuntime: 'automatic',
  jsxImportSource: 'react',
  siteMetadata: {
    title: 'MiniToTheMax',
    author: 'MiniToTheMax',
    description: `An Aspiring Hobby & Painting Blog`,
    siteUrl: 'https://minitothemax.app',
    image: `content/assets/images/logo.png`,
  },
  graphqlTypegen: true,
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
    'gatsby-plugin-eslint',
    'gatsby-plugin-typescript',
    'gatsby-plugin-postcss',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-robots-txt',
    {
      resolve: `gatsby-plugin-sitemap`,
      output: `/sitemap.xml`,
    },
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
    {
      resolve: 'gatsby-plugin-svgr-svgo',
      options: {
        inlineSvgOptions: [
          {
            test: /\.svg$/,
            svgoConfig: {
              plugins: [
                'prefixIds',
                {
                  name: 'preset-default',
                  params: {
                    overrides: [{ name: 'removeViewBox', active: false }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
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
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `MiniToTheMax`,
        short_name: `MiniToTheMax`,
        description: `An Aspiring Hobby & Painting Blog`,
        lang: `en`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#eb1c22`,
        display: `standalone`,
        icon: `content/assets/images/icon.png`,
        cache_busting_mode: `query`,
      },
    },
    // {
    //   resolve: `gatsby-plugin-offline`,
    //   options: {
    //     precachePages: [`/blog`],
    //   },
    // },
  ],
};
