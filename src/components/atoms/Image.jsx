/**
 * Image
 *
 * @param {string} src 画像のURL
 * @param {string} alt 画像の説明
 * @return {JSX.Element}
 */
const Image = ({ src, alt = '' }) => {
  if (!src) return null
  return (
    <img
      src={src}
      alt={alt}
      style={{ width: '100%', height: 'auto', display: 'block' }}
      loading="lazy"
    />
  )
}

export default Image
