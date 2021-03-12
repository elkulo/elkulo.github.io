// Global JSX
import React from "react"
import PreLoaded from "components/pre-loaded"

// Custom Typefaces
import "typeface-montserrat"
import "typeface-merriweather"

// Global CSS
import "prismjs/themes/prism.css"
import "styles/global.scss"

// 100vh Fix
const addMaxVhFix = () =>
  document.documentElement.style.setProperty(
    "--maxvh",
    `${window.innerHeight}px`
  )
addMaxVhFix()

// 全体をまとめる
export const wrapRootElement = ({ element }) => <PreLoaded>{element}</PreLoaded>
