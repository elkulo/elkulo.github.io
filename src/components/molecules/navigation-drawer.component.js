import React, { Component } from 'react'
import styles from './navigation-drawer.module.scss'

/**
 * ナビゲーションのコンポーネント
 *
 * @class NavigationDrawer
 * @extends {Component}
 */
class NavigationDrawer extends Component {
  /**
   * constructor
   *
   * @param {object} props
   */
  constructor(props) {
    super(props)
    this.state = {
      rootWidth: 0,
      timer: 0,
    }
  }

  /**
   * 再マウントでリセット
   *
   */
  componentDidMount() {
    // ページ遷移で閉じる
    this.onDrawer('hidden')

    // ウィンド幅の初期値
    const wrapperWidth = document.querySelector('#___gatsby')
      ? document.querySelector('#___gatsby').clientWidth
      : this.state.rootWidth
    if (this.state.rootWidth !== wrapperWidth) {
      this.setState({
        rootWidth: wrapperWidth,
      })
    }
  }

  /**
   * メニューの開閉
   *
   * root要素にクラスの付け替え
   *
   * @param {string} type
   */
  onDrawer(type = 'toggle') {
    const $root = document.querySelector('#___gatsby')

    switch (type) {
      case 'visible':
        $root.classList.add('root-drawer--visible')
        break
      case 'hidden':
        $root.classList.remove('root-drawer--visible')
        $root.classList.add('root-drawer--visible--end')
        setTimeout(
          () => $root.classList.remove('root-drawer--visible--end'),
          200
        )
        break
      default:
        $root.classList.toggle('root-drawer--visible')
    }
  }

  /**
   * DOMの生成
   *
   */
  render() {
    const { visibility, children } = this.props

    return (
      <div className="navigation-drawer">
        <button
          className={styles.button}
          onClick={() => this.onDrawer(visibility)}
        >
          {children}
        </button>
      </div>
    )
  }
}

export default NavigationDrawer
