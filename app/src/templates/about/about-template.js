import React, { Component } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import styles from "./about.module.scss"
import Wrap from "utils/Wrap"

class AboutTamplate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: props.post,
      postContent: props.postContent,
    }
    //this._addObserve = this._addObserve.bind(this)
    //this.observerApi = ""
  }

  componentDidMount() {
    //this._addObserve()
  }

  componentWillUnmount() {
    //this._removeObserve()
  }

  // 表示要素の登録
  _addObserve() {
    /*
    const option = {
      root: null, //nullでブラウザ画面を対象にする
      rootMargin: "0% 0% -20% 0%", //画面の下から-20%の位置をターゲットと交差する位置に指定
      threshold: 0.2, //指定した要素が画面に20%入るとコールバッイベント発生
    }
    const callback = (observerEntries) => {
      observerEntries.forEach((observerEntry) => {
        if (observerEntry.isIntersecting) {
          const $section = observerEntry.target
          if (observerEntry.intersectionRatio >= 0.2) {
            $section.classList.add(styles.section__active)
            this.observerApi.unobserve($section)
          }
        } else {
        }
      })
    }
    this.observerApi = new IntersectionObserver(callback, option)

    //ターゲットごとに監視を開始する
    const triggerSection = document.getElementsByClassName(styles.section)
    for (let i = 0; i < triggerSection.length; i++) {
      this.observerApi.observe(triggerSection[i])
    }
    */
  }

  // 表示要素の解除
  _removeObserve() {
    /*
    if (this.observerApi) {
      const triggerSection = document.getElementsByClassName(styles.section)
      for (let i = 0; i < triggerSection.length; i++) {
        this.observerApi.unobserve(triggerSection[i])
      }
    }
    */
  }

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
                    className={styles.mdEditor}
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
