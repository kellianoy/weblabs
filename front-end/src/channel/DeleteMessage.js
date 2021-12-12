/** @jsxImportSource @emotion/react */
import { useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
// Layout
import { useTheme } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Transition from "@mui/material/Grow";
import Button from "@mui/material/Button";
//Local
import Context from "../context/Context";

//This component is the header of each channel with the channel name and drawer when resized
export default function DeleteMessage({ open, setOpen, message }) {
  //is the drawer visible ?

  const { id, oauth, setUpdateMessages } = useContext(Context);
  const theme = useTheme();

  const deleteMessage = async () => {
    try {
      await axios.delete(
        `http://localhost:3001/channels/${id}/messages/${message.creation}`,
        {
          headers: {
            Authorization: `Bearer ${oauth.access_token}`,
          },
        }
      );
      setOpen(false);
      setUpdateMessages(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
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
        Delete the message ?
      </DialogTitle>
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
          onClick={deleteMessage}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteMessage.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
};
