import React from "react"
import { graphql } from "gatsby"
import Layout from "components/layout/layout"
import Meta from "components/meta"
import ContactTemplate from "components/templates/contact/contact-template"

const ContactPage = ({ data, location }) => (
  <Layout location={location} isPageType="Contact">
    <Meta title="CONTACT" />
    <ContactTemplate
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
