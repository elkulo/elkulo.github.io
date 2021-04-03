import React, { Component } from "react"
import { Link } from "gatsby"
import Bio from "components/bio"
import Image from "utils/Image"
import MediaQuery from "react-responsive"
import LinkIcon from "@material-ui/icons/InsertLink"
import styles from "../product.module.scss"
import Wrap from "utils/Wrap"

/**
 *　プロダクトシングルページ
 *
 * @class ProductPostTemplate
 * @extends {Component}
 */
class ProductSingleTemplate extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    const { post, previous, next, feature } = this.state

    return (
      <div className={styles.single}>
        <Wrap>
          <article className={styles.single__entry}>
            <div className={styles.single__entry__container}>
              <div className={styles.single__entry__container__primary}>
                <div className={styles.single__primary}>
                  <div className={styles.single__primary__categories}>
                    <div className={styles.single__primary__categories__return}>
                      <Link to={`/product`} className="button">
                        ← リストへ戻る
                      </Link>
                    </div>

                    {post.category.map((_cat_name, _cat_index) => {
                      return (
                        <div
                          className={
                            styles.single__primary__categories__category
                          }
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

                  <header className={styles.single__primary__header}>
                    <h1 className={styles.single__primary__header__title}>
                      {!post.link && post.title}
                      {post.link && (
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={
                            styles.single__primary__header__title__link
                          }
                        >
                          {post.title}
                          <LinkIcon />
                        </a>
                      )}
                    </h1>
                    <div className={styles.single__primary__header__meta}>
                      Update: {post.updated}
                      {post.link && (
                        <span
                          className={
                            styles.single__primary__header__meta__preview
                          }
                        >
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
                    className={styles.single__primary__content}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  <MediaQuery query="(min-width: 768px)">
                    {1 < post.attachment.length && (
                      <div className={styles.single__primary__attachments}>
                        {post.attachment.map((_image_src, _image_index) => {
                          return (
                            <div
                              className={
                                styles.single__primary__attachments__attachment
                              }
                              key={_image_index}
                            >
                              <button
                                className={
                                  styles.single__primary__attachments__attachment__link
                                }
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

                  <div className={styles.single__primary__tags}>
                    {post.tag.map((_tag_name, _tag_index) => {
                      return (
                        <div
                          className={styles.single__primary__tags__tag}
                          key={_tag_index}
                        >
                          <Link to={`/product/tag/${encodeURI(_tag_name)}`}>
                            {_tag_name}
                          </Link>
                        </div>
                      )
                    })}
                  </div>

                  <nav className={styles.single__primary__navi}>
                    <ul className={styles.single__primary__navi__list}>
                      <li className={styles.single__primary__navi__list__item}>
                        {next && (
                          <Link
                            to={`/product/${next.alternative_id}`}
                            rel="next"
                          >
                            ← {next.title}
                          </Link>
                        )}
                      </li>
                      <li className={styles.single__primary__navi__list__item}>
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

                  <footer className={styles.single__primary__footer}>
                    <Bio />
                  </footer>

                  <MediaQuery query="(max-width: 767px)">
                    {1 < post.attachment.length && (
                      <div className={styles.single__primary__attachments}>
                        {post.attachment.map((_image_src, _image_index) => {
                          return (
                            <div
                              className={
                                styles.single__primary__attachments__attachment
                              }
                              key={_image_index}
                            >
                              <button
                                className={
                                  styles.single__primary__attachments__attachment__link
                                }
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
              <div className={styles.single__entry__container__secondary}>
                <div className={styles.single__secondary}>
                  <div className={styles.single__secondary__feature}>
                    <Image src={feature} alt={post.title} />
                  </div>
                </div>
              </div>
            </div>
          </article>
        </Wrap>
      </div>
    )
  }
}

export default ProductSingleTemplate
