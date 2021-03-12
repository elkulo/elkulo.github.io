import React from "react"
import { Link } from "gatsby"
import Footer from "components/footer/site-footer"
import NavigationDrawer from "components/navigation/navigation-drawer"
import OpenIcon from "@material-ui/icons/Notes"
import Video from "utils/Video"
import {
  landscapeMP4 as MP4,
  landscapeJPG as thumbnail,
} from "assets/videos/video"
import styles from "./home.module.scss"

const HomeTemplate = ({ date, location }) => {
  const siteTitle = date.siteMetadata.title

  return (
    <div className="home">
      <article className={styles.layout}>
        <div className={styles.layout__left}>
          <div className={styles.layout__left__in}>
            <header className={styles.header}>
              <div className={styles.header__drawer}>
                <NavigationDrawer visibility="toggle">
                  <OpenIcon />
                </NavigationDrawer>
              </div>
              <div className={styles.header__branding}>
                <h1 className={`${styles.header__branding__title} site-title`}>
                  {siteTitle}
                </h1>
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
        <div className={styles.layout__right}>
          <div className={styles.layout__right__in}>
            <section className={styles.content}>
              <div className={styles.content__drawer}>
                <NavigationDrawer visibility="toggle">
                  <OpenIcon />
                </NavigationDrawer>
              </div>
              <div className={styles.content__branding}>
                <p className={`${styles.content__branding__title} site-title`}>
                  {siteTitle}
                </p>
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
