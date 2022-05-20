import React from "react"
import { graphql } from "gatsby"
import Head from "@/components/meta/head"
import Layout from "@/templates/layout.template"
import Template from "@/templates/product/product-index.template"

const ProductCategoryIndex = ({ data, location }) => {
  let pageTitle = decodeURI(location.pathname.split("/").slice(-1)[0])
  if (location.pathname.slice(-1) === "/") {
    pageTitle = decodeURI(location.pathname.split("/").slice(-2)[0])
  }

  return (
    <Layout location={location} title={pageTitle} isPageType="Product">
      <Head title={pageTitle} />
      <Template data={data} title={pageTitle} isProductType="category" />
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
