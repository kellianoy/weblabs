/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";
// Layout
import { useTheme } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
//Local
import MyGravatar from "../../settings/tabs/MyGravatar";

export default function Useritem({ user, owner }) {
  const theme = useTheme();
  return (
    <List>
      <ListItem disablePadding>
        <ListItemAvatar>
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              margin: "auto",
              width: "36px",
              height: "36px",
            }}
          >
            <MyGravatar email={user.email} md5={user.avatar || ""} size={36} />
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
