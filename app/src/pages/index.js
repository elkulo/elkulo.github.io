import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "components/layout/layout"
import MetaSEO from "components/meta-seo"
import HomeTemplate from "templates/home/home-template"

const IndexPage = ({ location }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  )

  return (
    <Layout location={location} isPageType="Home">
      <MetaSEO />
      <HomeTemplate date={site} location={location} />
    </Layout>
  )
}
export default IndexPage
