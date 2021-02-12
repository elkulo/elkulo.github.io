import React from "react"
import Header from "./header/header"
import Footer from "./footer/footer"
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group"

const timeout = 380
const getTransitionStyles = {
  typeA: {
    // マウント開始時
    entering: {
      transition: `padding ${timeout}ms ease-out, opacity ${
        timeout * 2
      }ms ease-out`,
      opacity: 0,
      paddingTop: `10px`,
    },
    // マウント完了時
    entered: {
      transition: `padding ${timeout}ms ease-out, opacity ${
        timeout * 2
      }ms ease-out`,
      opacity: 1,
      paddingTop: `0px`,
    },
    // アンマウント開始時
    exiting: {
      transition: `opacity ${timeout * 2}ms ease-out`,
      opacity: 0,
      paddingTop: `0px`,
    },
    // アンマウント完了時
    exited: {
      opacity: 0,
      paddingTop: `10px`,
    },
  },
  typeB: {
    entering: {
      transition: `opacity ${timeout * 2}ms ease-out`,
      opacity: 0,
    },
    entered: {
      transition: `opacity ${timeout * 2}ms ease-out`,
      opacity: 1,
    },
    exiting: {
      transition: `opacity ${timeout * 2}ms ease-out`,
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
          <div className="site__content--effect">
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
                    style={{
                      ...getTransitionStyles.typeA[status],
                    }}
                  >
                    <main className="site-main">{children}</main>
                  </div>
                )}
              </ReactTransition>
            </TransitionGroup>
            <Footer position="content" />
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
                  ...getTransitionStyles.typeB[status],
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
                  <div className="site__content--effect">
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
