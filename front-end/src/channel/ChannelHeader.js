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
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
//Local
import Context from "../context/Context";
import JoinLink from "./JoinLink";
import DeleteLink from "./DeleteLink";

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
    marginLeft: "100%",
    "&:hover": {
      opacity: "0.8",
    },
  },
});

//This component is the header of each channel with the channel name and drawer when resized
export default function ChannelHeader(channel) {
  //is the drawer visible ?
  const { id, drawerVisible, setDrawerVisible } = useContext(Context);
  const theme = useTheme();
  const styles = useStyles(theme);
  const alwaysOpen = useMediaQuery(theme.breakpoints.up("sm"));
  const drawerToggle = (e) => {
    e.stopPropagation(), setDrawerVisible(true);
  };
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
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
          {id.match(/\w+-\w+-\w+-\w+-\w+/) && (
            <>
              <Tooltip arrow title="Share">
                <IconButton onClick={() => setOpen(true)}>
                  <IosShareIcon css={styles.icons} />
                </IconButton>
              </Tooltip>
              <Box sx={{ flexGrow: 1 }} />
              <Tooltip arrow title="Leave">
                <IconButton onClick={() => setOpenAlert(true)}>
                  <ExitToAppIcon
                    css={[styles.icons, { fill: theme.palette.misc.owner }]}
                  />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Toolbar>
      </AppBar>
      <JoinLink open={open} setOpen={setOpen} />
      <DeleteLink open={openAlert} setOpen={setOpenAlert} />
    </>
  );
}
