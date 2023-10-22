import React from 'react'
import { graphql } from 'gatsby'
import Metadata from '@/components/atoms/Metadata'
import Layout from '@/templates/layout.template'
import Template from '@/templates/product/product-index.template'

/**
 * PRODUCT PAGE - Category.
 *
 * @param  {{data: object, location: string}} props
 * @return {JSX.Element}
 */
const ProductCategoryIndex = ({ data, location }) => {
  let pageTitle = decodeURI(location.pathname.split('/').slice(-1)[0])
  if (location.pathname.slice(-1) === '/') {
    pageTitle = decodeURI(location.pathname.split('/').slice(-2)[0])
  }

  return (
    <Layout location={location} title={pageTitle} isPageType="Product">
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
      distinct(field: { category: SELECT })
    }
    allPost: allInternalPosts(
      filter: { category: { eq: $slug } }
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
