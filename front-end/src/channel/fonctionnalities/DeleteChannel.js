/** @jsxImportSource @emotion/react */
import { useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Layout
import { useTheme } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Transition from "@mui/material/Grow";
import Button from "@mui/material/Button";
//Local
import Context from "../../context/Context";

//This component is the header of each channel with the channel name and drawer when resized
export default function DeleteChannel({ open, setOpen }) {
  //is the drawer visible ?

  const navigate = useNavigate();
  const { setID, id, oauth, setUpdateChannels } = useContext(Context);
  const theme = useTheme();

  const deleteChannel = async () => {
    try {
      await axios.delete(`http://localhost:3001/channels/${id}`, {
        headers: {
          Authorization: `Bearer ${oauth.access_token}`,
        },
      });
      setOpen(false);
      setID("");
      setUpdateChannels(true);
      navigate("/channels");
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
        Delete the channel
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            color: theme.palette.primary.contrastText,
            fontFamily: theme.palette.primary.textFont,
            textAlign: "center",
            marginBottom: "5%",
          }}
        >
          This operation cannot be undone. The channel will be deleted.
        </DialogContentText>
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
          onClick={deleteChannel}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteChannel.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
