/**
 * 動画を纏めて読み込む
 * ?url を付けて Astro の画像最適化パイプラインをバイパスし URL 文字列を取得する
 */
import landscapeMP4 from './landscape/landscape.mp4?url'
import landscapeJPG from './landscape/landscape.jpg?url'

export { landscapeMP4, landscapeJPG }
