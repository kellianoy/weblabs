/** @jsxImportSource @emotion/react */
import { useContext } from "react";
// Layout
import { useTheme } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";

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
});

export default function ChannelHeader(channel) {
  //is the drawer visible ?
  const { drawerVisible, setDrawerVisible } = useContext(Context);
  const theme = useTheme();
  const styles = useStyles(theme);
  const alwaysOpen = useMediaQuery(theme.breakpoints.up("sm"));
  const drawerToggle = (e) => {
    e.stopPropagation(), setDrawerVisible(true);
  };
  return (
    <AppBar css={styles.nameblock} position="static">
      <Toolbar>
        <IconButton
          color="inherit"
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
      </Toolbar>
    </AppBar>
  );
}
