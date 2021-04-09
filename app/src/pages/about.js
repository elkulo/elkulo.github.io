import React from "react"
import { graphql } from "gatsby"
import Layout from "components/layout/layout"
import MetaSEO from "components/meta-seo"
import AboutTemplate from "templates/about/about-template"

const AboutPage = ({ data, location }) => (
  <Layout location={location} isPageType="About">
    <MetaSEO title="ABOUT" />
    <AboutTemplate
      post={data.markdownRemark}
      postContent={data.markdownRemark.frontmatter}
    />
  </Layout>
)
export default AboutPage

export const pageQuery = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "//about/index.md/" }) {
      frontmatter {
        title
      }
      excerpt
      html
    }
  }
`
