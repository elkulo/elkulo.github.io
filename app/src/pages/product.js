import React from "react"
import { graphql } from "gatsby"
import Layout from "components/layout"
import SEO from "components/seo"
import ProductTemplate from "templates/product/product-template"

const ProductIndex = ({ data, location }) => (
  <Layout location={location} title="PRODUCT" isPageType="Product">
    <SEO title="PRODUCT" />
    <ProductTemplate data={data} title="PRODUCT" isProductType="index" />
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
