import React from 'react'
import { graphql } from 'gatsby'
import Metadata from '@/components/atoms/Metadata'
import Layout from '@/templates/layout.template'
import Template from '@/templates/about/about.template'

/**
 * ABOUT PAGE.
 *
 * @param  {{data: object, location: string}} props
 * @return {JSX.Element}
 */
const AboutPage = ({ data, location }) => (
  <Layout location={location} isPageType="About">
    <Template
      post={data.markdownRemark}
      postContent={data.markdownRemark.frontmatter}
    />
  </Layout>
)
export default AboutPage

export const pageQuery = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "//pages/about/index.md/" }) {
      frontmatter {
        title
        description
        date
        attached {
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

export const Head = () => <Metadata title="ABOUT" />
