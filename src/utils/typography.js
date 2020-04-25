import Typography from "typography";

const theme = {
  baseFontSize: "17px",
  baseLineHeight: "26px",
  modularScales: [
    {
      scale: "major tenth"
    },
    {
      scale: "minor seventh",
      maxWidth: "768px"
    }
  ],
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

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
