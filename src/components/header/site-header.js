import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import MainNavigation from "../navigation/main-navigation"
import NavigationDrawer from "../navigation/navigation-drawer"
import OpenIcon from "@mui/icons-material/Notes"
import CloseIcon from "@mui/icons-material/Close"
import styles from "./site-header.module.scss"
import Wrap from "utils/Wrap"

/**
 * ヘッダー
 *
 * @param {*} { location, position }
 * @returns Header DOM
 */
const Header = ({ location = window.location, position }) => {
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
    branding = <h1 className={styles.branding__title}>{siteTitle}</h1>
  } else {
    branding = (
      <p className={styles.branding__title}>
        <Link to={`/`}>{siteTitle}</Link>
      </p>
    )
  }

  return (
    <header className="site-header">
      {position === "sidebar" && (
        <div className={styles.sidebar}>
          <div className={styles.container}>
            <div className={styles.container__primary}>
              <div className={styles.branding}>{branding}</div>
            </div>
            <div className={styles.container__secondary}>
              <NavigationDrawer visibility="hidden">
                <CloseIcon />
              </NavigationDrawer>
            </div>
          </div>
          <MainNavigation />
        </div>
      )}
      {position === "content" && (
        <Wrap>
          <div className={styles.container}>
            <div className={styles.container__primary}>
              <div className={styles.branding}>{branding}</div>
            </div>
            <div className={styles.container__secondary}>
              <NavigationDrawer visibility="toggle">
                <OpenIcon />
              </NavigationDrawer>
            </div>
          </div>
        </Wrap>
      )}
    </header>
  )
}

export default Header
