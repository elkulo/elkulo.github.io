import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "components/layout/layout"
import Meta from "components/meta"
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
      <Meta />
      <HomeTemplate date={site} location={location} />
    </Layout>
  )
}
export default IndexPage
