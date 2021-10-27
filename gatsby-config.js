const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"
require("dotenv").config({ path: `.env.${activeEnv}` })

module.exports = {
  // Github pages へ npm gh-pages　でデプロイするRepository
  pathPrefix: "/elkulo.github.io",
  siteMetadata: {
    title: `el.kulo`,
    author: {
      name: `A.Sudo`,
      summary: `FRONT-END DEVELOPER & DESIGNER.`,
    },
    description: `ポートフォリオ`,
    siteUrl: `https://elkulo.github.io/`,
    social: {
      github: `elkulo`,
    },
    formUrl: `https://elkulo.me/forms/elkulo-io/post`,
    robots: `noindex,nofollow`,
    verification: process.env.SEARCH_ID ? process.env.SEARCH_ID : "",
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/pages`,
        name: `pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              quality: 80,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.TRACKING_ID,
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `el.kulo`,
        short_name: `el.kulo`,
        start_url: `https://elkulo.github.io/`,
        background_color: `#ffffff`,
        theme_color: `#191919`,
        display: `minimal-ui`,
        icon: `src/assets/icon/application-icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/Typography`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,

    // Api Server
    {
      resolve: "gatsby-source-apiserver",
      options: {
        // GraphQLで参照prefix: internal__ の場合 allInternalPosts のInternal箇所
        typePrefix: "internal__",

        // GraphQLで参照prefix: posts の場合 allInternalPosts のPosts箇所
        name: `posts`,

        // 取得先のURL(env変数)
        url: `${process.env.API_URL}?key=${process.env.API_KEY}`,

        // Apiの配列のルートになっているキー: {"data": [{},{},{}]}
        entityLevel: `data`,

        // HTTPメソッド
        method: "get",

        // リクエストヘッダー
        headers: {
          "Content-Type": "application/json",
        },
        verboseOutput: true, // For debugging purposes
      },
    },

    // Sitemap XML
    `gatsby-plugin-sitemap`,

    // Sass(SCSS)
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        cssLoaderOptions: {
          esModule: false,
          modules: {
            namedExport: false,
          },
        },
      },
    },

    // Material UI
    `gatsby-plugin-material-ui`,
  ],
}
