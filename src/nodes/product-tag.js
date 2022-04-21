import React from "react"
import { graphql } from "gatsby"
import Layout from "@/components/layout/layout"
import Head from "@/components/meta/head"
import ProductIndexTemplate from "@/components/templates/product/product-index-template"

const ProductTagIndex = ({ data, location }) => {
  let pageTitle = decodeURI(location.pathname.split("/").slice(-1)[0])
  if (location.pathname.slice(-1) === "/") {
    pageTitle = decodeURI(location.pathname.split("/").slice(-2)[0])
  }

  return (
    <Layout location={location} title={pageTitle} isPageType="Product">
      <Head title={pageTitle} />
      <ProductIndexTemplate data={data} title={pageTitle} isProductType="tag" />
    </Layout>
  )
}

export default ProductTagIndex

export const pageQuery = graphql`
  query TagPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allCategory: allInternalPosts {
      distinct(field: category)
    }
    allPost: allInternalPosts(
      filter: { tag: { eq: $slug } }
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
