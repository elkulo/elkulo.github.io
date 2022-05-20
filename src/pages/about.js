import React from "react"
import { graphql } from "gatsby"
import Head from "@/components/meta/head"
import Layout from "@/templates/layout.template"
import Template from "@/templates/about/about.template"

const AboutPage = ({ data, location }) => (
  <Layout location={location} isPageType="About">
    <Head title="ABOUT" />
    <Template
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
        description
        date
        picture {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
      excerpt
      html
    }
  }
`
