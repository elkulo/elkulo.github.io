import * as TypographyPreset from "typography"

const Typography = new TypographyPreset({
  googleFonts: [
    {
      name: "Noto Serif JP",
      styles: ["500", "700", "900"],
    },
    {
      name: "Roboto",
      styles: ["300", "400", "500", "700"],
    },
  ],
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  Typography.injectStyles()
}

export default Typography
export const rhythm = Typography.rhythm
export const scale = Typography.scale
