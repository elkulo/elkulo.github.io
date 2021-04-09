import React from "react"
import { graphql } from "gatsby"
import Layout from "components/layout/layout"
import MetaSEO from "components/meta-seo"
import ProductSingleTemplate from "./product-templates/single-template"

/**
 *　プロダクトシングルページ
 *
 * @class ProductSingle
 * @extends {Component}
 */
const ProductSingle = ({ data, pageContext, location }) => {
  const post = data.internalPosts

  return (
    <Layout location={location} title={post.title} isPageType="ProductSingle">
      <MetaSEO title={post.title} description={post.content} />
      <ProductSingleTemplate data={data} pageContext={pageContext} />
    </Layout>
  )
}

export default ProductSingle

export const pageQuery = graphql`
  query ProductPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    internalPosts(alternative_id: { eq: $slug }) {
      updated
      title
      category
      tag
      attachment
      link
      content
    }
  }
`
