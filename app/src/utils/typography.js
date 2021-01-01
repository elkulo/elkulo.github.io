import { default as TypographyFont } from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"

Wordpress2016.overrideThemeStyles = () => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
  }
}

delete Wordpress2016.googleFonts

const Typography = new TypographyFont(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  Typography.injectStyles()
}

export default Typography
export const rhythm = Typography.rhythm
export const scale = Typography.scale
