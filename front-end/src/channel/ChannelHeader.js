/** @jsxImportSource @emotion/react */
import { useContext, useState } from "react";
// Layout
import { useTheme } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import IosShareIcon from "@mui/icons-material/IosShare";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Transition from "@mui/material/Grow";
import InputBase from "@mui/material/InputBase";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
//Local
import Context from "../context/Context";

const useStyles = (theme) => ({
  nameblock: {
    backgroundColor: theme.palette.primary.dark,
  },
  name: {
    fontFamily: theme.palette.primary.textFont,
    fontWeight: "600",
    fontSize: "28px",
    color: theme.palette.secondary.dark,
    marginLeft: "1%",
  },
  icons: {
    fill: theme.palette.secondary.dark,
  },
});

//This component is the header of each channel with the channel name and drawer when resized
export default function ChannelHeader(channel) {
  //is the drawer visible ?
  const { id, drawerVisible, setDrawerVisible } = useContext(Context);
  const [clicked, setClicked] = useState(false);
  const theme = useTheme();
  const styles = useStyles(theme);
  const alwaysOpen = useMediaQuery(theme.breakpoints.up("sm"));
  const drawerToggle = (e) => {
    e.stopPropagation(), setDrawerVisible(true);
  };
  const [open, setOpen] = useState(false);
  return (
    <>
      <AppBar css={styles.nameblock} position="static">
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={drawerToggle}
            edge="start"
            sx={{
              mr: 2,
              ...((alwaysOpen || drawerVisible) && { display: "none" }),
            }}
          >
            <MenuIcon css={styles.icons} />
          </IconButton>
          <span css={styles.name}># {channel.name}</span>
          {id && (
            <IconButton onClick={() => setOpen(true)}>
              <IosShareIcon css={styles.icons} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Dialog
        TransitionComponent={Transition}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth="true"
        maxWidth="md"
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
          Share the channel link!
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
            Send an invitation link to your friends
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
              sx={{
                flex: 1,
                paddingLeft: "2%",
                color: theme.palette.primary.contrastText,
                fontFamily: theme.palette.primary.textFont,
              }}
              defaultValue={"localhost:3000/channels/join/" + id}
              fullwidth="true"
              readOnly="true"
            />
            <Tooltip
              arrow
              open={clicked}
              title={"Copied to clipboard!"}
              leaveDelay={1500}
              onClose={() => setClicked(false)}
            >
              <IconButton
                onClick={() => {
                  setClicked(true);
                  navigator.clipboard.writeText(
                    "localhost:3000/channels/join/" + id
                  );
                }}
              >
                <ContentPasteIcon css={styles.icons} />
              </IconButton>
            </Tooltip>
          </Paper>
        </DialogContent>
      </Dialog>
    </>
  );
}
