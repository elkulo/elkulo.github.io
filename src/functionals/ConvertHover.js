import { UAParser } from 'ua-parser-js'

/**
 * タッチデバイスでhoverを無効
 *
 * @return {void}
 */
const ConvertHover = () => {
  const touchDevice = /\b(iOS|iPad|Android)\b/

  if (touchDevice.test(UAParser().os.name)) {
    try {
      for (let si in document.styleSheets) {
        const styleSheet = document.styleSheets[si]

        if (!styleSheet.cssRules) continue

        for (let ri = styleSheet.cssRules.length - 1; ri >= 0; ri--) {
          if (!styleSheet.cssRules[ri].selectorText) continue

          if (styleSheet.cssRules[ri].selectorText.match(':hover')) {
            styleSheet.deleteRule(ri)
          }
        }
      }
    } catch (ex) {}
  }
}

export default ConvertHover
