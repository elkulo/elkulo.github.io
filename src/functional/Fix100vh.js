/**
 * 100vhを固定
 *
 * @return {void}
 */
const Fix100vh = () => {
  document.documentElement.style.setProperty(
    '--maxvh',
    `${window.innerHeight}px`,
  )
}
export default Fix100vh
