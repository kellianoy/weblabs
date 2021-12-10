import { createTheme } from "@mui/material/styles";

// Dark theme
const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#1C1C1C",
      light: "#242429",
      dark: "#131313",
      contrastText: "#ffffff",
      textFont: "Montserrat",
    },
    secondary: {
      main: "#FFB734",
      light: "#FFECC9",
      dark: "#FFAE1C",
      contrastText: "#292A2D",
      textFont: "Open Sans",
    },
    misc: {
      main: "#BB86FC",
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
