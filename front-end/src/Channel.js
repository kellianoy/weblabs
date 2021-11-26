
/** @jsxImportSource @emotion/react */
import { useContext, useRef, useState, useEffect } from 'react';
import axios from 'axios';
// Layout
import { useTheme } from '@mui/styles';
import { Fab } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
// Local
import Form from './channel/Form'
import List from './channel/List'
import Context from './Context'
import { useNavigate, useParams } from 'react-router-dom'


const useStyles = (theme) => ({
  root: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflowX: 'auto',
    backgroundColor: theme.palette.primary.light,
  },
  fab: {
    position: 'absolute !important',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabDisabled: {
    display: 'none !important',
  },
  nameblock: {
    backgroundColor: theme.palette.primary.dark,
  },
  name: {
    fontFamily: theme.palette.primary.textFont,
    fontWeight: '600',
    fontSize: '28px',
    color: theme.palette.secondary.dark,
    marginLeft: '1%',
  },
  icons : {
    color: theme.palette.secondary.dark,
  }
})

export default function Channel() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { channels, oauth } = useContext(Context)
  const channel = channels.find(channel => channel.id === id)
  const theme = useTheme()
  const styles = useStyles(theme)
  const listRef = useRef()
  const [messages, setMessages] = useState([])
  const [scrollDown, setScrollDown] = useState(false)
  const alwaysOpen = useMediaQuery(theme.breakpoints.up('sm'))
  const addMessage = (message) => {
    setMessages([...messages, message])
  }
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data: messages } = await axios.get(`http://localhost:3001/channels/${id}/messages`, {
          headers: {
            // TODO: secure the request
          }
        })
        setMessages(messages)
        if (listRef.current) {
          listRef.current.scroll()
        }
      } catch (err) {
        navigate('/oups')
      }
    }
    fetch()
  }, [id, oauth, navigate])
  const onScrollDown = (scrollDown) => {
    setScrollDown(scrollDown)
  }
  const onClickScroll = () => {
    listRef.current.scroll()
  }
  //is the drawer visible ?
  const {
    drawerVisible, setDrawerVisible
  } = useContext(Context)

  const drawerToggle = (e) => {
    setDrawerVisible(true)
  }

  // On refresh, context.channel is not yet initialized
  if (!channel) {
    return (<div>loading</div>)
  }
  return (
    <div css={styles.root}>
      <AppBar css={styles.nameblock} position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={drawerToggle}
            edge="start"
            sx={{ mr: 2, ...((alwaysOpen || drawerVisible) && { display: 'none' }) }}
          >
            <MenuIcon css={styles.icons} /> 
            </IconButton>
          <span css={styles.name}># {channel.name}</span>
        </Toolbar>

      </AppBar>
      <List
        channel={channel}
        messages={messages}
        onScrollDown={onScrollDown}
        ref={listRef}
      />
      <Form addMessage={addMessage} channel={channel} />
      <Fab
        color="primary"
        aria-label="Latest messages"
        css={[styles.fab, scrollDown || styles.fabDisabled]}
        onClick={onClickScroll}
      >
        <ArrowDropDownIcon />
      </Fab>
    </div>
  );
}
