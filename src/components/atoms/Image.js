import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useStaticQuery, graphql } from 'gatsby'

/**
 * Image
 *
 * @param {string} src 画像のURL
 * @param {string} alt 画像の説明
 * @return {JSX.Element}
 */
const Image = ({ src, alt = '' }) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "attachments" } }) {
        edges {
          node {
            id
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
      }
    }
  `)

  // 画像リストの中から、コンポーネント引数で指定したURLの画像を抽出.
  const targetEdge = data.allFile.edges.find(edge => edge.node.id === src)

  // 画像が取得できた場合のみgatsby-imageのコンポーネントを返却.
  return (
    targetEdge?.node.childImageSharp && (
      <GatsbyImage
        image={targetEdge.node.childImageSharp.gatsbyImageData}
        alt={alt}
      />
    )
  )
}

export default Image
