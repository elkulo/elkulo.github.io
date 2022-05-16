import { UAParser } from "ua-parser-js"

const ConvertHover = () => {
  // 100vh Fix
  document.documentElement.style.setProperty(
    "--maxvh",
    `${window.innerHeight}px`
  )

  // タッチデバイスでhoverを無効
  const touchDevice = /\b(iOS|iPad|Android)\b/

  if (touchDevice.test(UAParser().os.name)) {
    try {
      for (let si in document.styleSheets) {
        const styleSheet = document.styleSheets[si]

        if (!styleSheet.cssRules) continue

        for (let ri = styleSheet.cssRules.length - 1; ri >= 0; ri--) {
          if (!styleSheet.cssRules[ri].selectorText) continue

          if (styleSheet.cssRules[ri].selectorText.match(":hover")) {
            styleSheet.deleteRule(ri)
          }
        }
      }
    } catch (ex) {}
  }
}

export default ConvertHover
