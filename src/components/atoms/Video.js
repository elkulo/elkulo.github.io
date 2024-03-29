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
    this.videoRef = createRef() // videoID
    this.videoTimerID = 0 // タイマーID
  }

  /**
   * componentDidMount
   *
   * @return {void}
   */
  componentDidMount() {
    const { videoStatus } = this.props

    // sceneが0の場合は停止
    if (videoStatus && videoStatus.scene === 0) {
      this.pause()
    }
  }

  /**
   * componentDidUpdate
   *
   * @param {object} prevProps
   * @return {void}
   */
  componentDidUpdate(prevProps) {
    // スクロールが進んだ場合
    const { videoStatus } = this.props
    if (prevProps.videoStatus !== videoStatus && this.videoTimerID === 0) {
      // シーンが進んでいる場合
      this.play()

      if (videoStatus.scene === 0) {
        this.pause()
      }

      if (videoStatus.timer) {
        this.videoTimerID = setTimeout(() => {
          this.pause()

          // タイマーリセット
          clearTimeout(this.videoTimerID)
          this.videoTimerID = 0
        }, videoStatus.timer)
      }
    }
  }

  /**
   * 動画の再生
   *
   * @return {void}
   */
  play() {
    this.videoRef.current && this.videoRef.current.play()
  }

  /**
   * 動画の停止
   *
   * @return {void}
   */
  pause() {
    this.videoRef.current && this.videoRef.current.pause()
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
