import { createTheme } from '@mui/material/styles';

// Dark theme
const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#1C1C1C',
      light: '#292A2D',
      dark: '#131313',
      contrastText: '#ffffff',
      textFont: 'Montserrat',
    },
    secondary: {
      main: '#FFB734',
      light: '#FFCA6B',
      dark: '#F9AA1B',
      contrastText: '#292A2D',
    },
    misc: {
      main: '#BB86FC',
      contrastText: '#000000',
    }, 
  },
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
})

export default theme
