import React, { Component } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import styles from './about.module.scss'
import Wrap from '@/components/atoms/Wrap'

/**
 * アバウトのテンプレート
 *
 * @class AboutTamplate
 * @extends {Component}
 */
class AboutTamplate extends Component {
  /**
   * constructor
   *
   * @param {object} props
   */
  constructor(props) {
    super(props)
    this.state = {
      post: props.post,
      postContent: props.postContent,
    }
  }

  /**
   * レンダリング
   *
   * @return {JSX.Element}
   */
  render() {
    const { post, postContent } = this.state

    return (
      <article className="about">
        <div className={styles.container}>
          <Wrap>
            <div className={styles.container__header}>
              <h2 className={styles.container__header__title}>
                {postContent.title}
              </h2>
            </div>
            <div className={styles.layout}>
              <div className={styles.layout__primary}>
                <div className={styles.primary}>
                  <header className={styles.primary__header}>
                    <div className={styles.primary__header__sub}>管理者</div>
                    <h1 className={styles.primary__header__title}>
                      {postContent.description}
                    </h1>
                    <div className={styles.primary__header__date}>
                      Updated: {postContent.date}
                    </div>
                  </header>
                  <section
                    className={styles.markdownBody}
                    dangerouslySetInnerHTML={{ __html: post.html }}
                  />
                </div>
              </div>
              <div className={styles.layout__secondary}>
                <div id="about-sticky" className={styles.secondary}>
                  <GatsbyImage
                    image={postContent.picture.childImageSharp.gatsbyImageData}
                    alt={postContent.title}
                  />
                </div>
              </div>
            </div>
          </Wrap>
        </div>
      </article>
    )
  }
}

export default AboutTamplate
