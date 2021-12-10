/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";
// Layout
import { useTheme } from "@mui/styles";
import Gravatar from "react-gravatar";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
//Local

export default function Useritem({ user, owner }) {
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
            <Gravatar email={user.email} size={36} default="retro" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={user.username}
          primaryTypographyProps={{
            fontSize: 18,
            fontWeight: owner ? "500" : "400",
            letterSpacing: 0,
            color: owner
              ? theme.palette.misc.owner
              : theme.palette.secondary.main,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
          secondary={owner ? "Channel Owner" : "Member"}
          secondaryTypographyProps={{
            fontWeight: "400",
            fontSize: 14,
            color: theme.palette.primary.contrastText,
          }}
        />
      </ListItem>
    </List>
  );
}

Useritem.propTypes = {
  user: PropTypes.object.isRequired,
  owner: PropTypes.bool.isRequired,
};
