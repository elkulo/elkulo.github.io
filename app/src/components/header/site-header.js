import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import MainNavigation from "../navigation/main-navigation"
import NavigationDrawer from "../navigation/navigation-drawer"
import OpenIcon from "@material-ui/icons/Notes"
import CloseIcon from "@material-ui/icons/Close"
import styles from "./site-header.module.scss"

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

  const siteTitle = site.siteMetadata.title

  const rootPath = `${__PATH_PREFIX__}/`

  let branding

  // ルートかつサイドバーポジションのみ<h1>
  if (location.pathname === rootPath && position === "sidebar") {
    branding = (
      <h1 className={`${styles.branding__title} site-title`}>{siteTitle}</h1>
    )
  } else {
    branding = (
      <p className={`${styles.branding__title} site-title`}>
        <Link to={`/`}>{siteTitle}</Link>
      </p>
    )
  }

  return (
    <header className="site-header">
      <div className="wrap">
        <div className={styles.container}>
          <div className={styles.container__primary}>
            <div className={styles.branding}>{branding}</div>
          </div>
          {/* サイドバーポジションの場合 */}
          {position === "sidebar" && (
            <div className={styles.container__secondary}>
              <NavigationDrawer visibility="toggle">
                <CloseIcon />
              </NavigationDrawer>
            </div>
          )}
          {/* コンテンツポジションの場合 */}
          {position === "content" && (
            <div className={styles.container__secondary}>
              <NavigationDrawer visibility="toggle">
                <OpenIcon />
              </NavigationDrawer>
            </div>
          )}
        </div>
        {/* サイドバーポジションの場合 */}
        {position === "sidebar" && <MainNavigation />}
      </div>
    </header>
  )
}

export default Header
