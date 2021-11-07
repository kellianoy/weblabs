/** @jsxImportSource @emotion/react */
// Layout

import { useTheme } from '@mui/styles';
import {IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const useStyles = (theme) => ({
    header: {
      backgroundColor: '#14202F',
      padding: theme.spacing(1),
      flexShrink: 0,
    },
    typetrack: {
      textAlign: "left",
      fontSize: "28px",
      fontFamily: "Montserrat, sans-serif",
      marginLeft: "26px",
    },
    navibar: {
      overflow: 'hidden',
      flex: '1 1 auto',
      alignItems : 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    menu: {
      [theme.breakpoints.up('sm')]: {
        display: 'none !important',
      },
    }
})

export default function Header({
  drawerToggleListener
}) {
  const styles = useStyles(useTheme())
  const handleDrawerToggle = (e) => {
    drawerToggleListener()
  }
  return (
    <header className="App-header" css={styles.header}>
    <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        css={styles.menu}
    >
        <MenuIcon />
      </IconButton>
      <div css={styles.navibar}>
        <link href="https://fonts.googleapis.com/css?family=Montserrat:100" rel="stylesheet"></link>
        <h1 css={styles.typetrack}>typetrack</h1>
        { 
          cookies.get("refresh_token") && 
          <><h2>Welcome {} </h2>
          
            <Button variant="contained" color="primary" onClick={(e) => {
            e.stopPropagation();
            cookies.remove("refresh_token");
            window.location.reload()
          } }>
            Log Out <LogoutIcon />
          </Button></>
        } 
      </div>
    </header>
  );
}