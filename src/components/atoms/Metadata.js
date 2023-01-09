import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

/**
 * メタデータ
 *
 * @param  {*} title
 * @param  {*} description
 * @param  {*} children
 * @return {JSX.Element}
 */
const Metadata = ({ title: pageTitle, description, children }) => {
  // サイトデータの取得.
  const SiteMeta = () => {
    const { site } = useStaticQuery(graphql`
      query {
        site {
          siteMetadata {
            title
            description
            robots
            lang
          }
        }
      }
    `)
    return site.siteMetadata
  }

  const {
    title: siteTitle,
    description: siteDescription,
    robots,
    lang,
  } = SiteMeta()

  const meta = {
    title: pageTitle
      ? `${pageTitle} | ${siteTitle}`
      : `${siteTitle} - ${siteDescription}`,
    description: description || siteDescription,
    robots: robots,
    lang: lang,
  }

  return (
    <>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {children}
    </>
  )
}

export default Metadata
