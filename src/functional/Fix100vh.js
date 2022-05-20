/**
 * 100vhを固定
 *
 */
const Fix100vh = () => {
  document.documentElement.style.setProperty(
    "--maxvh",
    `${window.innerHeight}px`
  )
}
export default Fix100vh
