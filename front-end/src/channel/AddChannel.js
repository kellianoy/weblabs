/** @jsxImportSource @emotion/react */
// Layout
import { useContext, useState } from "react";
import { useTheme } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Transition from "@mui/material/Grow";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ArrowForward from "@mui/icons-material/ArrowForwardIos";
import Divider from "@mui/material/Divider";
//Local
import Context from "../context/Context";

export default function AddChannels() {
  const theme = useTheme();
  const { openDialog, setOpenDialog } = useContext(Context);
  const [openCreate, setOpenCreate] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);
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
          <Divider
            variant="middle"
            css={{
              backgroundColor: theme.palette.primary.contrastText,
              width: "40%",
              margin: "auto",
            }}
          />
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
          <Divider
            variant="middle"
            css={{
              backgroundColor: theme.palette.primary.contrastText,
              width: "40%",
              margin: "auto",
            }}
          />
        </DialogContent>
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
          <Divider
            variant="middle"
            css={{
              backgroundColor: theme.palette.primary.contrastText,
              width: "40%",
              margin: "auto",
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
