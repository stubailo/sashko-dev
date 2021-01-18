import Typography from "typography";

const theme = {
  baseFontSize: "18px",
  baseLineHeight: "25px",
  googleFonts: [
    {
      name: "Merriweather",
      styles: ["700"]
    },
    {
      name: "Source Sans Pro",
      styles: ["400", "400i", "700"]
    }
  ],
  headerFontFamily: ["Merriweather", "serif"],
  bodyFontFamily: ["Source Sans Pro", "sans-serif"],
  headerGray: 20,
  bodyGray: 20,
  headerWeight: 700,
  bodyWeight: 400,
  boldWeight: 700
};

const typography = new Typography(theme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}
const { fontSize, lineHeight } = typography.scale(0);
console.log(fontSize, lineHeight, typography.rhythm(1), "AAAAA");
export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
