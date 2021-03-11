// Global JSX
import React from "react"
import EventListener from "react-event-listener"
import PreLoaded from "components/pre-loaded"

// Custom Typefaces
import "typeface-montserrat"
import "typeface-merriweather"

// Global CSS
import "prismjs/themes/prism.css"
import "assets/scss/style.scss"

// 100vh Fix
let timer = 0
const addMaxVhFix = () => {
  if (timer > 0) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    document.documentElement.style.setProperty(
      "--maxvh",
      `${window.innerHeight}px`
    )
  }, 100)
}
addMaxVhFix()

// 全体をまとめる
export const wrapRootElement = ({ element }) => {
  return (
    <>
      <EventListener target="window" onResize={() => addMaxVhFix()} />
      <PreLoaded>{element}</PreLoaded>
    </>
  )
}
