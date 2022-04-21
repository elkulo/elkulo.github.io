import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import styles from "./contact.module.scss"
import Wrap from "@/utils/Wrap"
import MailIcon from "@mui/icons-material/Send"

/**
 * コンタクトのテンプレート
 *
 * @param {object} post
 * @param {object} postContent
 */
const ContactTemplate = ({ post, postContent }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            formUrl
          }
        }
      }
    `
  )

  return (
    <article className="contact">
      <div className={styles.container}>
        <Wrap>
          <div className={styles.primary}>
            <header className={styles.primary__header}>
              <h1 className={styles.primary__header__title}>
                {postContent.title}
              </h1>
            </header>
            <div className={styles.primary__content}>
              <p>{postContent.description}</p>
              <p>
                <a
                  href={site.siteMetadata.formUrl}
                  rel="noopener noreferrer"
                  className="button"
                >
                  <MailIcon className={styles.icon} />
                  メールフォームへ移動
                </a>
              </p>
            </div>
            <div className={styles.primary__bg}>
              <GatsbyImage
                image={postContent.picture.childImageSharp.gatsbyImageData}
                alt={postContent.title}
              />
            </div>
          </div>
          <div className={styles.secondary}>
            <section
              className={styles.secondary__content}
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </div>
        </Wrap>
      </div>
    </article>
  )
}

export default ContactTemplate
