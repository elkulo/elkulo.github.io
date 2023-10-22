import React from 'react'
import { graphql } from 'gatsby'
import Metadata from '@/components/atoms/Metadata'
import Layout from '@/templates/layout.template'
import Template from '@/templates/product/product-index.template'

/**
 * PRODUCT PAGE.
 *
 * @param  {{data: object, location: string}} props
 * @return {JSX.Element}
 */
const ProductIndex = ({ data, location }) => (
  <Layout location={location} isPageType="Product">
    <Template data={data} title="PRODUCT" isProductType="index" />
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
      distinct(field: { category: SELECT })
    }
    allPost: allInternalPosts(
      filter: { id: { ne: "dummy" } }
      sort: { fields: { post_id: DESC } }
    ) {
      edges {
        node {
          id
          alternative_id
          date
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

export const Head = () => <Metadata title="PRODUCT" />
