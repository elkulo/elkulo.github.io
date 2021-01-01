import React from "react"
import { graphql } from "gatsby"
import Layout from "components/layout"
import SEO from "components/seo"
import ProductTemplate from "./product-template"

/**
 * プロダクトカテゴリー
 *
 * @param {*} { data, location }
 * @returns
 */
const ProductCategoryIndex = ({ data, location }) => {
  // ページタイトル
  let pageTitle
  if (location.pathname.slice(-1) === "/") {
    pageTitle = decodeURI(location.pathname.split("/").slice(-2)[0])
  } else {
    pageTitle = decodeURI(location.pathname.split("/").slice(-1)[0])
  }

  return (
    <Layout location={location} title={pageTitle} isPageType="Product">
      <SEO title={pageTitle} />
      <ProductTemplate data={data} title={pageTitle} isProductType="category" />
    </Layout>
  )
}

export default ProductCategoryIndex

export const pageQuery = graphql`
  query CategoryPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allCategory: allInternalPosts {
      distinct(field: category)
    }
    allPost: allInternalPosts(
      filter: { category: { eq: $slug } }
      sort: { order: DESC, fields: fields___post_id }
    ) {
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
        }
      }
    }
  }
`
