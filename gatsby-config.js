const md5 = require('md5')
const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || `development`
require(`dotenv`).config({ path: `.env.${activeEnv}` })

// APIを指定.
const getAPI = {
  _date: new Date(),
  _format(n) {
    return n < 10 ? '0' + n : n.toString()
  },
  year() {
    return this._date.getFullYear().toString()
  },
  month() {
    return this._format(this._date.getMonth() + 1)
  },
  day() {
    return this._format(this._date.getDate())
  },
  url() {
    return `${process.env?.API_URL}?key=${md5(
      this.year() + this.month() + this.day() + process.env?.API_KEY
    )}`
  },
}

module.exports = {
  // Github pages へ npm gh-pages　でデプロイするRepository
  pathPrefix: `/elkulo.github.io`,
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
    lang: 'ja',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `el.kulo`,
        short_name: `el.kulo`,
        start_url: `https://elkulo.github.io/`,
        background_color: `#ffffff`,
        theme_color: `#191919`,
        display: `minimal-ui`,
        icon: `src/assets/application-icons/favicon.png`,
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,

    `gatsby-plugin-image`,
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
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Noto Serif JP\:500`,
          `Lato\:300,400,700`, // you can also specify font weights and styles
        ],
        display: `swap`,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [process.env?.TRACKING_ID],
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ 'content:encoded': node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: `/rss.xml`,
            title: `el.kulo - RSS Feed`,
          },
        ],
      },
    },

    // Api Server
    {
      resolve: `gatsby-source-apiserver`,
      options: {
        // GraphQLで参照prefix: internal__ の場合 allInternalPosts のInternal箇所
        typePrefix: `internal__`,

        // GraphQLで参照prefix: posts の場合 allInternalPosts のPosts箇所
        name: `posts`,

        // 取得先のURL(env変数)
        url: getAPI.url(),

        // Apiの配列のルートになっているキー: {"data": [{},{},{}]}
        entityLevel: `data`,

        // HTTPメソッド
        method: `get`,

        // リクエストヘッダー
        headers: {
          'Content-Type': `application/json`,
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

    // ディレクトリのエイリアスのパス作成
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '@': 'src',
        },
        extensions: ['js', 'jsx', 'ts', 'tsx'],
      },
    },

    // Material UI
    `gatsby-plugin-material-ui`,
  ],
}
