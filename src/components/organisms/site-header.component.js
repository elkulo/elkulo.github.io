import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import MainNavigation from '@/components/molecules/main-navigation.component'
import NavigationDrawer from '@/components/molecules/navigation-drawer.component'
import OpenIcon from '@mui/icons-material/Notes'
import CloseIcon from '@mui/icons-material/Close'
import styles from './site-header.module.scss'
import Wrap from '@/components/atoms/Wrap'
import { LogoBlack, LogoWhite } from '@/assets/images/image'

/**
 * ヘッダー
 *
 * @param  {*} location
 * @param  {*} position
 * @return {JSX.Element}
 */
const Header = ({ location = window.location, position }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  const siteTitle = site.siteMetadata.title

  const rootPath = `${__PATH_PREFIX__}/`

  let Brand = {
    main: (
      <p className={styles.branding__title}>
        <Link to={`/`}>
          <img src={LogoBlack} alt={siteTitle} />
        </Link>
      </p>
    ),
    sidebar: (
      <p className={styles.branding__title}>
        <Link to={`/`}>
          <img src={LogoWhite} alt={siteTitle} />
        </Link>
      </p>
    ),
  }

  // ルートかつサイドバーポジションのみ<h1>
  if (location.pathname === rootPath && position === 'sidebar') {
    Brand = {
      main: (
        <h1 className={styles.branding__title}>
          <img src={LogoWhite} alt={siteTitle} />
        </h1>
      ),
      sidebar: (
        <p className={styles.branding__title}>
          <img src={LogoWhite} alt={siteTitle} />
        </p>
      ),
    }
  }

  return (
    <header className="site-header">
      {position === 'sidebar' && (
        <div className={styles.sidebar}>
          <div className={styles.container}>
            <div className={styles.container__primary}>
              <div className={`${styles.branding} ${styles.brandingSidebar}`}>
                {Brand.sidebar}
              </div>
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
      {position === 'content' && (
        <Wrap>
          <div className={styles.container}>
            <div className={styles.container__primary}>
              <div className={`${styles.branding} ${styles.brandingContent}`}>
                {Brand.main}
              </div>
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
