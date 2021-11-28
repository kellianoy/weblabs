import { createTheme } from "@mui/material/styles";

// Light theme
const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#FFFFFF",
      light: "#242429",
      dark: "#131313",
      contrastText: "#131313",
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
