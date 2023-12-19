/**
 * 100vhを固定
 *
 * @return {void}
 */
const Fix100vh = () => {
  const timer = {
    id: 0,
    delay: 1,
  }

  const setStyleProperty = () => {
    if (!timer.id) {
      timer.id = setTimeout(
        () => {
          document.documentElement.style.setProperty(
            '--maxvh',
            `${window.innerHeight}px`,
          )
          clearTimeout(timer.id)
          timer.id = 0
        },
        Math.floor(1000 * timer.delay),
      )
    }
  }

  window.addEventListener('resize', setStyleProperty, false)
  window.addEventListener('DOMContentLoaded', setStyleProperty, false)
}
export default Fix100vh
