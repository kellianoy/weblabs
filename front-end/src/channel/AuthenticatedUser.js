/** @jsxImportSource @emotion/react */
import { useContext, useState, useEffect } from "react";
import axios from "axios";
// Layout
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/styles";
import Gravatar from "react-gravatar";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import AppBar from "@mui/material/AppBar";
import Tooltip from "@mui/material/Tooltip";
import ArrowRight from "@mui/icons-material/ArrowRight";
//Local
import Context from "../context/Context";

export default function AuthenticatedUser() {
  const theme = useTheme();
  const { oauth, setOauth } = useContext(Context);
  const [user, setUser] = useState({});
  const onClickLogout = (e) => {
    e.stopPropagation();
    setOauth(null);
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data: user } = await axios.get(
          `http://localhost:3001/users/e/${oauth.email}`,
          {
            headers: {
              Authorization: `Bearer ${oauth.access_token}`,
            },
          }
        );
        setUser(user);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
    //get the users of the channel
  }, [oauth, setUser]);
  return (
    <AppBar
      position="relative"
      sx={{
        backgroundColor: theme.palette.primary.dark,
        top: "auto",
        bottom: 0,
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemAvatar>
            <Avatar
              sx={{
                bgcolor: theme.palette.misc.main,
                margin: "auto",
                width: "36px",
                height: "36px",
              }}
            >
              <Gravatar email={user.email} size={36} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={user.username}
            primaryTypographyProps={{
              fontSize: 16,
              fontWeight: "400",
              letterSpacing: 0,
              color: theme.palette.secondary.main,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
            secondary={user.email}
            secondaryTypographyProps={{
              fontSize: 14,
              color: theme.palette.primary.contrastText,
            }}
          />
          <Tooltip title="Settings">
            <IconButton
              onClick={onClickLogout}
              color="misc"
              size="large"
              sx={{
                color: theme.palette.misc.main,
                "& svg": {
                  color: theme.palette.misc.main,
                  transition: "0.2s",
                  transform: "translateX(0) rotate(0)",
                },
                "&:hover, &:focus": {
                  bgcolor: "unset",
                  opacity: "0.85",
                  "& svg:first-of-type": {
                    transform: "translateX(-4px) rotate(-20deg)",
                  },
                  "& svg:last-of-type": {
                    right: 0,
                    opacity: 1,
                  },
                },
                "&:after": {
                  content: '""',
                  position: "absolute",
                  height: "80%",
                  display: "block",
                  left: 0,
                  width: "1px",
                  bgcolor: "divider",
                },
              }}
            >
              <SettingsIcon />
              <ArrowRight sx={{ position: "absolute", right: 4, opacity: 0 }} />
            </IconButton>
          </Tooltip>
        </ListItem>
      </List>
    </AppBar>
  );
}
