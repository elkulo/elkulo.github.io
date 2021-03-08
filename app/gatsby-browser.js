// Global JSX
import React from "react"
import PreLoaded from "components/pre-loaded"

// Custom Typefaces
import "typeface-montserrat"
import "typeface-merriweather"

// Global CSS
import "prismjs/themes/prism.css"
import "assets/scss/style.scss"

// 100vh Fix
window.addEventListener(
  "load",
  () => {
    const maxvh = window.innerHeight
    document.documentElement.style.setProperty("--maxvh", `${maxvh}px`)
  },
  false
)

// Loading...
export const wrapRootElement = ({ element }) => <PreLoaded>{element}</PreLoaded>
