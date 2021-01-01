import React, { Component, createRef } from "react"

/**
 * Video.js
 *
 * @class Video
 * @extends {Component}
 */
class Video extends Component {
  constructor(props) {
    super(props)
    this.state = {
      src: props.src,
      thumbnail: props.thumbnail,
      alt: props.alt,
    }
    this.videoRef = createRef() // videoID
    this.videoTimerID = 0 // タイマーID
  }

  componentDidMount() {
    const { videoStatus } = this.props

    // sceneが0の場合は停止
    if (videoStatus && videoStatus.scene === 0) {
      this._pause()
    }
  }

  // スクロールが進んだ場合
  componentDidUpdate(prevProps) {
    const { videoStatus } = this.props
    if (prevProps.videoStatus !== videoStatus && this.videoTimerID === 0) {
      // シーンが進んでいる場合
      this._play()

      if (videoStatus.scene === 0) {
        this._pause()
      }

      if (videoStatus.timer) {
        this.videoTimerID = setTimeout(() => {
          this._pause()

          // タイマーリセット
          clearTimeout(this.videoTimerID)
          this.videoTimerID = 0
        }, videoStatus.timer)
      }
    }
  }

  // 動画の再生
  _play() {
    this.videoRef.current && this.videoRef.current.play()
  }

  // 動画の停止
  _pause() {
    this.videoRef.current && this.videoRef.current.pause()
  }

  render() {
    const { src, thumbnail, alt } = this.state

    return (
      <video
        className="video"
        autoPlay={true}
        loop={true}
        muted={true}
        disablePictureInPicture={true}
        poster={thumbnail}
        ref={this.videoRef}
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
        <img src={thumbnail} alt={alt} />
      </video>
    )
  }
}
export default Video
