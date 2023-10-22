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
  const { title: pageTitle } = data.internalPosts

  return (
    <Layout location={location} title={pageTitle} isPageType="ProductSingle">
      <Template data={data} pageContext={pageContext} />
    </Layout>
  )
}
export default ProductSingle

export const pageQuery = graphql`
  query ProductPostBySlug($slug: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    internalPosts(alternative_id: { eq: $slug }) {
      date
      title
      category
      tag
      attachment
      link
      content
    }
  }
`

export const Head = ({ data }) => {
  const post = data.internalPosts
  return <Metadata title={post.title} description={post.content} />
}
