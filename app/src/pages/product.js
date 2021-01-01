import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ProductTemplate from "../templates/product-template"

/**
 * プロダクトインデックス
 *
 * @param {*} { data, location }
 * @returns
 */
const ProductIndex = ({ data, location }) => {
  const pageTitle = "Product"

  return (
    <Layout location={location} title={pageTitle} isPageType="Product">
      <SEO title={pageTitle} />
      <ProductTemplate data={data} title={pageTitle} isProductType="index" />
    </Layout>
  )
}

export default ProductIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allCategory: allInternalPosts {
      distinct(field: category)
    }
    allPost: allInternalPosts(
      filter: { id: { ne: "dummy" } }
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
