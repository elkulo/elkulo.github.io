const path = require(`path`)
const {
  createFilePath,
  createRemoteFileNode,
} = require(`gatsby-source-filesystem`)

// ページ生成
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // 個別ページ生成
  const productPost = path.resolve(`./src/templates/product-post.js`)
  await graphql(
    `
      {
        allInternalPosts(filter: { id: { ne: "dummy" } }) {
          edges {
            node {
              id
              alternative_id
              updated
              title
              category
              tag
              attachment
              link
              content
            }
          }
        }
      }
    `
  ).then((result) => {
    if (result.errors) {
      throw result.errors
    }

    // Create product posts pages.
    const posts = result.data.allInternalPosts.edges

    posts.forEach((post, index) => {
      const previous = index === 0 ? null : posts[index - 1].node
      const next = index === posts.length - 1 ? null : posts[index + 1].node

      // ページの生成
      createPage({
        path: "product/" + post.node.alternative_id,
        component: productPost,
        context: {
          slug: post.node.alternative_id,
          previous,
          next,
        },
      })
    })
  })

  // カテゴリーページ生成
  const productCategory = path.resolve(`./src/templates/product-category.js`)
  await graphql(
    `
      {
        allInternalPosts {
          distinct(field: category)
        }
      }
    `
  ).then((result) => {
    if (result.errors) {
      throw result.errors
    }

    // Create product posts pages.
    const categories = result.data.allInternalPosts.distinct

    categories.forEach((cat, index) => {
      // ページの生成
      createPage({
        path: "product/category/" + cat,
        component: productCategory,
        context: {
          slug: cat,
        },
      })
    })
  })

  // タグページ生成
  const productTag = path.resolve(`./src/templates/product-tag.js`)
  await graphql(
    `
      {
        allInternalPosts {
          distinct(field: tag)
        }
      }
    `
  ).then((result) => {
    if (result.errors) {
      throw result.errors
    }

    // Create product posts pages.
    const tags = result.data.allInternalPosts.distinct

    tags.forEach((tag, index) => {
      // ページの生成
      createPage({
        path: "product/tag/" + tag,
        component: productTag,
        context: {
          slug: tag,
        },
      })
    })
  })
}

// ページにノードの追加
exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // Post ID を付与
  // ソート用に桁揃え
  if (node.internal.type === "internal__posts") {
    await createNodeField({
      name: "post_id",
      node,
      value: ("000000" + node.alternative_id).slice(-6),
    })
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

// 画像ノード
exports.sourceNodes = async ({
  actions: { createNode, createNodeField },
  //createNodeId,
  getNodes,
  store,
  cache,
}) => {
  await getNodes().map(async (node, index) => {
    if (node.internal.type === "internal__posts" && node.attachment) {
      await node.attachment.map(async (attachmentUrl) => {
        if (!attachmentUrl) return

        const fileNode = await createRemoteFileNode({
          url: process.env.MEDIA_URL + attachmentUrl, // string that points to the URL of the image
          parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
          createNode, // helper function in gatsby-node to generate the node
          createNodeId: (id) => attachmentUrl, // helper function in gatsby-node to generate the node id
          cache, // Gatsby's cache
          store, // Gatsby's redux store
        })

        // インスタンス名を上書き
        fileNode.sourceInstanceName = "attachments"

        // 他ファイルノードと区別するための識別子を付与
        await createNodeField({
          node: fileNode,
          name: "has_post_attachment",
          value: true,
        })

        // メタ情報として画像のURLを付与
        await createNodeField({
          node: fileNode,
          name: "attachment_src",
          value: attachmentUrl,
        })

        return fileNode
      })
    }
  })
}

// ディレクトリのエイリアスのパス作成
exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        assets: path.resolve(__dirname, "src/assets"),
        components: path.resolve(__dirname, "src/components"),
        pages: path.resolve(__dirname, "src/pages"),
        templates: path.resolve(__dirname, "src/templates"),
        utils: path.resolve(__dirname, "src/utils"),
      },
    },
  })
}
