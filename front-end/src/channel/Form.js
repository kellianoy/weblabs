
/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import axios from 'axios';
// Layout
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/styles';
import InputBase from '@mui/material/InputBase';

const useStyles = (theme) => ({
    form:{
      padding: '1rem',
      display: 'flex',
    },
    content: {
      flex: '1 1 auto',
      padding:"5px",
      borderRadius:'10px',
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.secondary.light,
      '&.MuiTextField-root': {
        marginRight: theme.spacing(1),
      },
    },
    send: {
    },
})


export default function Form({
  addMessage,
  channel,
}) {
  const [content, setContent] = useState('')
  const styles = useStyles(useTheme())
  const onSubmit = async () => {
    const {data: message} = await axios.post(
      `http://localhost:3001/channels/${channel.id}/messages`
    , {
      content: content,
      author: 'david',
    })
    addMessage(message)
    setContent('')
  }
  const handleChange = (e) => {
    setContent(e.target.value)
  }
  return (
    <form css={styles.form} onSubmit={onSubmit} noValidate>
     
      <InputBase
        id="outlined-multiline-flexible"
        sx={styles.content}
        multiline
        placeholder="Send a message"
        value={content}
        onChange={handleChange}
      />
      <div>
        <Button
          variant="contained"
          color="primary"
          css={styles.send}
          onClick={onSubmit}
        >
          Send
        </Button>
      </div>
    </form>
  )
}
