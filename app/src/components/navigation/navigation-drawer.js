import React, { Component } from "react"
import EventListener from "react-event-listener"

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
   * リサイズイベント
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
        $root.classList.add("root__drawer--visible")
        break
      case "hidden":
        $root.classList.remove("root__drawer--visible")
        break
      default:
        $root.classList.toggle("root__drawer--visible")
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
        <EventListener target="window" onResize={() => this._onResize()} />
        <button
          className="navigation-drawer__button"
          onClick={() => this._onDrawer(visibility)}
        >
          {children}
        </button>
      </div>
    )
  }
}

export default NavigationDrawer
