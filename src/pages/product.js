import React from "react"
import { graphql } from "gatsby"
import Layout from "components/layout/layout"
import Head from "components/meta/head"
import ProductIndexTemplate from "components/templates/product/product-index-template"

const ProductIndex = ({ data, location }) => (
  <Layout location={location} isPageType="Product">
    <Head title="PRODUCT" />
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
