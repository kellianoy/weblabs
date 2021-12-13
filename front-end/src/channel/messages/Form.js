/** @jsxImportSource @emotion/react */
import { useState, useContext } from "react";
import axios from "axios";
// Layout
import { Button } from "@mui/material";
import { useTheme } from "@mui/styles";
import InputBase from "@mui/material/InputBase";

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
export default function Form({ channel, user }) {
  const { oauth, setUpdateMessages } = useContext(Context);
  const [content, setContent] = useState("");
  const styles = useStyles(useTheme());
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
  channel: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
