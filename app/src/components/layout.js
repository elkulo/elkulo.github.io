import React from "react"
import Header from "./header/site-header"
import Footer from "./footer/site-footer"
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group"

const timeout = 500
const getTransitionStyles = {
  pageStyle: {
    // マウント開始時
    entering: {
      transition: `transform ${timeout}ms ease-out, opacity ${timeout}ms ease-out`,
      opacity: 1,
      transform: `translate(0px, 0px)`,
    },
    // マウント完了時 スタイルリセット
    entered: {},
    // アンマウント開始時
    exiting: {
      transition: `opacity ${timeout}ms ease-out`,
      opacity: 0,
      transform: `translate(0px, 0px)`,
    },
    // アンマウント完了時
    exited: {
      opacity: 0,
      transform: `translate(0, 10px)`,
    },
  },
  homeStyle: {
    entering: {
      transition: `opacity ${timeout}ms ease-out`,
      opacity: 1,
    },
    entered: {},
    exiting: {
      transition: `opacity ${timeout}ms ease-out`,
      opacity: 0,
    },
    exited: {
      opacity: 0,
    },
  },
}

/**
 * レイアウト
 *
 * @param {*} { location, title, children, isPageType }
 * @returns ReactDOM
 */
const Layout = ({
  location = window.location,
  title,
  children,
  isPageType,
}) => {
  const rootPath = `${__PATH_PREFIX__}/`

  // 可変サイズ
  let hasHeader = true

  // CSSクラスの付与
  let classss = `site `
  switch (isPageType) {
    case "About":
      classss = classss + "page-about"
      break
    case "Contact":
      classss = classss + "page-contact"
      break
    case "Product":
      classss = classss + "page-product"
      break
    case "ProductPost":
      classss = classss + "page-product-post"
      break
    default:
      if (location.pathname === rootPath) {
        classss = classss + "page-home"
        hasHeader = false
      }
  }

  if (hasHeader) {
    return (
      <div className={classss}>
        <div className="site__sidebar">
          <Header
            location={location}
            title={title}
            children={children}
            position="sidebar"
          />
        </div>
        <div className="site__content">
          <div className="site__content__effect">
            <Header
              location={location}
              title={title}
              children={children}
              position="content"
            />
            <TransitionGroup>
              <ReactTransition
                key={location.pathname}
                appear={true}
                timeout={{
                  enter: timeout,
                  exit: timeout,
                }}
              >
                {(status) => (
                  <div
                    style={
                      /* Product以外で適用 */
                      isPageType !== "Product"
                        ? { ...getTransitionStyles.pageStyle[status] }
                        : {}
                    }
                  >
                    <main className="site-main">{children}</main>
                  </div>
                )}
              </ReactTransition>
            </TransitionGroup>
            <Footer location={location} position="content" />
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className={classss}>
        <TransitionGroup>
          <ReactTransition
            key={location.pathname}
            appear={true}
            timeout={{
              enter: timeout,
              exit: timeout,
            }}
          >
            {(status) => (
              <div
                style={{
                  ...getTransitionStyles.homeStyle[status],
                }}
              >
                <div className="site__sidebar">
                  <Header
                    location={location}
                    title={title}
                    children={children}
                    position="sidebar"
                  />
                </div>
                <div className="site__content">
                  <div className="site__content__effect">
                    <main className="site-main">{children}</main>
                  </div>
                </div>
              </div>
            )}
          </ReactTransition>
        </TransitionGroup>
      </div>
    )
  }
}

export default Layout
