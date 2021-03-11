import React, { Component } from "react"
import { Link } from "gatsby"
import Image from "utils/Image"
import PreviewIcon from "@material-ui/icons/Panorama"
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group"

const timeout = 500
const getTransitionStyles = {
  // マウント開始時
  entering: {
    opacity: 0,
    paddingTop: `10px`,
  },
  // マウント完了時
  entered: {
    transition: `padding ${timeout}ms ease-out, opacity ${timeout}ms ease-out`,
    opacity: 1,
    paddingTop: `0px`,
  },
  // アンマウント開始時
  exiting: {
    transition: `opacity ${timeout}ms ease-out`,
    opacity: 0,
    paddingTop: `0px`,
  },
  // アンマウント完了時
  exited: {
    opacity: 0,
    paddingTop: `10px`,
  },
}

/**
 * プロダクトのテンプレート
 *
 * @class ProductTemplate
 * @extends {Component}
 */
class ProductTemplate extends Component {
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
    }
    this.handleClick = this.handleClick.bind(this)
  }

  // ページ分割
  handleClick() {
    this.setState({ paged: this.state.paged + 1 })
  }

  render() {
    const {
      posts,
      categories,
      pageTitle,
      isProductType,
      paged,
      posts_per_page,
      max_posts,
    } = this.state

    // アーカイブタイプの判別
    let current =
      isProductType === "index" || isProductType === "tag" ? "current" : ""

    return (
      <div className="product">
        <div className="wrap">
          <ul className="product__categories">
            <li className="product__categories__category" key="ALL">
              <Link className={current} to={`/product`}>
                ALL
              </Link>
            </li>
            {categories.map((_cat_name, _cat_index) => {
              current = pageTitle === _cat_name ? "current" : ""
              return (
                <li className="product__categories__category" key={_cat_index}>
                  <Link
                    className={current}
                    to={`/product/category/${encodeURI(_cat_name)}`}
                  >
                    {_cat_name}
                  </Link>
                </li>
              )
            })}
          </ul>

          {isProductType === "tag" && (
            <div className="product__tag">
              <h2 className="product__tag__title">{pageTitle}</h2>
            </div>
          )}

          <article className="product__entries">
            {posts.map(({ node }, i) => {
              const post = node
              const title = post.title || post.alternative_id

              // ページ分割
              if (i >= posts_per_page * paged) {
                return null
              }

              return (
                <section className="entry" key={post.id}>
                  <TransitionGroup>
                    <ReactTransition
                      key={post.id}
                      appear={true}
                      timeout={{
                        enter: timeout,
                        exit: timeout,
                      }}
                    >
                      {(status) => (
                        <div
                          style={{
                            ...getTransitionStyles[status],
                          }}
                        >
                          <div className="entry__feature">
                            <Link to={`/product/${post.alternative_id}`}>
                              <Image src={post.attachment[0]} alt={title} />
                              <span className="entry__feature__link">
                                <span className="entry__feature__link__inner">
                                  <PreviewIcon />
                                  <br />
                                  Permalink
                                </span>
                              </span>
                            </Link>
                          </div>
                          <header className="entry__header">
                            <h3 className="entry__header__title">
                              <Link to={`/product/${post.alternative_id}`}>
                                {title}
                              </Link>
                            </h3>
                            <div className="entry__header__meta">
                              Updated: {post.updated}
                            </div>
                          </header>
                          <div className="entry__tags">
                            {post.tag.map((_tag_name, _tag_index) => {
                              return (
                                <span
                                  className="entry__tags__tag"
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
            {posts_per_page * paged < max_posts && (
              <div className="product__entries__more">
                <button
                  onClick={this.handleClick}
                  className="button product__entries__more__button"
                >
                  もっと見る
                </button>
              </div>
            )}
          </article>
        </div>
      </div>
    )
  }
}

export default ProductTemplate
