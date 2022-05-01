import React from "react"
import { graphql, Link } from "gatsby"
import Head from "@/components/meta/head"
import BackToIcon from "@mui/icons-material/KeyboardBackspace"
import BackgroundImage from "@/assets/images/background/bg-404.jpg"
import styling from "@emotion/styled"

/**
 * Styled Components
 */
const Styled = {
  root: styling.div`
    display: flex;
    align-items: center;
    min-height: var(--maxvh, 100vh);
    background-image: url(${BackgroundImage});
    background-position: 30% 50%;
    background-size: cover;
    color: #eee;
    font-size: 10px;
    text-shadow: 0 0 1px #000;
  `,
  container: styling.div`
    padding: 0 1em;
    font-size: calc(100% + (1vw * 2.625));
  `,
  branding: styling.p`
    font-size: 0.875em;
    font-weight: 600;
    margin: 0;
    padding: 0;
  `,
  title: styling.h1`
    letter-spacing: -0.02em;
    font-size: 2em;
    font-weight: 900;
    color: #61d4e4;
    margin: 0;
  `,
  description: styling.p`
    font-size: 0.875em;
    font-weight: 600;
  `,
  content: styling.div`
    font-size: 0.675em;
    font-weight: 400;
  `,
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
    <Styled.root>
      <Head title={pageTitle} />
      <Styled.container>
        <Styled.branding>Oops...</Styled.branding>
        <Styled.title>404 NOT FOUND</Styled.title>
        <Styled.description>指定されたページが存在しません。</Styled.description>
        <Styled.content>
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
        </Styled.content>
      </Styled.container>
    </Styled.root>
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
