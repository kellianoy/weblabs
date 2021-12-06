/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from "@mui/styles";
import Gravatar from "react-gravatar";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
//Local

export default function Useritem(user, key) {
  const theme = useTheme();
  return (
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
          secondary={key === 0 ? "Owner" : "User"}
          secondaryTypographyProps={{
            fontSize: 14,
            color: theme.palette.primary.contrastText,
          }}
        />
      </ListItem>
    </List>
  );
}
