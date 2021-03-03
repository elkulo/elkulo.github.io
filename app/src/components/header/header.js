import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Navigation from "../navigation/main-navigation"
import NavigationDrawer from "utils/NavigationDrawer"
import OpenIcon from "@material-ui/icons/Notes"
import CloseIcon from "@material-ui/icons/Close"

/**
 * ヘッダー
 *
 * @param {*} { location, title, children }
 * @returns Header DOM
 */
const Header = ({ location = window.location, title, children, position }) => {
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

  // CSSクラスの付け替え
  let classes
  if (position === "content") {
    classes = `site-header--content`
  } else {
    classes = `site-header--sidebar`
  }

  const siteTitle = site.siteMetadata.title

  const rootPath = `${__PATH_PREFIX__}/`

  let branding

  // ルートかつサイドバーポジションのみ<h1>
  if (location.pathname === rootPath && position === "sidebar") {
    branding = <h1 className="site-branding__title site-title">{siteTitle}</h1>
  } else {
    branding = (
      <p className="site-branding__title site-title">
        <Link to={`/`}>{siteTitle}</Link>
      </p>
    )
  }

  return (
    <header className={`site-header ${classes}`}>
      <div className="wrap">
        <div className="site-header__container">
          <div className="site-header__container__primary">
            <div className="site-branding">{branding}</div>
          </div>
          {/* サイドバーポジションの場合 */}
          {position === "sidebar" && (
            <div className="site-header__container__secondary">
              <NavigationDrawer visibility="toggle">
                <CloseIcon />
              </NavigationDrawer>
            </div>
          )}
          {/* コンテンツポジションの場合 */}
          {position === "content" && (
            <div className="site-header__container__secondary">
              <NavigationDrawer visibility="toggle">
                <OpenIcon />
              </NavigationDrawer>
            </div>
          )}
        </div>
        {/* サイドバーポジションの場合 */}
        {position === "sidebar" && <Navigation />}
      </div>
    </header>
  )
}

export default Header
