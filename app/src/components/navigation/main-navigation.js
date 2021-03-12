import React from "react"
import { Link } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import HomeIcon from "@material-ui/icons/Home"
import AboutIcon from "@material-ui/icons/Person"
import ProductIcon from "@material-ui/icons/Grain"
import ContactIcon from "@material-ui/icons/Send"
import thumbnail from "assets/videos/landscape/landscape.jpg"
import styles from "./main-navigation.module.scss"

const useStyles = makeStyles({
  itemColor: {
    color: `inherit`,
  },
})

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
  const classes = useStyles()

  return (
    <nav className="main-navigation">
      <div className={styles.avatar}>
        <div className={styles.avatar__item}>
          <img src={thumbnail} alt="" />
        </div>
      </div>
      <ul className={styles.list}>
        {naviList.map((navi) => (
          <li key={navi.ident} className={styles.list__item}>
            <Link to={navi.url}>
              <navi.icon
                className={styles.list__item__icon}
                classes={classes.itemColor}
              />
              {navi.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
