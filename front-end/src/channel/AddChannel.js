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
import FormControl from "@mui/material/FormControl";
//Local
import Context from "../context/Context";

export default function AddChannels() {
  const theme = useTheme();
  const { oauth, openDialog, setOpenDialog } = useContext(Context);
  const [openCreate, setOpenCreate] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);
  const [createContent, setCreateContent] = useState("");
  const [joinContent, setJoinContent] = useState("");
  console.log(joinContent);
  const createChannel = async () => {
    try {
      await axios.post(`http://localhost:3001/channels/`, {
        name: createContent,
        owner: oauth.email,
      });
      setOpenCreate(false);
      setOpenDialog(false);
    } catch (err) {
      console.error(err);
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
            <FormControl>
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
            </FormControl>
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
            <FormControl>
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
                placeholder="localhost:3000/..."
              />
            </FormControl>
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
          >
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
