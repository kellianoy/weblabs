/** @jsxImportSource @emotion/react */
import axios from "axios";
// Layout
import { useContext, useState } from "react";
import { useTheme } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Transition from "@mui/material/Grow";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ArrowForward from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
//Local
import Context from "../context/Context";
import PropTypes from "prop-types";

//This component handle errors by showing a message
export function Error({
  open,
  setOpen,
  message = "Unspecified error happened",
}) {
  return (
    <Snackbar
      open={open}
      onClose={() => setOpen(false)}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      sx={{ opacity: "1" }}
    >
      <Alert severity="error"> {message} </Alert>
    </Snackbar>
  );
}
Error.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default function AddChannels() {
  const theme = useTheme();
  const { oauth, openDialog, setOpenDialog } = useContext(Context);
  const [openCreate, setOpenCreate] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);
  const [createContent, setCreateContent] = useState("");
  const [joinContent, setJoinContent] = useState("");
  const [open, setOpen] = useState(false);
  const createChannel = async () => {
    try {
      if (createContent === "") {
        setOpen(true);
      } else {
        await axios.post(`http://localhost:3001/channels/`, {
          name: createContent,
          owner: oauth.email,
        });

        setOpenCreate(false);
        setOpenDialog(false);
      }
    } catch (err) {
      console.error(err);
      setOpen(true);
    }
  };
  const joinChannel = async () => {
    try {
      console.log(joinContent);
      const found = joinContent.match(
        /localhost:3000\/channels\/join\/\w+-\w+-\w+-\w+-\w+/
      );
      if (found.length !== 0) {
        const joinID = found[0].match(/\w+-\w+-\w+-\w+-\w+/)[0];
        console.log(joinID);
        await axios.put(`http://localhost:3001/channels/join/${joinID}`, {
          //TO DO : AUTHENTICATE
          email: oauth.email,
        });
      } else {
        setOpen(true);
      }
      setOpenJoin(false);
      setOpenDialog(false);
    } catch (err) {
      console.error(err);
      setOpen(true);
    }
  };
  return (
    <>
      <Dialog
        TransitionComponent={Transition}
        open={openDialog && !openCreate && !openJoin}
        onClose={() => setOpenDialog(false)}
        maxWidth="sx"
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
          Add a channel
        </DialogTitle>
        <DialogContent
          sx={{
            color: theme.palette.primary.contrastText,
            fontFamily: theme.palette.primary.textFont,
          }}
        >
          <DialogContentText
            sx={{
              color: theme.palette.primary.contrastText,
              fontFamily: theme.palette.primary.textFont,
              textAlign: "center",
              marginBottom: "5%",
            }}
          >
            You can choose if you want to create a new channel or join an
            existing one
          </DialogContentText>

          <List>
            <ListItemButton
              sx={{
                borderRadius: "10px",
                "& .Mui-focusVisible": {
                  bgcolor: theme.palette.primary.dark,
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                setOpenCreate(true);
              }}
            >
              <ListItem>
                <ListItemText
                  primary="Create a new channel"
                  primaryTypographyProps={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: theme.palette.primary.contrastText,
                    fontFamily: theme.palette.primary.textFont,
                  }}
                />
                <ArrowForward />
              </ListItem>
            </ListItemButton>
            <ListItemButton
              sx={{
                borderRadius: "10px",
                "& .Mui-focusVisible": {
                  bgcolor: theme.palette.primary.dark,
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                setOpenJoin(true);
              }}
            >
              <ListItem>
                <ListItemText
                  primary="Join an existing channel"
                  primaryTypographyProps={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: theme.palette.primary.contrastText,
                    fontFamily: theme.palette.primary.textFont,
                  }}
                />
                <ArrowForward />
              </ListItem>
            </ListItemButton>
          </List>
        </DialogContent>
      </Dialog>
      <Dialog
        TransitionComponent={Transition}
        noValidate
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        maxWidth="sx"
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
          Create a new channel
        </DialogTitle>
        <DialogContent
          sx={{
            color: theme.palette.primary.contrastText,
            fontFamily: theme.palette.primary.textFont,
          }}
        >
          <DialogContentText
            sx={{
              color: theme.palette.primary.contrastText,
              fontFamily: theme.palette.primary.textFont,
              textAlign: "center",
              marginBottom: "5%",
            }}
          >
            Insert a channel name and confirm, your channel will be created
          </DialogContentText>
          <Paper
            fullwidth="true"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              bgcolor: theme.palette.primary.dark,
            }}
          >
            <InputBase
              onChange={(e) => {
                setCreateContent(e.target.value);
              }}
              sx={{
                flex: 1,
                paddingLeft: "2%",
                color: theme.palette.primary.contrastText,
                fontFamily: theme.palette.primary.textFont,
              }}
              defaultValue={createContent}
              fullwidth="true"
              autoFocus
              placeholder="Channel..."
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
            onClick={createChannel}
          >
            Create
          </Button>
        </DialogActions>

        <Error
          open={open}
          setOpen={setOpen}
          message="You have to enter a channel name"
        />
      </Dialog>

      <Dialog
        TransitionComponent={Transition}
        open={openJoin}
        onClose={() => setOpenJoin(false)}
        maxWidth="sx"
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
          Join an exisisting channel
        </DialogTitle>
        <DialogContent
          sx={{
            color: theme.palette.primary.contrastText,
            fontFamily: theme.palette.primary.textFont,
          }}
        >
          <DialogContentText
            sx={{
              color: theme.palette.primary.contrastText,
              fontFamily: theme.palette.primary.textFont,
              textAlign: "center",
              marginBottom: "5%",
            }}
          >
            Enter the link of the channel you want to join, and you will be
            added to the channel
          </DialogContentText>
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
              onChange={(e) => {
                setJoinContent(e.target.value);
              }}
              sx={{
                flex: 1,
                paddingLeft: "2%",
                color: theme.palette.primary.contrastText,
                fontFamily: theme.palette.primary.textFont,
              }}
              defaultValue={joinContent}
              fullwidth="true"
              autoFocus
              placeholder="localhost:3000/channels/join/..."
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
            onClick={joinChannel}
          >
            Join
          </Button>
        </DialogActions>

        <Error
          open={open}
          setOpen={setOpen}
          message="The link of the channel is incorrect"
        />
      </Dialog>
    </>
  );
}
