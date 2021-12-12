/** @jsxImportSource @emotion/react */
import { useContext, useState, useEffect } from "react";
// Layout
import { useTheme } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import IosShareIcon from "@mui/icons-material/IosShare";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import EditIcon from "@mui/icons-material/Edit";
//Local
import Context from "../context/Context";
import JoinLink from "./JoinLink";
import DeleteLink from "./DeleteLink";
import ChangeName from "./ChangeName";

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
  iconButtons: {
    marginLeft: "1%",
    ":hover": { bgcolor: theme.palette.primary.main },
  },
});

//This component is the header of each channel with the channel name and drawer when resized
export default function ChannelHeader(channel) {
  //is the drawer visible ?
  const { id, drawerVisible, setDrawerVisible, setID, user, channels } =
    useContext(Context);
  const theme = useTheme();
  const styles = useStyles(theme);
  const alwaysOpen = useMediaQuery(theme.breakpoints.up("sm"));
  const drawerToggle = (e) => {
    e.stopPropagation(), setDrawerVisible(true);
  };
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openChange, setOpenChange] = useState(false);
  const [owner, setOwner] = useState(false);
  //If we are the owner of the channel, don't display the same things
  useEffect(() => {
    const getUsers = async () => {
      const channel = channels.find((c) => c.id === id);
      if (channel && channel.owner === user.id) setOwner(true);
      else setOwner(false);
    };
    getUsers();
  }, [id, setID]);
  return (
    <>
      <AppBar sx={styles.nameblock} position="static">
        <Toolbar>
          <Tooltip arrow title="Menu" placement="bottom">
            <IconButton
              aria-label="open drawer"
              onClick={drawerToggle}
              edge="start"
              sx={[
                {
                  mr: 2,
                  ...((alwaysOpen || drawerVisible) && { display: "none" }),
                },
                styles.iconButtons,
              ]}
            >
              <MenuIcon css={styles.icons} />
            </IconButton>
          </Tooltip>
          <span css={styles.name}># {channel.name}</span>
          {id.match(/\w+-\w+-\w+-\w+-\w+/) && (
            <>
              <Tooltip arrow title="Share" placement="bottom">
                <IconButton
                  sx={styles.iconButtons}
                  onClick={() => setOpen(true)}
                >
                  <IosShareIcon css={styles.icons} />
                </IconButton>
              </Tooltip>
              {owner && (
                <Tooltip arrow title="Edit channel name" placement="bottom">
                  <IconButton
                    sx={styles.iconButtons}
                    onClick={() => setOpenChange(true)}
                  >
                    <EditIcon css={styles.icons} />
                  </IconButton>
                </Tooltip>
              )}
              <Box sx={{ flexGrow: 1 }} />
              <Tooltip arrow title="Leave" placement="bottom">
                <IconButton
                  sx={styles.iconButtons}
                  onClick={() => setOpenAlert(true)}
                >
                  <ExitToAppIcon
                    css={[styles.icons, { fill: theme.palette.misc.owner }]}
                  />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Toolbar>
      </AppBar>
      {open && <JoinLink open={open} setOpen={setOpen} />}
      <DeleteLink open={openAlert} setOpen={setOpenAlert} owner={owner} />
      <ChangeName open={openChange} setOpen={setOpenChange} />
    </>
  );
}
