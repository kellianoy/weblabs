/** @jsxImportSource @emotion/react */
import { useState } from "react";
import axios from "axios";
// Layout
import { Button } from "@mui/material";
import { useTheme } from "@mui/styles";
import InputBase from "@mui/material/InputBase";
import PropTypes from "prop-types";
const useStyles = (theme) => ({
  form: {
    padding: "1rem",
    display: "flex",
  },
  content: {
    flex: "1 1 auto",
    padding: "5px",
    borderRadius: "10px",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.secondary.light,
    "&.MuiTextField-root": {
      marginRight: theme.spacing(5),
    },
  },
  send: { marginLeft: "10%" },
});

//this component is a form
export default function Form({ addMessage, channel, user }) {
  const [content, setContent] = useState("");
  const styles = useStyles(useTheme());
  const onSubmit = async () => {
    const { data: message } = await axios.post(
      `http://localhost:3001/channels/${channel.id}/messages`,
      {
        content: content,
        author: user.email,
      }
    );
    addMessage(message);
    setContent("");
  };
  const handleChange = (e) => {
    setContent(e.target.value);
  };
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
  );
}

Form.propTypes = {
  addMessage: PropTypes.func.isRequired,
  channel: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
