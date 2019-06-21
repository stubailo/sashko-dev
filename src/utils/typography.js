import Typography from "typography"

const typography = new Typography({
  headerFontFamily: ["Source Sans Pro", "sans-serif"],
  baseFontSize: 20
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
