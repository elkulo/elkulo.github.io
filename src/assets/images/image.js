/**
 * 画像を纏めて読み込む
 * ?url を付けて Astro の画像最適化パイプラインをバイパスし URL 文字列を取得する
 */
import LogoBlack from './logo/logo-black.png?url'
import LogoWhite from './logo/logo-white.png?url'
import NodeIcon from './icons/icon-node.png?url'
import ReactIcon from './icons/icon-react.png?url'
import GitHubIcon from './icons/icon-github.png?url'

export {
  LogoBlack,
  LogoWhite,
  NodeIcon,
  ReactIcon,
  GitHubIcon,
}
