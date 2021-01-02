import React, { Component } from "react"
import { Link, graphql } from "gatsby"
import Bio from "components/bio"
import Layout from "components/layout"
import SEO from "components/seo"
import Image from "utils/Image"
import MediaQuery from "react-responsive"
import LinkIcon from "@material-ui/icons/InsertLink"

/**
 *　プロダクトシングルページ
 *
 * @class ProductPostTemplate
 * @extends {Component}
 */
class ProductPostTemplate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: props.location,
      post: props.data.internalPosts,
      previous: props.pageContext.previous,
      next: props.pageContext.next,
      feature: props.data.internalPosts.attachment[0],
    }
    this.handleClick = this.handleClick.bind(this)
  }

  // 画像の差し替え
  handleClick(i) {
    this.setState({ feature: this.state.post.attachment[i] })
  }

  render() {
    const { post, previous, next, location, feature } = this.state

    return (
      <Layout location={location} title={post.title} isPageType="ProductPost">
        <SEO title={post.title} description={post.content} />
        <div className="product-post">
          <div className="wrap">
            <article className="entry">
              <div className="entry__container">
                <div className="entry__container--primary">
                  <div className="entry-primary">
                    <div className="entry-primary__categories">
                      <div className="entry-primary__categories__return">
                        <Link to={`/product`} className="button">
                          ← リストへ戻る
                        </Link>
                      </div>

                      {post.category.map((_cat_name, _cat_index) => {
                        return (
                          <div
                            className="entry-primary__categories__category"
                            key={_cat_index}
                          >
                            <Link
                              to={`/product/category/${encodeURI(_cat_name)}`}
                            >
                              {_cat_name}
                            </Link>
                          </div>
                        )
                      })}
                    </div>

                    <header className="entry-primary__header">
                      <h1 className="entry-primary__header__title">
                        {!post.link && post.title}
                        {post.link && (
                          <a
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="entry-primary__header__title__link"
                          >
                            {post.title}
                            <LinkIcon />
                          </a>
                        )}
                      </h1>
                      <div className="entry-primary__header__meta">
                        Update: {post.updated}
                        {post.link && (
                          <span className="entry-primary__header__meta__preview">
                            Preview:
                            <a
                              href={post.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {post.link}
                            </a>
                          </span>
                        )}
                      </div>
                    </header>

                    <div
                      className="entry-primary__content"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <MediaQuery query="(min-width: 768px)">
                      {1 < post.attachment.length && (
                        <div className="entry-primary__attachments">
                          {post.attachment.map((_image_src, _image_index) => {
                            return (
                              <div
                                className="entry-primary__attachments__attachment"
                                key={_image_index}
                              >
                                <button
                                  className="entry-primary__attachments__attachment__link"
                                  onClick={() => this.handleClick(_image_index)}
                                >
                                  <Image src={_image_src} />
                                </button>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </MediaQuery>

                    <div className="entry-primary__tags">
                      {post.tag.map((_tag_name, _tag_index) => {
                        return (
                          <div
                            className="entry-primary__tags__tag"
                            key={_tag_index}
                          >
                            <Link to={`/product/tag/${encodeURI(_tag_name)}`}>
                              {_tag_name}
                            </Link>
                          </div>
                        )
                      })}
                    </div>

                    <nav className="entry-primary__navi">
                      <ul className="entry-primary__navi__ul">
                        <li className="entry-primary__navi__ul__li">
                          {next && (
                            <Link
                              to={`/product/${next.alternative_id}`}
                              rel="next"
                            >
                              ← {next.title}
                            </Link>
                          )}
                        </li>
                        <li className="entry-primary__navi__ul__li">
                          {previous && (
                            <Link
                              to={`/product/${previous.alternative_id}`}
                              rel="prev"
                            >
                              {previous.title} →
                            </Link>
                          )}
                        </li>
                      </ul>
                    </nav>

                    <footer className="entry-primary__footer">
                      <Bio />
                    </footer>

                    <MediaQuery query="(max-width: 767px)">
                      {1 < post.attachment.length && (
                        <div className="entry-primary__attachments">
                          {post.attachment.map((_image_src, _image_index) => {
                            return (
                              <div
                                className="entry-primary__attachments__attachment"
                                key={_image_index}
                              >
                                <button
                                  className="entry-primary__attachments__attachment__link"
                                  onClick={() => this.handleClick(_image_index)}
                                >
                                  <Image src={_image_src} />
                                </button>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </MediaQuery>
                  </div>
                </div>
                <div className="entry__container--secondary">
                  <div className="entry-secondary">
                    <div className="entry-secondary__feature">
                      <Image src={feature} alt={post.title} />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </Layout>
    )
  }
}

export default ProductPostTemplate

export const pageQuery = graphql`
  query ProductPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    internalPosts(alternative_id: { eq: $slug }) {
      updated
      title
      category
      tag
      attachment
      link
      content
    }
  }
`
