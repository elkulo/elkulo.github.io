import { useRef } from 'react'
import { NodeIcon, ReactIcon, GitHubIcon } from '@/assets/images/image'
import {
  TransitionGroup,
  Transition as ReactTransition,
} from 'react-transition-group'
import styles from './site-footer.module.scss'

const siteTitle = 'el.kulo'

// アニメーション初期値
const timeout = 750
let getTransitionStyles = {}

/**
 * フッター
 *
 * @param {*} location
 * @param {*} position
 * @return {JSX.Element}
 */
const Footer = ({ location, position }) => {
  const nodeRef = useRef(null)
  let footerStyled

  if (position === 'content') {
    footerStyled = styles.content

    getTransitionStyles = {
      // マウント開始時
      entering: {
        transition: `padding ${timeout}ms ease-out, opacity ${timeout}ms ease-out`,
        opacity: 0,
        paddingTop: `10px`,
      },
      // マウント完了時
      entered: {
        transition: `padding ${timeout}ms ease-out, opacity ${timeout}ms ease-out`,
        opacity: 1,
        paddingTop: `0px`,
      },
      // アンマウント開始時
      exiting: {
        transition: `opacity ${timeout}ms ease-out`,
        opacity: 0,
        paddingTop: `0px`,
      },
      // アンマウント完了時
      exited: {
        opacity: 0,
        paddingTop: `10px`,
      },
    }
  } else {
    footerStyled = styles.sidebar

    // サイドバーの場合はアニメーションをリセット
    getTransitionStyles = {}
  }

  return (
    <footer className={`site-footer ${footerStyled}`}>
      <TransitionGroup>
        <ReactTransition
          key={location.pathname}
          nodeRef={nodeRef}
          appear={true}
          timeout={{
            enter: timeout,
            exit: timeout,
          }}
        >
          {status => (
            <div
              ref={nodeRef}
              style={{
                ...getTransitionStyles[status],
              }}
            >
              <div className={styles.powered}>
                <h2 className={styles.powered__title}>POWERED</h2>
                <ul className={styles.powered__list}>
                  <li className={styles.powered__list__item}>
                    <img src={NodeIcon} alt="Node.js" />
                    <div>Node.js</div>
                  </li>
                  <li className={styles.powered__list__item}>
                    <img src={ReactIcon} alt="React.js" />
                    <div>React</div>
                  </li>
                  <li className={styles.powered__list__item}>
                    <img src={GitHubIcon} alt="Github" />
                    <div>Github</div>
                  </li>
                </ul>
              </div>
              <div className={styles.info}>
                © 2020 - {new Date().getFullYear()} {siteTitle}, Built with{' '}
                {` `}
                <a
                  href="https://ja.reactjs.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  React
                </a>
                {' and '}
                <a
                  href="https://astro.build/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Astro
                </a>
                .
              </div>
            </div>
          )}
        </ReactTransition>
      </TransitionGroup>
    </footer>
  )
}

export default Footer
