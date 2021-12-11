/** @jsxImportSource @emotion/react */
import { useContext, useState } from "react";
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
import Settings from "../settings/MainSettings";

//This component shows the currently authenticated user in the navbar
export default function AuthenticatedUser() {
  const theme = useTheme();
  const { user } = useContext(Context);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Settings open={open} setOpen={setOpen} />
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
                <Gravatar email={user.email} size={36} default="retro" />
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
                onClick={() => {
                  setOpen(true);
                }}
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
                <ArrowRight
                  sx={{ position: "absolute", right: 4, opacity: 0 }}
                />
              </IconButton>
            </Tooltip>
          </ListItem>
        </List>
      </AppBar>
    </>
  );
}
