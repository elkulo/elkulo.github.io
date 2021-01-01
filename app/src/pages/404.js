import React from "react"
import { graphql, Link } from "gatsby"
import SEO from "../components/seo"
import BackToIcon from "@material-ui/icons/KeyboardBackspace"

const style = {
  container: {
    display: `flex`,
    alignItems: `center`,
    minHeight: `100vh`,
    background: `#e2eadf`,
    fontSize: `10px`, // 基準
  },
  wrap: {
    paddingLeft: `1em`,
    paddingRight: `1em`,
    fontSize: `calc(100% + (1vw * 2.625))`, // 倍率
  },
  branding: {
    fontSize: `0.75em`,
    fontWeight: `900`,
    margin: `0`,
    padding: `0`,
  },
  mainTitle: {
    letterSpacing: `-0.02em`,
    fontSize: `2em`,
    fontWeight: `900`,
    color: `#4cbd9b`,
    margin: `0`,
  },
  subTitle: {
    fontSize: `0.75em`,
    fontWeight: `600`,
  },
  content: {
    fontSize: `0.625em`,
    fontWeight: `300`,
  },
}

/**
 * 404 not found.
 *
 * @param {*} { data }
 * @returns DOM
 */
const NotFoundPage = ({ data }) => {
  const pageTitle = "404 File not found"

  const siteTitle = data.site.siteMetadata.title

  return (
    <div style={style.container}>
      <SEO title={pageTitle} />
      <div style={style.wrap}>
        <p style={style.branding}>{siteTitle}</p>
        <h1 style={style.mainTitle}>404 File not found</h1>
        <p style={style.subTitle}>指定されたページが存在しません。</p>
        <div style={style.content}>
          <p>
            大変申し訳ございませんが、お探しのページは削除されたか、
            <br />
            アドレスが間違っている可能性があります。
          </p>
          <BackToIcon style={{ fontSize: `1em`, color: `#4cbd9b` }} />
          <Link to="/" style={{ fontSize: `1em`, color: `#4cbd9b` }}>
            ホームに戻る
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
