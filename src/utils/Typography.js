import * as TypographyPreset from "typography"

const Typography = new TypographyPreset({
  includeNormalize: true, // normalize.cssを読み込む
  googleFonts: [
    {
      name: "Noto Serif JP",
      styles: ["500"],
    },
    {
      name: "Lato",
      styles: ["300", "400"],
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
