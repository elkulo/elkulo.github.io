import React, { Component } from "react"
import { Link } from "gatsby"
import Image from "@/components/utils/Image"
import PreviewIcon from "@mui/icons-material/Panorama"
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group"
import styles from "./product-index.module.scss"
import Wrap from "@/components/utils/Wrap"
import Masonry from "react-masonry-component"

/**
 * プロダクトのテンプレート
 *
 * @class ProductTemplate
 * @extends {Component}
 */
class ProductTemplate extends Component {
  /**
   * constructor
   *
   * @param {object} props
   */
  constructor(props) {
    super(props)
    this.state = {
      posts: props.data.allPost.edges, // 投稿ノード
      categories: props.data.allCategory.distinct, // カテゴリー名ノード
      pageTitle: props.title, // ページタイトル
      isProductType: props.isProductType, // テンプレート分岐
      paged: 1, // 分割数
      posts_per_page: 12, // 分割する投稿数
      max_posts: props.data.allPost.edges.length, // 投稿数
      has_more: true, // もっと見る判定
      showMoveTime: 300, // 表示までの時間
    }
    this.onMorePostsClick = this.onMorePostsClick.bind(this)
  }

  /**
   * 読み込みアクション
   *
   * @param {string} status
   * @param {number}  delay
   */
  getTransitionStyles(status, delay) {
    const { showMoveTime } = this.state

    // NoSSR時に画面サイズで分岐
    const $wrapper =
      typeof window === "object" ? document.querySelector("#___gatsby") : 0
    let TransformCSS = `transform ${showMoveTime}ms ease-out ${
      delay * showMoveTime
    }ms, opacity ${showMoveTime}ms ease-in ${delay * showMoveTime}ms`
    if ($wrapper && $wrapper.clientWidth <= 600) {
      TransformCSS = `transform ${showMoveTime}ms ease-out, opacity ${showMoveTime}ms ease-in`
    }

    // アクションタイミング
    switch (status) {
      case "entering":
        return {
          opacity: 0,
          transform: `translate(0, 10px)`,
        }
      case "entered":
        return {
          transition: TransformCSS,
          opacity: 1,
          transform: `translate(0, 0)`,
        }
      case "exiting":
        return {
          transition: `opacity ${showMoveTime}ms ease-in`,
          opacity: 0,
          transform: `translate(0, 0)`,
        }
      case "exited":
        return {
          opacity: 0,
          transform: `translate(0, 10px)`,
        }
      default:
        return {
          opacity: 1,
          transform: `translate(0, 0)`,
        }
    }
  }

  /**
   * ページ分割
   *
   */
  async onMorePostsClick() {
    await this.setState({
      paged: this.state.paged + 1,
      has_more: false,
    })
    // もっと見るを遅延表示
    if (this.state.posts_per_page * this.state.paged < this.state.max_posts) {
      await this.setState({ has_more: true })
    }
  }

  /**
   * レンダリング
   *
   */
  render() {
    const {
      posts,
      categories,
      pageTitle,
      isProductType,
      paged,
      posts_per_page,
      has_more,
      showMoveTime,
    } = this.state

    // アーカイブタイプの判別
    let current =
      isProductType === "index" || isProductType === "tag"
        ? styles.product__categories__category__current
        : ""

    return (
      <div className={styles.product}>
        <Wrap>
          <ul className={styles.product__categories}>
            <li
              className={`${styles.product__categories__category} ${current}`}
              key="ALL"
            >
              <Link to={`/product`}>ALL</Link>
            </li>
            {categories.map((_cat_name, _cat_index) => {
              current =
                pageTitle === _cat_name
                  ? styles.product__categories__category__current
                  : ""
              return (
                <li
                  className={`${styles.product__categories__category} ${current}`}
                  key={_cat_index}
                >
                  <Link to={`/product/category/${encodeURI(_cat_name)}`}>
                    {_cat_name}
                  </Link>
                </li>
              )
            })}
          </ul>

          {isProductType === "tag" && (
            <div className={styles.product__tag}>
              <h2 className={styles.product__tag__title}>{pageTitle}</h2>
            </div>
          )}

          <Masonry
            className={styles.product__entries}
            elementType={"div"}
            options={{ percentPosition: true }}
            disableImagesLoaded={true}
            updateOnEachImageLoad={true}
          >
            {posts.map(({ node }, i) => {
              const post = node
              const title = post.title || post.alternative_id

              // ページ分割
              if (i >= posts_per_page * paged) {
                return null
              }

              return (
                <section
                  className={styles.product__entries__entry}
                  key={post.id}
                >
                  <TransitionGroup>
                    <ReactTransition
                      key={post.id}
                      appear={true}
                      timeout={{
                        enter: showMoveTime,
                        exit: showMoveTime,
                      }}
                    >
                      {status => (
                        <div
                          style={{
                            ...this.getTransitionStyles(
                              status,
                              i - posts_per_page * (paged - 1)
                            ),
                          }}
                        >
                          <div
                            className={styles.product__entries__entry__feature}
                          >
                            <Link to={`/product/${post.alternative_id}`}>
                              <Image src={post.attachment[0]} alt={title} />
                              <span
                                className={
                                  styles.product__entries__entry__feature__link
                                }
                              >
                                <span
                                  className={
                                    styles.product__entries__entry__feature__link__inner
                                  }
                                >
                                  <PreviewIcon />
                                  <br />
                                  Permalink
                                </span>
                              </span>
                            </Link>
                          </div>
                          <header
                            className={styles.product__entries__entry__header}
                          >
                            <h3
                              className={
                                styles.product__entries__entry__header__title
                              }
                            >
                              <Link to={`/product/${post.alternative_id}`}>
                                {title}
                              </Link>
                            </h3>
                            <div
                              className={
                                styles.product__entries__entry__header__date
                              }
                            >
                              Updated: {post.updated}
                            </div>
                          </header>
                          <div className={styles.product__entries__entry__tags}>
                            {post.tag.map((_tag_name, _tag_index) => {
                              return (
                                <span
                                  className={
                                    styles.product__entries__entry__tags__tag
                                  }
                                  key={_tag_index}
                                >
                                  <Link
                                    to={`/product/tag/${encodeURI(_tag_name)}`}
                                  >
                                    {_tag_name}
                                  </Link>
                                </span>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </ReactTransition>
                  </TransitionGroup>
                </section>
              )
            })}
          </Masonry>
          {has_more && (
            <TransitionGroup>
              <ReactTransition
                key="more"
                appear={true}
                timeout={{
                  enter: showMoveTime,
                  exit: showMoveTime,
                }}
              >
                {status => (
                  <div
                    style={{
                      ...this.getTransitionStyles(status, posts_per_page),
                    }}
                  >
                    <div className={styles.product__more}>
                      <button
                        onClick={this.onMorePostsClick}
                        className={`${styles.product__more__button} button`}
                      >
                        もっと見る
                      </button>
                    </div>
                  </div>
                )}
              </ReactTransition>
            </TransitionGroup>
          )}
        </Wrap>
      </div>
    )
  }
}

export default ProductTemplate
