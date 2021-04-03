import React, { Component } from "react"
import thumbnail from "assets/videos/landscape/landscape.jpg"
import styles from "./about.module.scss"
import Wrap from "utils/Wrap"

class AboutTamplate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: props.post,
      postContent: props.postContent,
    }
    this._addObserve = this._addObserve.bind(this)
    this.observerApi = ""
  }

  componentDidMount() {
    this._addObserve()
  }

  componentWillUnmount() {
    this._removeObserve()
  }

  // 表示要素の登録
  _addObserve() {
    this.observerApi = new IntersectionObserver(
      (changes) => {
        changes.map((change) => {
          if (change.isIntersecting) {
            /** Start */
          } else {
            /** Stop */
          }
          return change
        })
      },
      { rootMargin: "-25% 0px" }
    )
    // この要素の表示範囲
    const $target = document.querySelector("#about-sticky")
    this.observerApi.observe($target)
  }

  // 表示要素の解除
  _removeObserve() {
    if (this.observerApi) {
      const $target = document.querySelector("#about-sticky")
      this.observerApi.unobserve($target)
    }
  }

  render() {
    const { post, postContent } = this.state

    return (
      <article className="about">
        <div className={styles.container}>
          <Wrap>
            <header className={styles.container__header}>
              <h1 className={styles.container__header__title}>
                {postContent.title}
              </h1>
            </header>
            <div className={styles.layout}>
              <div className={styles.layout__primary}>
                <div className={styles.primary}>
                  <section
                    className={styles.mdEditor}
                    dangerouslySetInnerHTML={{ __html: post.html }}
                  />
                </div>
              </div>
              <div className={styles.layout__secondary}>
                <div id="about-sticky" className={styles.secondary}>
                  <img src={thumbnail} alt="" />
                </div>
              </div>
            </div>
            <section className={styles.section}>
              <div style={{ height: "600px", background: "#eee" }}>TEST</div>
            </section>
            <section className={styles.section}>
              <div style={{ height: "600px", background: "#eee" }}>TEST</div>
            </section>
          </Wrap>
        </div>
      </article>
    )
  }
}

export default AboutTamplate
