/** @jsxImportSource @emotion/react */
// Layout

import { useTheme } from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, IconButton} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useCookies } from 'react-cookie';
import {useContext} from 'react';
import {UserContext} from './App'

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
  const { user, setUser, logout} = useContext(UserContext)
  const styles = useStyles(useTheme())
  const [cookies,, removeCookie] = useCookies([]);
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
          cookies.oauth && 
          <><h2>Welcome { user } </h2>
          
            <Button variant="contained" color="primary" onClick={(e) => {
              e.stopPropagation()
              removeCookie('oauth')
              window.location.reload()
              logout()
          } }>
            Log Out <LogoutIcon />
          </Button></>
        } 
      </div>
    </header>
  );
}