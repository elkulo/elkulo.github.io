import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import {
  NodeIcon,
  ReactIcon,
  GraphQLIcon,
  GatsbyIcon,
  GitHubIcon,
} from "assets/images/image"
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group"

// アニメーション初期値
const timeout = 750
let getTransitionStyles = {}

/**
 * フッター
 *
 * @returns
 */
const Footer = ({ location, position }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  )

  let classes
  if (position === "content") {
    classes = `site-footer--content`

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
    classes = `site-footer--sidebar`

    // サイドバーの場合はアニメーションをリセット
    getTransitionStyles = {}
  }

  const siteTitle = site.siteMetadata.title

  return (
    <footer className={`site-footer ${classes}`}>
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
                ...getTransitionStyles[status],
              }}
            >
              <div className="site-footer__powered">
                <h2 className="site-footer__powered__title">POWERED</h2>
                <ul className="site-footer__powered__ul">
                  <li className="site-footer__powered__ul__li">
                    <img src={NodeIcon} alt="Node.js" />
                    <div>Node.js</div>
                  </li>
                  <li className="site-footer__powered__ul__li">
                    <img src={ReactIcon} alt="React.js" />
                    <div>React.js</div>
                  </li>
                  <li className="site-footer__powered__ul__li">
                    <img src={GatsbyIcon} alt="Gatsby.js" />
                    <div>Gatsby.js</div>
                  </li>
                  <li className="site-footer__powered__ul__li">
                    <img src={GraphQLIcon} alt="GraphQL" />
                    <div>GraphQL</div>
                  </li>
                  <li className="site-footer__powered__ul__li">
                    <img src={GitHubIcon} alt="Github" />
                    <div>Github</div>
                  </li>
                </ul>
              </div>
              <div className="site-footer__info">
                © 2019 - {new Date().getFullYear()} {siteTitle}, Built with{" "}
                {` `}
                <a
                  href="https://www.gatsbyjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Gatsby
                </a>{" "}
                and React.
              </div>
            </div>
          )}
        </ReactTransition>
      </TransitionGroup>
    </footer>
  )
}

export default Footer
