/** @jsxImportSource @emotion/react */
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
// Layout
import { useTheme } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Transition from "@mui/material/Grow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
//Local
import Context from "../context/Context";
import Error from "../misc/Error";

//This component is the header of each channel with the channel name and drawer when resized
export default function ModifyMessage({ open, setOpen, message }) {
  //is the drawer visible ?

  const { id, oauth, setUpdateMessages } = useContext(Context);
  const theme = useTheme();
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);
  const modifyMessage = async () => {
    try {
      if (content === "") setError(true);
      else {
        await axios.put(
          `http://localhost:3001/channels/${id}/messages/${message.creation}`,
          {
            content: content,
          },
          {
            headers: {
              Authorization: `Bearer ${oauth.access_token}`,
            },
          }
        );
        setOpen(false);
        setUpdateMessages(true);
      }
    } catch (err) {
      setError(true);
      console.error(err);
    }
  };

  return (
    <>
      <Error
        open={error}
        setOpen={setError}
        message="The message modification cannot be empty"
      />
      <Dialog
        TransitionComponent={Transition}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth={true}
        maxWidth="sm"
        PaperProps={{
          style: {
            backgroundColor: theme.palette.primary.main,
          },
        }}
      >
        <DialogTitle
          sx={{
            color: theme.palette.secondary.main,
            fontFamily: theme.palette.primary.textFont,
            fontWeight: "600",
            fontSize: "28px",
            textAlign: "center",
          }}
        >
          Change the message ?
        </DialogTitle>
        <DialogContent>
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              maxWidth: "sx",

              bgcolor: theme.palette.primary.dark,
            }}
          >
            <InputBase
              sx={{
                flex: 1,
                paddingLeft: "2%",
                color: theme.palette.primary.contrastText,
                fontFamily: theme.palette.primary.textFont,
              }}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              fullwidth="true"
              autoFocus
              defaultValue=""
              placeholder={message.content}
            />
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{
              bgcolor: theme.palette.misc.main,
              color: theme.palette.primary.dark,
              "&:hover": {
                backgroundColor: theme.palette.misc.main,
                color: theme.palette.primary.dark,
                opacity: "0.8",
              },
            }}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: theme.palette.misc.main,
              color: theme.palette.primary.dark,
              "&:hover": {
                backgroundColor: theme.palette.misc.main,
                color: theme.palette.primary.dark,
                opacity: "0.8",
              },
            }}
            onClick={modifyMessage}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

ModifyMessage.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
};
