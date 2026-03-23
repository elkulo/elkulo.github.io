import { useRef } from 'react'
import HomeLoader from '@/components/molecules/home-loader.component'
import PageLoader from '@/components/molecules/page-loader.component'
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
 * ホーム専用のレイアウト
 *
 * @param  {{location: object, children: object, isPageType: string}} props
 * @returns
 */
const HomeLayout = ({ location, children }) => {
  const nodeRef = useRef(null)

  return (
    <div className={`${styles.site} ${styles.pageHome}`}>
      <HomeLoader />
      <TransitionGroup>
        <ReactTransition
          nodeRef={nodeRef}
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

/**
 * 個別ページレイアウト
 *
 * @param  {{location: object, children: object, isPageType: string}} props
 * @returns
 */
const PageLayout = ({ location, children }) => {
  const nodeRef = useRef(null)

  return (
    <div className={styles.site}>
      <PageLoader />
      <div className={styles.site__sidebar}>
        <Header location={location} position="sidebar" />
      </div>
      <div className={styles.site__content}>
        <div className={styles.site__content__in}>
          <Header location={location} position="content" />
          <TransitionGroup>
            <ReactTransition
              key={location.pathname}
              nodeRef={nodeRef}
              appear={true}
              timeout={{
                enter: motion.timeout,
                exit: motion.timeout,
              }}
            >
              {status => (
                <div ref={nodeRef} style={transitionStyles.move[status]}>
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

/**
 * レイアウト
 *
 * @param  {{location: object, children: object, isPageType: string}} props
 * @return {JSX.Element}
 */
const Layout = props => {
  // Homeの場合分岐.
  return props?.isPageType === 'Home' ? (
    <HomeLayout {...props} />
  ) : (
    <PageLayout {...props} />
  )
}

export default Layout
