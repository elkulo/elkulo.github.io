import React, { Component } from "react"
import { Link } from "gatsby"
import MediaQuery from "react-responsive"
import LinkIcon from "@mui/icons-material/InsertLink"
import styles from "./product-single.module.scss"
import Wrap from "@/components/atoms/Wrap"
import Image from "@/components/atoms/Image"
import Bio from "@/components/molecules/bio.component"

/**
 *　プロダクトシングルページ
 *
 * @class ProductPostTemplate
 * @extends {Component}
 */
class ProductSingleTemplate extends Component {
  /**
   * constructor
   *
   * @param {object} props
   */
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

  /**
   * 画像の差し替え
   *
   * @param {number} i
   */
  handleClick(i) {
    this.setState({ feature: this.state.post.attachment[i] })
  }

  /**
   * レンダリング
   *
   */
  render() {
    const { post, previous, next, feature } = this.state

    return (
      <div className={styles.product}>
        <Wrap>
          <article className={styles.product__entry}>
            <div className={styles.product__entry__container}>
              <div className={styles.product__entry__container__primary}>
                <div className={styles.product__primary}>
                  <div className={styles.product__primary__categories}>
                    <div
                      className={styles.product__primary__categories__return}
                    >
                      <Link to={`/product`} className="button">
                        ← リストへ戻る
                      </Link>
                    </div>

                    {post.category.map((_cat_name, _cat_index) => {
                      return (
                        <div
                          className={
                            styles.product__primary__categories__category
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

                  <header className={styles.product__primary__header}>
                    <h1 className={styles.product__primary__header__title}>
                      {!post.link && post.title}
                      {post.link && (
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={
                            styles.product__primary__header__title__link
                          }
                        >
                          {post.title}
                          <LinkIcon />
                        </a>
                      )}
                    </h1>
                    <div className={styles.product__primary__header__date}>
                      Update: {post.updated}
                      {post.link && (
                        <span
                          className={
                            styles.product__primary__header__date__preview
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
                    className={styles.product__primary__content}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  <MediaQuery query="(min-width: 768px)">
                    {1 < post.attachment.length && (
                      <div className={styles.product__primary__attachments}>
                        {post.attachment.map((_image_src, _image_index) => {
                          return (
                            <div
                              className={
                                styles.product__primary__attachments__attachment
                              }
                              key={_image_index}
                            >
                              <button
                                className={
                                  styles.product__primary__attachments__attachment__link
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

                  <div className={styles.product__primary__tags}>
                    {post.tag.map((_tag_name, _tag_index) => {
                      return (
                        <div
                          className={styles.product__primary__tags__tag}
                          key={_tag_index}
                        >
                          <Link to={`/product/tag/${encodeURI(_tag_name)}`}>
                            {_tag_name}
                          </Link>
                        </div>
                      )
                    })}
                  </div>

                  <nav className={styles.product__primary__navi}>
                    <ul className={styles.product__primary__navi__list}>
                      <li className={styles.product__primary__navi__list__item}>
                        {next && (
                          <Link
                            to={`/product/${next.alternative_id}`}
                            rel="next"
                          >
                            ← {next.title}
                          </Link>
                        )}
                      </li>
                      <li className={styles.product__primary__navi__list__item}>
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

                  <footer className={styles.product__primary__footer}>
                    <Bio />
                  </footer>

                  <MediaQuery query="(max-width: 767px)">
                    {1 < post.attachment.length && (
                      <div className={styles.product__primary__attachments}>
                        {post.attachment.map((_image_src, _image_index) => {
                          return (
                            <div
                              className={
                                styles.product__primary__attachments__attachment
                              }
                              key={_image_index}
                            >
                              <button
                                className={
                                  styles.product__primary__attachments__attachment__link
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
              <div className={styles.product__entry__container__secondary}>
                <div className={styles.product__secondary}>
                  <div className={styles.product__secondary__feature}>
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
