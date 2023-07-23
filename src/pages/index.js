import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Metadata from '@/components/atoms/Metadata'
import Layout from '@/templates/layout.template'
import Template from '@/templates/home/home.template'

/**
 * HOME PAGE.
 *
 * @param  {{location: string}} props
 * @return {JSX.Element}
 */
const IndexPage = ({ location }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  return (
    <Layout location={location} isPageType="Home">
      <Template date={site} location={location} />
    </Layout>
  )
}
export default IndexPage

export const Head = () => <Metadata />
