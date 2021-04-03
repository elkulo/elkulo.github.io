import React from "react"
import { graphql } from "gatsby"
import Layout from "components/layout/layout"
import SEO from "components/seo"
import ProductIndexTemplate from "templates/product/product-templates/index-template"

const ProductIndex = ({ data, location }) => (
  <Layout location={location} isPageType="Product">
    <SEO title="PRODUCT" />
    <ProductIndexTemplate data={data} title="PRODUCT" isProductType="index" />
  </Layout>
)
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
