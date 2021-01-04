import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Layout from "components/layout"
import Footer from "components/footer/footer"
import SEO from "components/seo"
import NavigationDrawer from "utils/NavigationDrawer"
import OpenIcon from "@material-ui/icons/Notes"
import Video from "utils/Video"
import {
  landscapeMP4 as MP4,
  landscapeJPG as thumbnail,
} from "assets/videos/video"

/**
 * インデックス
 *
 * @param {*} { data, location }
 * @returns Layout DOM
 */
const IndexPage = ({ location }) => {
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

  return (
    <Layout location={location} isPageType="Home">
      <SEO />
      <div className="home">
        <article className="home__split">
          <div className="home__split--left">
            <div className="home__split--left__inner">
              <header className="home__header">
                <NavigationDrawer visibility="toggle">
                  <OpenIcon />
                </NavigationDrawer>
                <div className="home__header__branding">
                  <h1 className="home__header__branding__title site-title">
                    {siteTitle}
                  </h1>
                </div>
                <nav className="home__header__navi">
                  <ul className="home__header__navi__ul">
                    <li className="home__header__navi__ul__li">
                      <Link to="/about">
                        <span>ABOUT</span>
                      </Link>
                    </li>
                    <li className="home__header__navi__ul__li">
                      <Link to="/product">
                        <span>PRODUCT</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
                <div className="home__header__description">
                  <p>
                    <Link to="/contact">Contact us here.</Link>
                  </p>
                </div>
              </header>
              <Footer position="sidebar" />
            </div>
          </div>
          <div className="home__split--right">
            <div className="home__split--right__inner">
              <section className="home__content">
                <NavigationDrawer visibility="toggle">
                  <OpenIcon />
                </NavigationDrawer>
                <div className="home__content__branding">
                  <p className="home__content__branding__title site-title">
                    {siteTitle}
                  </p>
                </div>
                <div className="home__content__eyecatch">
                  <h2 className="home__content__eyecatch__title">Portfolio.</h2>
                  <Video src={MP4} thumbnail={thumbnail} alt="" />
                </div>
              </section>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  )
}
export default IndexPage
