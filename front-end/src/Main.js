
/** @jsxImportSource @emotion/react */
import React, {useState} from 'react'
// Layout
import { useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Drawer} from '@mui/material';
// Local
import Channels from './Channels'
import Channel from './Channel'
import Welcome from './Welcome'

import {useContext} from 'react';

const useStyles = (theme) => ({
  main: {
    backgroundColor: '#373B44',
    overflow: 'hidden',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  },
  drawer: {
    width: '200px',
    display: 'none',
  },
  drawerVisible: {
    display: 'block',
  },
})

export const ChannelContext = React.createContext();

export const ChannelProvider = ({
  children
}) => {
  const [channel, setChannel] = useState(null)
  return (
    <ChannelContext.Provider value={{
      channel: channel,
      setChannel: setChannel,
      fetchChannel: async (channel) => {
        setChannel(channel)
      }
    }}>{children}</ChannelContext.Provider>
  )
}

export default function Main({
  drawerMobileVisible,
}) {
  
  const { channel, setChannel, fetchChannel} = useContext(ChannelContext)
  
  const theme = useTheme()
  const styles = useStyles(theme)
  const alwaysOpen = useMediaQuery(theme.breakpoints.up('sm'))
  const isDrawerVisible = alwaysOpen || drawerMobileVisible
  return (
    <main css={styles.main}>
      <Drawer
        PaperProps={{ style: { position: 'relative' } }}
        BackdropProps={{ style: { position: 'relative' } }}
        ModalProps={{
          style: { position: 'relative' }
        }}
        variant="persistent"
        open={isDrawerVisible}
        css={[styles.drawer, isDrawerVisible && styles.drawerVisible]}
      >
        <Channels onChannel={fetchChannel} />
      </Drawer>
      {channel ? <Channel channel={channel} messages={[]} /> : <Welcome />}
    </main>
  );
}
