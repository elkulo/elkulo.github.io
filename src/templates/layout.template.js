import React from 'react'
import Header from '@/components/organisms/site-header.component'
import Footer from '@/components/organisms/site-footer.component'
import {
  TransitionGroup,
  Transition as ReactTransition,
} from 'react-transition-group'
import styles from './layout.module.scss'

// NOTE: product-index.template 以外で有効.
const motion = {
  timeout: 500, // モーション時間.
  delay: 200, // 表示までの時間.
}

const transitionStyles = {
  move: {
    // マウント開始時.
    entering: {
      opacity: 0,
      transform: `translate(0, 20px)`,
    },
    // マウント完了時 スタイルリセット.
    entered: {
      transition: `transform ${motion.timeout}ms ease-out,
                   opacity ${motion.timeout}ms ease-in`,
      opacity: 1,
      transform: `translate(0, 0)`,
    },
    // アンマウント開始時.
    exiting: {
      transition: `opacity ${motion.timeout}ms ease-in`,
      opacity: 0,
      transform: `translate(0, 0)`,
    },
    // アンマウント完了時.
    exited: {
      opacity: 0,
      transform: `translate(0, 20px)`,
    },
  },
  fade: {
    entering: {
      transition: `opacity ${motion.timeout}ms ease-in`,
      opacity: 1,
    },
    entered: {},
    exiting: {
      transition: `opacity ${motion.timeout}ms ease-in`,
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
 * @param  {{location: object, children: object, isPageType: string}} props
 * @return {JSX.Element}
 */
const Layout = ({ location, children, isPageType }) => {
  // Homeの場合.
  if (isPageType === 'Home') {
    return (
      <div className={`${styles.site} ${styles.pageHome}`}>
        <TransitionGroup>
          <ReactTransition
            key={location.pathname}
            appear={true}
            timeout={{
              enter: motion.timeout,
              exit: motion.timeout,
            }}
          >
            {status => (
              <div
                style={{
                  ...transitionStyles.fade[status],
                }}
              >
                <div className={styles.site__sidebar}>
                  <Header location={location} position="sidebar" />
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

  // Home以外の場合.
  return (
    <div className={styles.site}>
      <div className={styles.site__sidebar}>
        <Header location={location} position="sidebar" />
      </div>
      <div className={styles.site__content}>
        <div className={styles.site__content__in}>
          <Header location={location} position="content" />
          <TransitionGroup>
            <ReactTransition
              key={location.pathname}
              appear={true}
              timeout={{
                enter: motion.timeout,
                exit: motion.timeout,
              }}
            >
              {status => (
                <div
                  style={
                    /* Product以外で適用 */
                    isPageType === 'Product'
                      ? {}
                      : { ...transitionStyles.move[status] }
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
}

export default Layout
