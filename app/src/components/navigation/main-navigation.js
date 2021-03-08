import React from "react"
import { Link } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import HomeIcon from "@material-ui/icons/Home"
import AboutIcon from "@material-ui/icons/Person"
import ProductIcon from "@material-ui/icons/Grain"
import ContactIcon from "@material-ui/icons/Send"
import thumbnail from "assets/videos/landscape/landscape.jpg"

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
      <div className="main-navigation__avatar">
        <div className="main-navigation__avatar__item">
          <img src={thumbnail} alt="" />
        </div>
      </div>
      <ul className="main-navigation__list">
        {naviList.map((navi) => (
          <li
            key={navi.ident}
            className={`main-navigation__list__item main-navigation__list__item--${navi.ident}`}
          >
            <Link to={navi.url}>
              <navi.icon
                className="main-navigation__list__item__icon"
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
