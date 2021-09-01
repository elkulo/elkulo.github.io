import React, { Component } from "react"
import styles from "./navigation-drawer.module.scss"

/**
 * ナビゲーションのコンポーネント
 *
 * @class NavigationDrawer
 * @extends {Component}
 */
class NavigationDrawer extends Component {
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
   * @memberof NavigationDrawer
   */
  componentDidMount() {
    // ページ遷移で閉じる
    this._onDrawer("hidden")

    // ウィンド幅の初期値
    const wrapperWidth = document.querySelector("#___gatsby")
      ? document.querySelector("#___gatsby").clientWidth
      : this.state.rootWidth
    if (this.state.rootWidth !== wrapperWidth) {
      this.setState({
        rootWidth: wrapperWidth,
      })
    }
  }

  /**
   * リサイズイベント: 未使用
   *
   * @memberof NavigationDrawer
   */
  _onResize() {
    if (this.state.timer > 0) {
      clearTimeout(this.state.timer)
    }

    // ウィンド幅が変更された場合
    const wrapperWidth = document.querySelector("#___gatsby")
      ? document.querySelector("#___gatsby").clientWidth
      : this.state.rootWidth
    if (this.state.rootWidth !== wrapperWidth) {
      this.setState({
        rootWidth: wrapperWidth,
        timer: setTimeout(() => {
          this._onDrawer("hidden")
        }, 100),
      })
    }
  }

  /**
   * root要素にクラスの付け替え
   *
   * @param {string} [type="toggle"]
   * @memberof NavigationDrawer
   */
  _onDrawer(type = "toggle") {
    const $root = document.querySelector("#___gatsby")

    switch (type) {
      case "visible":
        $root.classList.add("root-drawer--visible")
        break
      case "hidden":
        $root.classList.remove("root-drawer--visible")
        $root.classList.add("root-drawer--visible--end")
        setTimeout(
          () => $root.classList.remove("root-drawer--visible--end"),
          200
        )
        break
      default:
        $root.classList.toggle("root-drawer--visible")
    }
  }

  /**
   * DOMの生成
   *
   * @returns
   * @memberof NavigationDrawer
   */
  render() {
    const { visibility, children } = this.props

    return (
      <div className="navigation-drawer">
        <button
          className={styles.button}
          onClick={() => this._onDrawer(visibility)}
        >
          {children}
        </button>
      </div>
    )
  }
}

export default NavigationDrawer
