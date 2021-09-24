// Global JSX
import React from "react"
import PreLoaded from "components/pre-loaded"

// Custom Typefaces
import "typeface-montserrat"
import "typeface-merriweather"

// Global CSS
import "prismjs/themes/prism.css"
import "styles/global.scss"
;(function () {
  // 100vh Fix
  document.documentElement.style.setProperty(
    "--maxvh",
    `${window.innerHeight}px`
  )

  // タッチデバイスでhoverを無効
  const touch =
    "ontouchstart" in document.documentElement ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0

  if (touch) {
    try {
      for (let si in document.styleSheets) {
        const styleSheet = document.styleSheets[si]

        if (!styleSheet.cssRules) continue

        for (let ri = styleSheet.cssRules.length - 1; ri >= 0; ri--) {
          if (!styleSheet.cssRules[ri].selectorText) continue

          if (styleSheet.cssRules[ri].selectorText.match(":hover")) {
            styleSheet.cssRules[ri].selectorText = styleSheet.cssRules[
              ri
            ].selectorText.replace(":hover", ":active")
          }
        }
      }
    } catch (ex) {}
  }
})()

// 全体をまとめる
export const wrapRootElement = ({ element }) => <PreLoaded>{element}</PreLoaded>
