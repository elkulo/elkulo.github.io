import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import styles from "./contact.module.scss"
import Wrap from "utils/Wrap"

const ContactTemplate = ({ post, postContent }) => {
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
                  href={postContent.form_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button"
                >
                  {postContent.form_title}
                </a>
              </p>
            </div>
            <div className={styles.primary__bg}>
              <GatsbyImage
                image={postContent.picture.childImageSharp.gatsbyImageData}
                alt={postContent.form_title}
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
