import React, { Component } from 'react'
import { Link } from 'gatsby'
import LinkIcon from '@mui/icons-material/InsertLink'
import styles from './product-single.module.scss'
import Wrap from '@/components/atoms/Wrap'
import Image from '@/components/atoms/Image'
import Bio from '@/components/molecules/bio.component'
import LinearIndeterminate from '@/components/atoms/LinearIndeterminate'
import DummySite from '@/components/atoms/DummySite'

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
      node: props.data.internalPosts,
      previous: props.pageContext.previous,
      next: props.pageContext.next,
      feature: props.data.internalPosts.attachment[0],
      featureActiveID: 0,
      isFeatureLoad: false,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  /**
   * 画像の差し替え
   *
   * @param {number} id
   */
  async handleClick(id) {
    const { feature, isFeatureLoad } = this.state
    // 同一画像以外で非ロード中の場合のみ変更可.
    if (feature !== this.state.node.attachment[id] && !isFeatureLoad) {
      await this.setState({
        feature: this.state.node.attachment[id],
        featureActiveID: id,
        isFeatureLoad: true,
      })
      await setTimeout(() => this.setState({ isFeatureLoad: false }), 2000)
    }
  }

  /**
   * レンダリング
   *
   * @return {JSX.Element}
   */
  render() {
    const { node, previous, next, feature, featureActiveID, isFeatureLoad } =
      this.state

    return (
      <div className={styles.product}>
        <Wrap>
          <article id="___article" className={styles.product__entry}>
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

                    {node.category.map((_cat_name, _cat_index) => {
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
                      {!node.link && node.title}
                      {node.link && (
                        <a
                          href={node.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={
                            styles.product__primary__header__title__link
                          }
                        >
                          {node.title}
                          <LinkIcon />
                        </a>
                      )}
                    </h1>
                    <div className={styles.product__primary__header__date}>
                      Updated: {node.date}
                      {node.link && (
                        <span
                          className={
                            styles.product__primary__header__date__preview
                          }
                        >
                          Preview:
                          <a
                            href={node.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {node.link}
                          </a>
                        </span>
                      )}
                    </div>
                  </header>

                  <div
                    className={styles.product__primary__content}
                    dangerouslySetInnerHTML={{ __html: node.content }}
                  />

                  {1 < node.attachment.length && (
                    <div
                      className={`${styles.product__primary__attachments} ${styles.product__primary__attachmentsLarge}`}
                    >
                      {node.attachment.map((_image_src, _image_index) => {
                        return (
                          <div
                            className={
                              styles.product__primary__attachments__attached
                            }
                            key={_image_index}
                          >
                            {_image_index === featureActiveID &&
                              isFeatureLoad && <LinearIndeterminate />}
                            <a
                              href="#___article"
                              className={
                                styles.product__primary__attachments__attached__link
                              }
                              onClick={() => this.handleClick(_image_index)}
                            >
                              <Image src={_image_src} />
                            </a>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  <div className={styles.product__primary__tags}>
                    {node.tag.map((_tag_name, _tag_index) => {
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
                            to={`/product/${next.fields.post_slug}`}
                            rel="next"
                          >
                            ← {next.title}
                          </Link>
                        )}
                      </li>
                      <li className={styles.product__primary__navi__list__item}>
                        {previous && (
                          <Link
                            to={`/product/${previous.fields.post_slug}`}
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

                  {1 < node.attachment.length && (
                    <div
                      id="___attachments"
                      className={`${styles.product__primary__attachments} ${styles.product__primary__attachmentsSmall}`}
                    >
                      {node.attachment.map((_image_src, _image_index) => {
                        return (
                          <div
                            className={
                              styles.product__primary__attachments__attached
                            }
                            key={_image_index}
                          >
                            {_image_index === featureActiveID &&
                              isFeatureLoad && <LinearIndeterminate />}
                            <a
                              href="#___attachments"
                              className={
                                styles.product__primary__attachments__attached__link
                              }
                              onClick={() => this.handleClick(_image_index)}
                            >
                              <Image src={_image_src} />
                            </a>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.product__entry__container__secondary}>
                <div className={styles.product__secondary}>
                  <div className={styles.product__secondary__feature}>
                    {isFeatureLoad ? (
                      <DummySite />
                    ) : (
                      <Image src={feature} alt={node.title} />
                    )}
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
