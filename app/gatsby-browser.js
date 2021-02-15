// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

// Global CSS
import "prismjs/themes/prism.css"
import "assets/scss/style.scss"

// 100vh Fix
const vhMaxFix = () => {
  const maxvh = window.innerHeight
  document.documentElement.style.setProperty("--maxvh", `${maxvh}px`)
}
window.addEventListener("load", vhMaxFix, false)
