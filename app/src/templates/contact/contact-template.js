import React from "react"
import Image from "gatsby-image"
import styles from "./contact.module.scss"
import Wrapper from "utils/Wrapper"

const ContactTemplate = ({ post, postContent }) => {
  return (
    <article className="contact">
      <div className={styles.container}>
        <Wrapper>
          <div className={styles.primary}>
            <header className={styles.primary__header}>
              <h2 className={styles.primary__header__title}>
                {postContent.title}
              </h2>
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
              <Image fluid={postContent.picture.childImageSharp.fluid} />
            </div>
          </div>
          <div className={styles.secondary}>
            <section
              className={styles.secondary__content}
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </div>
        </Wrapper>
      </div>
    </article>
  )
}

export default ContactTemplate
