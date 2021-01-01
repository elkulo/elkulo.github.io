import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

/**
 * 作成者
 *
 * @returns Bio DOM
 */
const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-avatar.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            instagram
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        marginTop: rhythm(1 / 2),
        marginBottom: rhythm(1 / 2),
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p style={{ marginBottom: 0 }}>
        Written by <strong>{author.name}</strong> {author.summary}
        <br />
        <a
          href={`https://www.instagram.com/${social.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          &rarr; Follow me on Instagram
        </a>
      </p>
    </div>
  )
}

export default Bio
