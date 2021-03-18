import React, { Component } from "react"
import thumbnail from "assets/videos/landscape/landscape.jpg"
import styles from "./about.module.scss"
import Wrapper from "utils/Wrapper"

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
          <Wrapper>
            <div className={styles.layout}>
              <div className={styles.layout__primary}>
                <div className={styles.primary}>
                  <header className={styles.primary__header}>
                    <h2 className={styles.primary__header__title}>
                      {postContent.title}
                    </h2>
                    <div className={styles.primary__header__meta}>
                      <h3 className={styles.primary__header__meta__name}>
                        {postContent.name}
                      </h3>
                      <p>update: {postContent.date}</p>
                    </div>
                  </header>
                  <section
                    className={styles.primary__content}
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
            <section className={styles.section}>
              <div style={{ height: "600px", background: "#eee" }}>TEST</div>
            </section>
          </Wrapper>
        </div>
      </article>
    )
  }
}

export default AboutTamplate
