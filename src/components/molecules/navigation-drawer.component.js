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
   * 再マウントでリセット
   *
   * @return {void}
   */
  componentDidMount() {
    // ページ遷移で閉じる
    this.onDrawer('hidden')
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
        new Promise(async resolve => {
          await $root.classList.remove('root-drawer--visible')
          await $root.classList.add('root-drawer--visible--end')
          await resolve('')
        }).then(() => {
          return setTimeout(() => {
            $root.classList.remove('root-drawer--visible--end')
          }, 200)
        })
        break
      default:
        $root.classList.toggle('root-drawer--visible')
    }
  }

  /**
   * DOMの生成
   *
   * @return {JSX.Element}
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
