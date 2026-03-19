import React, { Component } from 'react'
import PreviewIcon from '@mui/icons-material/Panorama'
import styles from './product-index.module.scss'
import Wrap from '@/components/atoms/Wrap'
import Image from '@/components/atoms/Image'
import Masonry from 'react-masonry-css'
import { baseUrl } from '@/lib/url'

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
      nodes: props.data.allPost.edges, // 投稿ノード.
      categories: props.data.allCategory.distinct, // カテゴリー名ノード.
      pageTitle: props.title, // ページタイトル.
      isProductType: props.isProductType, // テンプレート分岐.
      paged: 1, // 分割数
      posts_per_page: 12, // 分割する投稿数.
      max_posts: props.data.allPost.edges.length, // 投稿数.
      has_more: true, // もっと見る判定.
    }
    this.onMorePostsClick = this.onMorePostsClick.bind(this)
  }

  /**
   * ページ分割
   *
   */
  onMorePostsClick() {
    const { paged, posts_per_page, max_posts } = this.state

    this.setState({
      paged: paged + 1,
      has_more: false,
    })
    // もっと見るを遅延表示
    if (posts_per_page * paged < max_posts - posts_per_page) {
      this.setState({ has_more: true })
    }
  }

  /**
   * アップデート時
   *
   */
  componentDidMount() {
    const { posts_per_page, max_posts } = this.state

    // 規定数に満たない場合はもっと見るを非表示.
    if (posts_per_page > max_posts) {
      this.setState({ has_more: false })
    }
  }

  /**
   * レンダリング
   *
   * @return {JSX.Element}
   */
  render() {
    const {
      nodes,
      categories,
      pageTitle,
      isProductType,
      paged,
      posts_per_page,
      has_more,
    } = this.state

    // アーカイブタイプの判別
    let current =
      isProductType === 'index' || isProductType === 'tag'
        ? styles.product__categories__category__current
        : ''

    // 順番に表示.
    const addMotion = i => {
      const delay = 300 // 表示までの時間.

      // モバイルでは遅延を省略.
      if (
        typeof window === 'object' &&
        document.querySelector('#app')?.clientWidth <= 600
      ) {
        return {
          animationDelay: `${delay}ms`,
        }
      }
      return {
        animationDelay: `${Math.floor(i * delay)}ms`,
      }
    }

    return (
      <div className={styles.product}>
        <Wrap>
          <ul className={styles.product__categories}>
            <li
              className={`${styles.product__categories__category} ${current}`}
              key="ALL"
            >
              <a href={`${baseUrl()}product`}>ALL</a>
            </li>
            {categories.map((_cat_name, _cat_index) => {
              current =
                pageTitle === _cat_name
                  ? styles.product__categories__category__current
                  : ''
              return (
                <li
                  className={`${styles.product__categories__category} ${current}`}
                  key={_cat_index}
                >
                  <a
                    href={`${baseUrl()}product/category/${encodeURI(_cat_name)}`}
                  >
                    {_cat_name}
                  </a>
                </li>
              )
            })}
          </ul>

          {isProductType === 'tag' && (
            <div className={styles.product__tag}>
              <h2 className={styles.product__tag__title}>{pageTitle}</h2>
            </div>
          )}

          <Masonry
            breakpointCols={{ default: 3, 1024: 2, 640: 1 }}
            className={styles.product__entries}
            columnClassName={styles.product__entries__column}
          >
            {nodes.map(({ node }, i) => {
              const title = node.title || 'No title'

              // ページ分割
              if (i >= posts_per_page * paged) {
                return null
              }

              return (
                <section
                  className={styles.product__entries__entry}
                  key={node.id}
                >
                  <div
                    className={styles.product__entries__entry__motion}
                    style={addMotion(i - posts_per_page * (paged - 1))}
                  >
                    <div className={styles.product__entries__entry__feature}>
                      <a
                        href={`${baseUrl()}product/${node.fields.post_slug}`}
                        className={styles.featureLink}
                      >
                        <Image src={node.attachment[0]} alt={title} />
                        <span className={styles.featureLink__cover}>
                          <span className={styles.featureLink__cover__inner}>
                            <PreviewIcon />
                            Permalink
                          </span>
                        </span>
                      </a>
                    </div>
                    <header className={styles.product__entries__entry__header}>
                      <h3
                        className={
                          styles.product__entries__entry__header__title
                        }
                      >
                        <a
                          href={`${baseUrl()}product/${node.fields.post_slug}`}
                        >
                          {title}
                        </a>
                      </h3>
                      <div
                        className={styles.product__entries__entry__header__date}
                      >
                        Updated: {node.date}
                      </div>
                    </header>
                    <div className={styles.product__entries__entry__tags}>
                      {node.tag.map((_tag_name, _tag_index) => {
                        return (
                          <span
                            className={
                              styles.product__entries__entry__tags__tag
                            }
                            key={_tag_index}
                          >
                            <a
                              href={`${baseUrl()}product/tag/${encodeURI(_tag_name)}`}
                            >
                              {_tag_name}
                            </a>
                          </span>
                        )
                      })}
                    </div>
                  </div>
                </section>
              )
            })}
          </Masonry>
          {has_more && (
            <div className={styles.product__more}>
              <button
                onClick={this.onMorePostsClick}
                className={`${styles.product__more__button} button`}
              >
                もっと見る
              </button>
            </div>
          )}
        </Wrap>
      </div>
    )
  }
}

export default ProductTemplate
