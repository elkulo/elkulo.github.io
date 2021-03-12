import React from "react"
import { graphql } from "gatsby"
import Layout from "components/layout"
import SEO from "components/seo"
import ContactTemplate from "templates/contact/contact-template"

const ContactPage = ({ data, location }) => (
  <Layout location={location} title="CONTACT" isPageType="Contact">
    <SEO title="CONTACT" />
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
            fluid(maxWidth: 2400, maxHeight: 1600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        form_title
        form_url
      }
      excerpt
      html
    }
  }
`
