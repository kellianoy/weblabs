/** @jsxImportSource @emotion/react */
import { useEffect, useContext, useState } from "react";
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
import Context from "../context/Context";

//This component is the header of each channel with the channel name and drawer when resized
export default function DeleteLink({ open, setOpen }) {
  //is the drawer visible ?

  const navigate = useNavigate();
  const { setID, id, oauth } = useContext(Context);
  const theme = useTheme();
  const [owner, setOwner] = useState(false);
  //If we are the owner of the channel, don't display the same things
  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data: channel } = await axios.get(
          `http://localhost:3001/channels/${id}`,
          {
            headers: {
              Authorization: `Bearer ${oauth.access_token}`,
            },
          }
        );
        const { data: user } = await axios.get(
          `http://localhost:3001/users/email/${oauth.email}`,
          {
            headers: {
              Authorization: `Bearer ${oauth.access_token}`,
            },
          }
        );
        if (channel.owner === user.id) setOwner(true);
        else setOwner(false);
      } catch (err) {
        console.error(err);
      }
    };
    getUsers();
  }, [id, setID]);

  const deleteChannel = async () => {
    try {
      await axios.delete(`http://localhost:3001/channels/${id}`, {
        headers: {
          Authorization: `Bearer ${oauth.access_token}`,
        },
      });
      setID("");
      navigate("/channels", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };
  const leaveChannel = async () => {
    try {
      await axios.put(
        `http://localhost:3001/channels/leave/${id}`,
        {
          email: oauth.email,
        },
        {
          headers: {
            Authorization: `Bearer ${oauth.access_token}`,
          },
        }
      );
      setID("");
      navigate("/channels", { replace: true });
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
        {owner ? "Delete the channel" : "Leave the channel"}
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
          {owner
            ? "This operation cannot be undone. The channel will be deleted."
            : "You will leave the channel. You can still join it later using a link provided by a friend inside the channel."}
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
          onClick={owner ? deleteChannel : leaveChannel}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteLink.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
