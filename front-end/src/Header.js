
/** @jsxImportSource @emotion/react */
import { useContext } from 'react';
// Layout
import { useTheme } from '@mui/styles';
import { Button, IconButton, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import Context from './Context';

const useStyles = (theme) => ({
  header: {
    backgroundColor: '#14202F',
    padding: theme.spacing(1),
    flexShrink: 0,
    height:'5%',
  },
  typetrack: {
    textAlign: "left",
    fontSize: "28px",
    fontFamily: 'Montserrat',
    marginLeft: "26px",
  },
  navibar: {
    overflow: 'hidden',
    flex: '1 1 auto',
    alignItems : 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height:'100%',
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
  const {
    oauth, setOauth,
    drawerVisible, setDrawerVisible
  } = useContext(Context)
  const drawerToggle = (e) => {
    setDrawerVisible(!drawerVisible)
  }

  const onClickLogout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }
  return (
    <header css={styles.header}>
      <IconButton
      
        color="inherit"
        aria-label="open drawer"
        onClick={drawerToggle}
        css={styles.menu}
      >
        <MenuIcon />
      </IconButton>
      <div css={styles.navibar}>
        <h1 css={styles.typetrack}>typetrack</h1>
        {
          oauth && 
          <><span>Welcome {oauth.email} </span>
            <Button variant="contained" color="primary" onClick={onClickLogout}>
            Log Out <LogoutIcon />
          </Button></>
        }
      </div>
    </header>
  );
}
