import React from "react"
import { graphql } from "gatsby"
import Head from "@/components/meta/head"
import Layout from "@/templates/layout.template"
import Template from "@/templates/product/product-single.template"

const ProductSingle = ({ data, pageContext, location }) => {
  const post = data.internalPosts

  return (
    <Layout location={location} title={post.title} isPageType="ProductSingle">
      <Head title={post.title} description={post.content} />
      <Template data={data} pageContext={pageContext} />
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
