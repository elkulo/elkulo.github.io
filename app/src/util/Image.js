import React from "react"
import GatsbyImage from "gatsby-image/withIEPolyfill"
import { StaticQuery, graphql } from "gatsby"

// 画像のURLを引数に取る
const Image = ({ src, alt }) => (
  <StaticQuery
    query={graphql`
      query {
        allFile(filter: { sourceInstanceName: { eq: "attachments" } }) {
          edges {
            node {
              id
              childImageSharp {
                fluid(cropFocus: NORTH, maxWidth: 2400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => {
      // 画像リストの中から、コンポーネント引数で指定したURLの画像を抽出する
      const targetEdge = data.allFile.edges.find((edge) => edge.node.id === src)

      // 画像が取得できた場合のみgatsby-imageのコンポーネントを返す
      return (
        targetEdge &&
        targetEdge.node.childImageSharp && (
          <GatsbyImage
            fluid={targetEdge.node.childImageSharp.fluid}
            alt={alt}
            fadeIn={true}
            durationFadeIn={1000}
          />
        )
      )
    }}
  />
)
export default Image
