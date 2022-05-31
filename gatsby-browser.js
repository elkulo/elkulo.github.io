import * as React from 'react'
import App from '@/app'
import 'typeface-montserrat'
import 'typeface-merriweather'
import 'normalize.css'
import 'prismjs/themes/prism.css'
import '@/styles/global.scss'
import Fix100vh from '@/functional/Fix100vh'
import ConvertHover from '@/functional/ConvertHover'

// 100vhを固定.
Fix100vh()

// タッチデバイスでhoverアクションを無効.
ConvertHover()

export const wrapRootElement = ({ element }) => <App>{element}</App>
