import React from "react"
import { Link } from "gatsby"
import HomeIcon from "@mui/icons-material/Home"
import AboutIcon from "@mui/icons-material/Person"
import ProductIcon from "@mui/icons-material/Grain"
import ContactIcon from "@mui/icons-material/Send"
import thumbnail from "assets/videos/landscape/landscape.jpg"
import styles from "./main-navigation.module.scss"

const naviList = [
  {
    ident: encodeURI("home"),
    name: "HOME",
    url: "/",
    icon: () => <HomeIcon />,
  },
  {
    ident: encodeURI("about"),
    name: "ABOUT",
    url: "/about",
    icon: () => <AboutIcon />,
  },
  {
    ident: encodeURI("product"),
    name: "PRODUCT",
    url: "/product",
    icon: () => <ProductIcon />,
  },
  {
    ident: encodeURI("contact"),
    name: "CONTACT",
    url: "/contact",
    icon: () => <ContactIcon />,
  },
]

/**
 * ナビゲーション
 *
 * @export MainNavigation
 * @returns MainNavigation
 */
export default function MainNavigation(props) {
  return (
    <nav className="main-navigation">
      <div className={styles.avatar}>
        <div className={styles.avatar__item}>
          <img src={thumbnail} alt="" />
        </div>
      </div>
      <ul className={styles.list}>
        {naviList.map(navi => (
          <li key={navi.ident} className={styles.list__item}>
            <Link to={navi.url}>
              <navi.icon className={styles.list__item__icon} />
              {navi.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
