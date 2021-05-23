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
const Fix100vh = () =>
  document.documentElement.style.setProperty(
    "--maxvh",
    `${window.innerHeight}px`
  )
Fix100vh()

// タッチデバイスでhoverを無効
const TouchActive = () => {
  const touch =
    "ontouchstart" in document.documentElement ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0

  if (touch) {
    try {
      for (let si in document.styleSheets) {
        const styleSheet = document.styleSheets[si]
        if (!styleSheet.rules) continue

        for (let ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
          if (!styleSheet.rules[ri].selectorText) continue

          if (styleSheet.rules[ri].selectorText.match(":hover")) {
            //styleSheet.deleteRule(ri)
            styleSheet.rules[ri].selectorText = styleSheet.rules[
              ri
            ].selectorText.replace(":hover", ":active")
          }
        }
      }
    } catch (ex) {}
  }
}
TouchActive()

// 全体をまとめる
export const wrapRootElement = ({ element }) => <PreLoaded>{element}</PreLoaded>
