/** @jsxImportSource @emotion/react */
import * as React from 'react';
import {Drawer} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const styles = { 
    root: {
      minWidth: '200px',
    },
    channel: {
      padding: '.2rem .5rem',
      whiteSpace: 'nowrap', 
    },
    bigDrawer: {
      position: "relative",
      marginLeft: "auto",
      width: 200,
      display: { 
        xs: 'none', 
        sm: 'block' },
      "& .MuiBackdrop-root": {
        display: "none"
      },
      '& .MuiDrawer-paper': { 
        width: 200,
        position: "absolute",
      }
    },
    littleDrawer:{
      width: 200,
      display: { 
        xs: 'block', 
        sm: 'none' },
      '& .MuiDrawer-paper': { 
        width: 200,
        position: "absolute",
        boxSizing: 'border-box'
      }
    },
    menu:{
      marginTop: "15px",
      padding: "8px",
      display: { 
          xs: 'block', 
          sm: 'none' 
      },
    }
}

 export default function ResponsiveDrawer({
    channels, onChannel
 }) {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    }
    const myChannels =(
      <List>
          {channels.map((channel, i) => (
            <ListItem button key={i} color="primary" href="#"
              onClick={(e) => {
                e.preventDefault();
                onChannel(channel);
              } }
            >
              {channel.name}
            </ListItem>
          ))}
      </List>
    )
    return (
      <><div css={styles.menu}>
        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ ml: 'auto', display: { sm: 'none', xs: 'block' } }}>
          <MenuIcon />
        </IconButton>
      </div>
      
      <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true, }} sx={styles.littleDrawer}>
        {myChannels}
      </Drawer>

      <Drawer sx={styles.bigDrawer} variant="permanent" open>
        {myChannels}
      </Drawer></>
    );
  };