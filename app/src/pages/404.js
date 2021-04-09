import React from "react"
import { graphql, Link } from "gatsby"
import SEO from "components/seo"
import BackToIcon from "@material-ui/icons/KeyboardBackspace"
import BackgroundImage from "assets/images/background/bg-404.jpg"

/**
 * Style
 */
const style = {
  root: {
    display: `flex`,
    alignItems: `center`,
    minHeight: `var(--maxvh, 100vh)`,
    backgroundImage: `url(${BackgroundImage})`,
    backgroundPosition: `30% 50%`,
    backgroundSize: `cover`,
    color: `#eee`,
    fontSize: `10px`, // 基準
    textShadow: `0 0 1px #000`,
  },
  wrap: {
    paddingLeft: `1em`,
    paddingRight: `1em`,
    fontSize: `calc(100% + (1vw * 2.625))`, // 倍率
  },
  branding: {
    fontSize: `0.875em`,
    fontWeight: `600`,
    margin: `0`,
    padding: `0`,
  },
  mainTitle: {
    letterSpacing: `-0.02em`,
    fontSize: `2em`,
    fontWeight: `900`,
    color: `#61d4e4`,
    margin: `0`,
  },
  subTitle: {
    fontSize: `0.875em`,
    fontWeight: `600`,
  },
  content: {
    fontSize: `0.675em`,
    fontWeight: `400`,
  },
}

/**
 * 404 NOT FOUND.
 *
 * @param {*} { data }
 * @returns DOM
 */
const NotFoundPage = ({ data }) => {
  const pageTitle = "404 NOT FOUND"

  const siteTitle = data.site.siteMetadata.title

  return (
    <div style={style.root}>
      <SEO title={pageTitle} />
      <div style={style.wrap}>
        <p style={style.branding}>Oops...</p>
        <h1 style={style.mainTitle}>404 NOT FOUND</h1>
        <p style={style.subTitle}>指定されたページが存在しません。</p>
        <div style={style.content}>
          <p>
            お探しのページは削除されたか、
            <br />
            アドレスが間違っている可能性があります。
          </p>
          <BackToIcon style={{ fontSize: `0.75em`, color: `#b6bdf2` }} />{" "}
          <Link
            to="/"
            style={{ fontSize: `0.875em`, color: `#b6bdf2`, boxShadow: `none` }}
          >
            {siteTitle} のホームに戻る
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
