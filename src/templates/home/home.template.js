import React from 'react'
import { Link } from 'gatsby'
import Footer from '@/components/organisms/site-footer.component'
import NavigationDrawer from '@/components/molecules/navigation-drawer.component'
import Video from '@/components/atoms/Video'
import OpenIcon from '@mui/icons-material/Notes'
import {
  landscapeMP4 as MP4,
  landscapeJPG as thumbnail,
} from '@/assets/videos/video'
import styles from './home.module.scss'
import { LogoWhite } from '@/assets/images/image'

/**
 * ホームのテンプレート
 *
 * @param  {object} date
 * @param  {object} location
 * @return {JSX.Element}
 */
const HomeTemplate = ({ date, location }) => {
  const siteTitle = date.siteMetadata.title

  return (
    <div className="home">
      <article className={styles.splitLayout}>
        <div className={styles.splitLayout__left}>
          <div className={styles.splitLayout__left__in}>
            <header className={styles.header}>
              <div className={styles.header__drawer}>
                <NavigationDrawer visibility="toggle">
                  <OpenIcon />
                </NavigationDrawer>
              </div>
              <div className={styles.header__branding}>
                <div className={styles.header__branding__title}>
                  <img src={LogoWhite} alt={siteTitle} />
                </div>
              </div>
              <nav className={styles.header__navi}>
                <ul className={styles.header__navi__list}>
                  <li className={styles.header__navi__list__item}>
                    <Link to="/about">
                      <span>ABOUT</span>
                    </Link>
                  </li>
                  <li className={styles.header__navi__list__item}>
                    <Link to="/product">
                      <span>PRODUCT</span>
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className={styles.header__description}>
                <p>
                  <Link to="/contact">Contact us here.</Link>
                </p>
              </div>
            </header>
            <Footer location={location} position="sidebar" />
          </div>
        </div>
        <div className={styles.splitLayout__right}>
          <div className={styles.splitLayout__right__in}>
            <section className={styles.content}>
              <div className={styles.content__drawer}>
                <NavigationDrawer visibility="toggle">
                  <OpenIcon />
                </NavigationDrawer>
              </div>
              <div className={styles.content__branding}>
                <h1 className={styles.content__branding__title}>
                  <img src={LogoWhite} alt={siteTitle} />
                </h1>
              </div>
              <div className={styles.content__eyecatch}>
                <h2 className={styles.content__eyecatch__title}>Portfolio</h2>
                <Video src={MP4} thumbnail={thumbnail} alt="" />
              </div>
            </section>
          </div>
        </div>
      </article>
    </div>
  )
}
export default HomeTemplate
