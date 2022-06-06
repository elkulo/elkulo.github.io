import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

/**
 * 作成者
 *
 * @return {JSX.Element}
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
        margin: `calc(1rem / 2) calc(1rem / -4)`,
      }}
    >
      <div
        style={{
          marginRight: `calc(1rem / 4)`,
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
        <strong>{author.name}</strong>{' '}
        <span style={{ display: 'inline-block' }}>{author.summary}</span>
        <br />
        <Link to={`/about`}>&rarr; Read about me.</Link>
      </div>
    </div>
  )
}

export default Bio
