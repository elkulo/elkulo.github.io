import React from "react"
import { Link } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import HomeIcon from "@material-ui/icons/Home"
import AboutIcon from "@material-ui/icons/Person"
import ProductIcon from "@material-ui/icons/Grain"
import ContactIcon from "@material-ui/icons/Send"
import thumbnail from "../../assets/videos/landscape.jpg"

const useStyles = makeStyles({
  itemColor: {
    color: `inherit`,
  },
})

const naviList = [
  {
    ident: encodeURI("home"),
    name: "Home",
    url: "/",
    icon: () => <HomeIcon />,
  },
  {
    ident: encodeURI("about"),
    name: "About",
    url: "/about",
    icon: () => <AboutIcon />,
  },
  {
    ident: encodeURI("product"),
    name: "Product",
    url: "/product",
    icon: () => <ProductIcon />,
  },
  {
    ident: encodeURI("contact"),
    name: "Contact",
    url: "/contact",
    icon: () => <ContactIcon />,
  },
]

/**
 * ナビゲーション
 *
 * @export Navigation
 * @returns Navigation
 */
export default function Navigation(props) {
  const classes = useStyles()

  return (
    <nav className="main-navigation">
      <div className="menu-avatar">
        <div className="menu-avatar__item">
          <img src={thumbnail} alt="" />
        </div>
      </div>
      <ul className="menu-list">
        {naviList.map((navi) => (
          <li
            key={navi.ident}
            className={`menu-list__item menu-list__item--${navi.ident}`}
          >
            <Link to={navi.url}>
              <navi.icon className="icon" classes={classes.itemColor} />
              {navi.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
