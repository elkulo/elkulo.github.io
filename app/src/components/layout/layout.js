import React from "react"
import Header from "../header/site-header"
import Footer from "../footer/site-footer"
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group"
import styles from "./layout.module.scss"

const timeout = 500
const getTransitionStyles = {
  moveStyle: {
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
  fadeStyle: {
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
  // CSSクラスの付与
  let siteStyled = styles.site
  let hasHeader = true
  if (location.pathname === `${__PATH_PREFIX__}/`) {
    siteStyled = `${siteStyled} ${styles.pageHome}`
    hasHeader = false
  }

  if (hasHeader) {
    return (
      <div className={siteStyled}>
        <div className={styles.site__sidebar}>
          <Header
            location={location}
            title={title}
            children={children}
            position="sidebar"
          />
        </div>
        <div className={styles.site__content}>
          <div className={styles.site__content__in}>
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
                      isPageType === "Product"
                        ? {}
                        : { ...getTransitionStyles.moveStyle[status] }
                    }
                  >
                    <main>{children}</main>
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
      <div className={siteStyled}>
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
                  ...getTransitionStyles.fadeStyle[status],
                }}
              >
                <div className={styles.site__sidebar}>
                  <Header
                    location={location}
                    title={title}
                    children={children}
                    position="sidebar"
                  />
                </div>
                <div className={styles.site__content}>
                  <div className={styles.site__content__in}>
                    <main>{children}</main>
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
