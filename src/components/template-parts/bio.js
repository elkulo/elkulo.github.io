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
        marginLeft: rhythm(-1 / 4),
        marginRight: rhythm(-1 / 4),
      }}
    >
      <div
        style={{
          marginRight: rhythm(1 / 4),
          flexBasic: `70px`,
          width: `70px`,
          height: `70px`,
          clipPath: `circle(30px at 50% 45%)`,
        }}
      >
        <GatsbyImage
          image={data.avatar.childImageSharp.gatsbyImageData}
          alt={author.name}
          style={{
            display: `block`,
            width: `100%`,
            height: `100%`,
          }}
        />
      </div>
      <div style={{ flex: `1`, fontSize: `0.875rem` }}>
        <strong>{author.name}</strong>{" "}
        <span style={{ display: "inline-block" }}>{author.summary}</span>
        <br />
        <Link to={`/about`}>&rarr; Read about me.</Link>
      </div>
    </div>
  )
}

export default Bio
