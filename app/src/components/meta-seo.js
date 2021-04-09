import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

/**
 *　メタタイトルの設定
 *
 * @param {*} { description, lang, meta, title }
 * @returns react-helmet
 */
const MetaSEO = ({ description, lang, meta, title }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            robots
            verification
          }
        }
      }
    `
  )

  // titleがnullの場合、ホームのタイトルに切り替える
  const pageTitle = title || site.siteMetadata.description
  let titleFormat
  if (title) {
    titleFormat = `%s | ${site.siteMetadata.title}`
  } else {
    titleFormat = `${site.siteMetadata.title} | %s`
  }

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={pageTitle}
      titleTemplate={titleFormat}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `robots`,
          content: site.siteMetadata.robots, // 非公開サイト
        },
        {
          name: `google-site-verification`,
          content: site.siteMetadata.verification, // Google Search Console
        },
      ].concat(meta)}
    />
  )
}

MetaSEO.defaultProps = {
  lang: `ja`,
  meta: [],
  description: ``,
}

MetaSEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export default MetaSEO
