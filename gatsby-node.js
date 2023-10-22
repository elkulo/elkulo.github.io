const path = require(`path`)
const { createFilePath, createRemoteFileNode } = require(
  `gatsby-source-filesystem`,
)
const md5 = require('md5')

// ページ生成
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // 個別ページ生成
  const productPost = path.resolve(`./src/nodes/product-single.js`)
  await graphql(`
    {
      allInternalPosts(filter: { id: { ne: "dummy" } }) {
        edges {
          node {
            id
            alternative_id
            date
            title
            category
            tag
            attachment
            link
            content
            fields {
              post_id
              post_slug
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create product posts pages.
    const posts = result.data.allInternalPosts.edges

    posts.forEach((post, index) => {
      const previous = index === 0 ? null : posts[index - 1].node
      const next = index === posts.length - 1 ? null : posts[index + 1].node

      // ページの生成.
      createPage({
        path: 'product/' + md5(post.node?.alternative_id || 0).slice(0, 12), // ハッシュ化したURL.
        component: productPost,
        context: {
          slug: md5(post.node?.alternative_id || 0).slice(0, 12), // ハッシュ化したURL.
          previous,
          next,
        },
      })
    })
  })

  // カテゴリーページ生成
  const productCategory = path.resolve(`./src/nodes/product-category.js`)
  await graphql(`
    {
      allInternalPosts {
        distinct(field: { category: SELECT })
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create product posts pages.
    const categories = result.data.allInternalPosts.distinct

    if (categories.length) {
      categories.forEach(cat => {
        // ページの生成
        createPage({
          path: 'product/category/' + cat,
          component: productCategory,
          context: {
            slug: cat,
          },
        })
      })
    }
  })

  // タグページ生成
  const productTag = path.resolve(`./src/nodes/product-tag.js`)
  await graphql(`
    {
      allInternalPosts {
        distinct(field: { tag: SELECT })
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create product posts pages.
    const tags = result.data.allInternalPosts.distinct

    if (tags.length) {
      tags.forEach(tag => {
        // ページの生成
        createPage({
          path: 'product/tag/' + tag,
          component: productTag,
          context: {
            slug: tag,
          },
        })
      })
    }
  })
}

// ノードに属性を追加
exports.onCreateNode = async ({ node, actions, getNode, store, cache }) => {
  const { createNode, createNodeField } = actions

  if (node.internal.type === 'internal__posts') {
    // ソート用に桁揃えのIDを付与.
    await createNodeField({
      name: 'post_id',
      node,
      value: ('000000' + node?.alternative_id).slice(-6),
    })

    // ハッシュ化したスラッグを追加.
    await createNodeField({
      name: 'post_slug',
      node,
      value: md5(node?.alternative_id || 0).slice(0, 12),
    })

    // 画像ノードを追加.
    if (Array.isArray(node.attachment)) {
      await node.attachment.forEach(async imageSrcUrl => {
        const fileNode = await createRemoteFileNode({
          url: imageSrcUrl, // string that points to the URL of the image
          parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
          createNode, // helper function in gatsby-node to generate the node
          createNodeId: id => imageSrcUrl, // helper function in gatsby-node to generate the node id
          cache, // Gatsby's cache
          store, // Gatsby's redux store
        })

        // インスタンス名を上書き
        fileNode.sourceInstanceName = 'attachments'

        // 他ファイルノードと区別するための識別子を付与
        await createNodeField({
          node: fileNode,
          name: 'has_attachment',
          value: true,
        })

        // メタ情報として画像のURLを付与
        await createNodeField({
          node: fileNode,
          name: 'attachment_src',
          value: imageSrcUrl,
        })
      })
    }
  }

  // gatsby-plugin-feed
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    await createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

// GraphQLスキーマをカスタマイズ
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      github: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
