import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "@/components/layout/layout"
import Head from "@/components/meta/head"
import HomeTemplate from "@/components/templates/home/home-template"

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
      <Head />
      <HomeTemplate date={site} location={location} />
    </Layout>
  )
}
export default IndexPage
