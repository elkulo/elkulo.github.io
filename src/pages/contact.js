import React from 'react'
import { graphql } from 'gatsby'
import Metadata from '@/components/atoms/Metadata'
import Layout from '@/templates/layout.template'
import Template from '@/templates/contact/contact.template'

/**
 * CONTACT PAGE.
 *
 * @param  {{data: object, location: string}} props
 * @return {JSX.Element}
 */
const ContactPage = ({ data, location }) => (
  <Layout location={location} isPageType="Contact">
    <Metadata title="CONTACT" />
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
