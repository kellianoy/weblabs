/** @jsxImportSource @emotion/react */
import { useState, useContext } from "react";
import axios from "axios";
import Picker from "emoji-picker-react";
// Layout
import { Button } from "@mui/material";
import { useTheme } from "@mui/styles";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import PropTypes from "prop-types";
//Local
import Context from "../../context/Context";
const useStyles = (theme) => ({
  form: {
    padding: "1rem",
    display: "flex",
  },
  content: {
    flex: "1 1 auto",
    paddingLeft: "1%",
    fontFamily: theme.palette.primary.textFont,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.secondary.light,
    "&.MuiTextField-root": {
      marginRight: theme.spacing(5),
    },
    borderRadius: "15px",
  },
  send: { marginLeft: "10%" },
  icons: {
    fill: theme.palette.secondary.dark,
  },
  iconButtons: {
    marginLeft: "1%",
    ":hover": { bgcolor: theme.palette.primary.main },
  },
});

//this component is a form
export default function Form({ channel, user }) {
  const { oauth, setUpdateMessages } = useContext(Context);
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  //React hook for emojis
  const theme = useTheme();
  const styles = useStyles(theme);
  const onSubmit = async () => {
    await axios.post(
      `http://localhost:3001/channels/${channel.id}/messages`,
      {
        content: content,
        author: user.email,
      },
      {
        headers: {
          Authorization: `Bearer ${oauth.access_token}`,
        },
      }
    );
    setUpdateMessages(true);
    setContent("");
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const onEmojiClick = (event, emojiObject) => {
    setContent(content + emojiObject.emoji);
  };

  return (
    <form css={styles.form} onSubmit={onSubmit} noValidate>
      <Paper
        sx={{
          display: "flex",
          flex: "1 1 auto",
          bgcolor: theme.palette.primary.dark,
          borderRadius: "15px",
        }}
      >
        <InputBase
          id="outlined-multiline-flexible"
          sx={styles.content}
          multiline
          placeholder="Send a message"
          value={content}
          onChange={handleChange}
        />
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          sx={styles.iconButtons}
          onClick={(e) => {
            setAnchor(e.currentTarget), setOpen(true);
          }}
        >
          <EmojiEmotionsIcon css={styles.icons} />
        </IconButton>
        <Menu
          anchorEl={anchor}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <MenuItem>
            <Picker onEmojiClick={onEmojiClick} />
          </MenuItem>
        </Menu>
      </Paper>
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
  );
}

Form.propTypes = {
  channel: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
