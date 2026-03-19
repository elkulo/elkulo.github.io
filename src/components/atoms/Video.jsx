import React, { Component, createRef } from 'react'

/**
 * Video
 *
 * @class Video
 * @extends {Component}
 */
class Video extends Component {
  /**
   * constructor
   *
   * @param {object} props
   */
  constructor(props) {
    super(props)
    this.state = {
      src: props.src,
      thumbnail: props.thumbnail,
      alt: props.alt,
      width: props.width,
      height: props.height,
    }
    this.videoRef = createRef()
  }

  /**
   * レンダリング
   *
   * @return {JSX.Element}
   */
  render() {
    const { src, thumbnail, alt, width, height } = this.state

    return (
      <video
        className="video"
        autoPlay={true}
        loop={true}
        muted={true}
        playsInline={true}
        disablePictureInPicture={true}
        poster={thumbnail}
        ref={this.videoRef}
        preload="metadata"
        width={width}
        height={height}
      >
        <source src={src} type="video/mp4" />
        <img src={thumbnail} alt={alt} />
      </video>
    )
  }
}
export default Video
