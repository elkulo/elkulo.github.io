import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

/**
 * コンタクトページ
 *
 * @param {*} {data, location}
 * @returns DOM
 */
const ContactPage = ({ data, location }) => {
  const pageTitle = "contact"

  const post = data.markdownRemark
  const postContent = post.frontmatter

  return (
    <Layout location={location} title={pageTitle} isPageType="Contact">
      <SEO title={pageTitle} />
      <article className="contact">
        <div className="wrap">
          <div className="contact-primary">
            <header className="contact-primary__header">
              <h2 className="contact-primary__header__title">
                {postContent.title}
              </h2>
            </header>
            <div className="contact-primary__content">
              <p>{postContent.description}</p>
              <p>
                <a
                  href={postContent.form_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button"
                >
                  {postContent.form_title}
                </a>
              </p>
            </div>
            <div className="contact-primary__bg">
              <Image fluid={postContent.picture.childImageSharp.fluid} />
            </div>
          </div>
          <div className="contact-secondary">
            <section
              className="contact-secondary__content"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </div>
        </div>
      </article>
    </Layout>
  )
}

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
