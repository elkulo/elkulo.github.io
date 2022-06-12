import React from 'react'
import { graphql } from 'gatsby'
import Metadata from '@/components/atoms/Metadata'
import Layout from '@/templates/layout.template'
import Template from '@/templates/product/product-single.template'

/**
 * PRODUCT PAGE - Single.
 *
 * @param  {{data: object, pageContext: object, location: string}} props
 * @return {JSX.Element}
 */
const ProductSingle = ({ data, pageContext, location }) => {
  const post = data.internalPosts

  return (
    <Layout location={location} title={post.title} isPageType="ProductSingle">
      <Metadata title={post.title} description={post.content} />
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
