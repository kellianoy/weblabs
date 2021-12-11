/** @jsxImportSource @emotion/react */
import { useContext, useEffect } from "react";
import axios from "axios";
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
import Home from "./misc/Home";
import { Route, Routes } from "react-router-dom";
import AuthenticatedUser from "./channel/AuthenticatedUser";
const drawerWidth = 300;

const useStyles = (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
    overflow: "hidden",
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
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
  const { drawerVisible, setDrawerVisible, oauth, setUser, user, setChannels } =
    useContext(Context);

  const close = (e) => {
    e.stopPropagation();
    setDrawerVisible(false);
  };
  const alwaysOpen = useMediaQuery(theme.breakpoints.up("sm"));
  const displayDrawer = alwaysOpen || drawerVisible;
  useEffect(() => {
    const fetch = async () => {
      if (!user.email) {
        try {
          //Function to create a user in the db
          await axios.post(
            `http://localhost:3001/users`,
            {
              username: oauth.email,
              email: oauth.email,
            },
            {
              headers: {
                Authorization: `Bearer ${oauth.access_token}`,
              },
            }
          );
        } catch (err) {
          //We know it returns 403 if the user already exists, no need to notice it
        }
      }
      if (oauth.email) {
        try {
          const { data: get } = await axios.get(
            `http://localhost:3001/users/email/${oauth.email}`,
            {
              headers: {
                Authorization: `Bearer ${oauth.access_token}`,
              },
            }
          );
          setUser(get);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetch();
  }, [oauth, setChannels]);
  return (
    <main css={styles.root}>
      <Drawer
        PaperProps={{ style: { position: "relative" } }}
        BackdropProps={{ style: { position: "relative" } }}
        ModalProps={{
          style: { position: "absolute" },
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
          <div css={{ textAlign: "center" }}>
            <IconButton
              color="misc"
              sx={{ position: "relative" }}
              onClick={close}
            >
              <ChevronLeftIcon />
            </IconButton>
          </div>
        )}
        <Channels />
        <AuthenticatedUser />
      </Drawer>
      <Routes>
        <Route path=":id" element={<Channel />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </main>
  );
}
