import * as React from "react"
import App from "@/app"
import "typeface-montserrat"
import "typeface-merriweather"
import "normalize.css"
import "prismjs/themes/prism.css"
import "@/styles/global.scss"
import ConvertHover from "@/functional/ConvertHover"

// タッチデバイスでhoverアクションを無効.
ConvertHover()

export const wrapRootElement = ({ element }) => <App>{element}</App>
