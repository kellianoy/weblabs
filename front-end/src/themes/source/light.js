import { createTheme } from "@mui/material/styles";

// Light theme
const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#cfcfcf",
      light: "#f3f3f3",
      dark: "#ffffff",
      contrastText: "#131313",
      textFont: "Montserrat",
    },
    secondary: {
      main: "#cb2235",
      light: "#131313",
      dark: "#8d1725",
      contrastText: "#ffffff",
      textFont: "Open Sans",
    },
    misc: {
      main: "#17252d",
      owner: "#ff2454",
      contrastText: "#000000",
    },
  },
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
});

export default theme;
