import React from "react"
import { graphql } from "gatsby"
import Head from "@/components/atoms/Head"
import Layout from "@/templates/layout.template"
import Template from "@/templates/contact/contact.template"

const ContactPage = ({ data, location }) => (
  <Layout location={location} isPageType="Contact">
    <Head title="CONTACT" />
    <Template
      post={data.markdownRemark}
      postContent={data.markdownRemark.frontmatter}
    />
  </Layout>
)
export default ContactPage

export const pageQuery = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "//contact/index.md/" }) {
      frontmatter {
        title
        description
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
