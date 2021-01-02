import React, { Component } from "react"
import { graphql } from "gatsby"
import MediaQuery from "react-responsive"
import Layout from "components/layout"
import SEO from "components/seo"
import { StickyContainer, Sticky } from "react-sticky"
import thumbnail from "assets/videos/landscape/landscape.jpg"

/**
 * アバウトページ
 *
 * @class AboutPage
 * @extends {Component}
 */
class AboutPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: props.location,
      post: props.data.markdownRemark,
      postContent: props.data.markdownRemark.frontmatter,
      pageTitle: "ABOUT",
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
    const $target = document.querySelector(".about-secondary")
    this.observerApi.observe($target)
  }

  // 表示要素の解除
  _removeObserve() {
    if (this.observerApi) {
      const $target = document.querySelector(".about-secondary")
      this.observerApi.unobserve($target)
    }
  }

  render() {
    const { location, post, postContent, pageTitle } = this.state

    return (
      <Layout location={location} title={pageTitle} isPageType="About">
        <SEO title={pageTitle} />
        <article className="about">
          <div className="wrap">
            <StickyContainer>
              <div className="about__container">
                <div className="about__container--primary">
                  <div className="about-primary">
                    <header className="about-primary__header">
                      <h2 className="about-primary__header__title">
                        {postContent.title}
                      </h2>
                      <div className="about-primary__header__meta">
                        <h3 className="about-primary__header__meta__name">
                          {postContent.name}
                        </h3>
                        <p>update: {postContent.date}</p>
                      </div>
                    </header>
                    <section
                      className="about-primary__content"
                      dangerouslySetInnerHTML={{ __html: post.html }}
                    />
                  </div>
                </div>
                <div className="about__container--secondary">
                  <MediaQuery query="(max-width: 1167px)">
                    <div className="about-secondary">
                      <img src={thumbnail} alt="" />
                    </div>
                  </MediaQuery>
                  <MediaQuery query="(min-width: 1168px)">
                    <Sticky>
                      {({ style, isSticky, calculatedHeight }) => {
                        // Drawerが開いている間は無効
                        if (
                          document.body.classList.contains(
                            "body__drawer--visible"
                          )
                        ) {
                          if (isSticky) {
                            style = {
                              ...style,
                              position: "static",
                              marginTop: 0 - calculatedHeight,
                            }
                          }
                        }
                        return (
                          <div style={style}>
                            <div className="about-secondary">
                              <img src={thumbnail} alt="" />
                            </div>
                          </div>
                        )
                      }}
                    </Sticky>
                  </MediaQuery>
                </div>
              </div>
            </StickyContainer>
            <section className="about__section" style={{ margin: "3rem auto" }}>
              <div style={{ height: "600px", background: "#eee" }}>TEST</div>
            </section>
            <section className="about__section" style={{ margin: "3rem auto" }}>
              <div style={{ height: "600px", background: "#eee" }}>TEST</div>
            </section>
            <section className="about__section" style={{ margin: "3rem auto" }}>
              <div style={{ height: "600px", background: "#eee" }}>TEST</div>
            </section>
          </div>
        </article>
      </Layout>
    )
  }
}

export default AboutPage

export const pageQuery = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "//about/index.md/" }) {
      frontmatter {
        title
        name
        date
      }
      excerpt
      html
    }
  }
`
