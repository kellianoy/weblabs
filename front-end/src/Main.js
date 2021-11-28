/** @jsxImportSource @emotion/react */
import { useContext } from "react";
// Layout

import { useTheme } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Drawer } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import IconButton from "@mui/material/IconButton";
// Local
import Context from "./context/Context";
import Channels from "./channel/Channels";
import Channel from "./channel/Channel";
import Welcome from "./misc/Home";

import { Route, Routes } from "react-router-dom";

const drawerWidth = 300;

const useStyles = (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
    overflow: "hidden",
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "row",
    position: "relative",
  },
  drawer: {
    display: "block",
    width: drawerWidth,
    backgroundColor: theme.palette.primary.main,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      backgroundColor: theme.palette.primary.main,
      width: drawerWidth,
      boxSizing: "border-box",
    },
  },
  drawerclosed: {
    display: "none",
  },
});

export default function Main() {
  const theme = useTheme();
  const styles = useStyles(theme);
  const { drawerVisible, setDrawerVisible } = useContext(Context);

  const close = (e) => {
    e.stopPropagation();
    setDrawerVisible(false);
  };

  const alwaysOpen = useMediaQuery(theme.breakpoints.up("sm"));
  const displayDrawer = alwaysOpen || drawerVisible;
  return (
    <main css={styles.root}>
      <Drawer
        PaperProps={{ style: { position: "relative" } }}
        BackdropProps={{ style: { position: "relative" } }}
        ModalProps={{
          style: { position: "relative" },
        }}
        css={[
          displayDrawer ? styles.drawer : styles.drawerclosed,
          !alwaysOpen && {
            width: "100%",
            "& .MuiDrawer-paper": { width: "100%" },
          },
        ]}
        variant="persistent"
        anchor="left"
        open={displayDrawer}
      >
        {!alwaysOpen && (
          <IconButton color="misc" onClick={close}>
            <ChevronLeftIcon />
          </IconButton>
        )}
        <Channels />
      </Drawer>
      <Routes>
        <Route path=":id" element={<Channel />} />
        <Route path="*" element={<Welcome />} />
      </Routes>
    </main>
  );
}
