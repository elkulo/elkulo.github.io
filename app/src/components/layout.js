import React from "react"
import Header from "./header/header"
import Footer from "./footer/footer"

/**
 * レイアウト
 *
 * @param {*} { location, title, children, isPageType }
 * @returns ReactDOM
 */
const Layout = ({
  location = window.location,
  title,
  children,
  isPageType,
}) => {
  const rootPath = `${__PATH_PREFIX__}/`

  // 可変サイズ
  let hasHeader = true

  // CSSクラスの付与
  let classss = `site `
  switch (isPageType) {
    case "About":
      classss = classss + "page-about"
      break
    case "Contact":
      classss = classss + "page-contact"
      break
    case "Product":
      classss = classss + "page-product"
      break
    case "ProductPost":
      classss = classss + "page-product-post"
      break
    default:
      if (location.pathname === rootPath) {
        classss = classss + "page-home"
        hasHeader = false
      }
  }

  if (hasHeader) {
    return (
      <div className={classss}>
        <div className="site__sidebar">
          <Header
            location={location}
            title={title}
            children={children}
            position="sidebar"
          />
        </div>
        <div className="site__content">
          <div className="site__content--effect">
            <Header
              location={location}
              title={title}
              children={children}
              position="content"
            />
            <main className="site-main">{children}</main>
            <Footer position="content" />
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className={classss}>
        <div className="site__sidebar">
          <Header
            location={location}
            title={title}
            children={children}
            position="sidebar"
          />
        </div>
        <div className="site__content">
          <div className="site__content--effect">
            <main className="site-main">{children}</main>
          </div>
        </div>
      </div>
    )
  }
}

export default Layout
