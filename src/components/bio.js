import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { rhythm } from "utils/Typography"

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
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
        }
      }
    }
  `)

  const { author } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        marginTop: rhythm(1 / 2),
        marginBottom: rhythm(1 / 2),
      }}
    >
      <div
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          width: `50px`,
          height: `50px`,
          borderRadius: `100%`,
          overflow: `hidden`,
        }}
      >
        <GatsbyImage
          image={data.avatar.childImageSharp.gatsbyImageData}
          alt={author.name}
        />
      </div>
      <p style={{ marginBottom: 0, fontSize: `0.875rem` }}>
        <strong>{author.name}</strong>{" "}
        <span style={{ display: "inline-block" }}>{author.summary}</span>
        <br />
        <Link to={`/about`}>&rarr; Read about me.</Link>
      </p>
    </div>
  )
}

export default Bio
