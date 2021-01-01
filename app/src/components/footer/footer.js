import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import {
  NodeIcon,
  ReactIcon,
  GraphQLIcon,
  GatsbyIcon,
  GitHubIcon,
} from "assets/images/image"

/**
 * フッター
 *
 * @returns
 */
const Footer = ({ position }) => {
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
  } else {
    classes = `site-footer--sidebar`
  }

  const siteTitle = site.siteMetadata.title

  return (
    <footer className={`site-footer ${classes}`}>
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
        © 2019 - {new Date().getFullYear()} {siteTitle}, Built with {` `}
        <a
          href="https://www.gatsbyjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gatsby
        </a>{" "}
        and React.
      </div>
    </footer>
  )
}

export default Footer
