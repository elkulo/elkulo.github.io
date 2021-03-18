import React from "react"
import { graphql } from "gatsby"
import Layout from "components/layout/layout"
import SEO from "components/seo"
import AboutTemplate from "templates/about/about-template"

const AboutPage = ({ data, location }) => (
  <Layout location={location} title="ABOUT" isPageType="About">
    <SEO title="ABOUT" />
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
        name
        date
      }
      excerpt
      html
    }
  }
`
