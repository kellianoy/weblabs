
/** @jsxImportSource @emotion/react */
import {useRef, useState} from 'react';
import axios from 'axios';
// Layout
import { useTheme } from '@mui/styles';
import { Fab } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// Local
import Form from './channel/Form'
import List from './channel/List'

const useStyles = (theme) => ({
  root: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
    paddingLeft: '5px',
    backgroundColor: '#373737',
    boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    // backgroundColor: '#66728E',
    ':hover': {
      backgroundColor: 'rgba(96,96,96,0.4)',
    }
  },
  fab: {
    position: 'absolute !important',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabDisabled: {
    display: 'none !important',
  }
})

export default function Channel({
  channel
}) {
  const styles = useStyles(useTheme())
  const listRef = useRef();
  const channelId = useRef()
  const [messages, setMessages] = useState([])
  const [scrollDown, setScrollDown] = useState(false)
  const addMessage = (message) => {
    fetchMessages()
  }
  const fetchMessages = async () => {
    setMessages([])
    const {data: messages} = await axios.get(`http://localhost:3001/channels/${channel.id}/messages`)
    setMessages(messages)
    if(listRef.current){
      listRef.current.scroll()
    }
  }
  
  if(channelId.current !== channel.id){
    fetchMessages()
    channelId.current = channel.id
  }
  const onScrollDown = (scrollDown) => {
    setScrollDown(scrollDown)
  }
  const onClickScroll = () => {
    listRef.current.scroll()
  }
  return (
    <div css={styles.root}>
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
