import React from 'react'
import { graphql } from 'gatsby'
import Metadata from '@/components/atoms/Metadata'
import Layout from '@/templates/layout.template'
import Template from '@/templates/product/product-index.template'

/**
 * PRODUCT PAGE - Tag.
 *
 * @param  {{data: object, location: string}} props
 * @return {JSX.Element}
 */
const ProductTagIndex = ({ data, location }) => {
  let pageTitle = decodeURI(location.pathname.split('/').slice(-1)[0])
  if (location.pathname.slice(-1) === '/') {
    pageTitle = decodeURI(location.pathname.split('/').slice(-2)[0])
  }

  return (
    <Layout location={location} title={pageTitle} isPageType="Product">
      <Template data={data} title={pageTitle} isProductType="tag" />
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
      distinct(field: { category: SELECT })
    }
    allPost: allInternalPosts(
      filter: { tag: { eq: $slug } }
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

export const Head = ({ location }) => {
  let pageTitle = decodeURI(location.pathname.split('/').slice(-1)[0])
  if (location.pathname.slice(-1) === '/') {
    pageTitle = decodeURI(location.pathname.split('/').slice(-2)[0])
  }
  return <Metadata title={pageTitle} />
}
