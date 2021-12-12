/** @jsxImportSource @emotion/react */
import { useContext } from "react";
// Layout
import { useTheme } from "@mui/styles";
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  AppBar,
} from "@mui/material";
import Gravatar from "react-gravatar";
// Local
import Context from "../context/Context";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
    width: "70%",
    margin: "1%",
  },
  userinfo: {
    background: theme.palette.primary.light,
    marginTop: "2%",
  },
  title: {
    fontFamily: theme.palette.primary.textFont,
    fontWeight: "600",
    fontSize: "22px",
    color: theme.palette.secondary.dark,
  },
  item: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0,
    color: theme.palette.secondary.main,
  },
  field: {
    fontWeight: "400",
    fontSize: 18,
    color: theme.palette.primary.contrastText,
  },
});
//This component exports the avatar part of settings
export default function Avatars() {
  const theme = useTheme();
  const styles = useStyles(theme);
  const { user } = useContext(Context);
  return (
    <Box sx={styles.root}>
      <span css={styles.title}>Avatars</span>
      <Paper sx={styles.userinfo} elevation={0}>
        <List>
          <AppBar
            sx={{ position: "relative", bgcolor: theme.palette.primary.dark }}
          >
            <ListItem>
              <ListItemAvatar sx={{ marginRight: "14px" }}>
                <Avatar
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    margin: "auto",
                    width: "64px",
                    height: "64px",
                  }}
                >
                  <Gravatar email={user.email} size={64} default="retro" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={user.username}
                primaryTypographyProps={styles.item}
              />
            </ListItem>
          </AppBar>
          <ListItem>
            <ListItemText
              primary="Username"
              primaryTypographyProps={styles.item}
              secondary={user.username}
              secondaryTypographyProps={styles.field}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Email"
              primaryTypographyProps={styles.item}
              secondary={user.email}
              secondaryTypographyProps={styles.field}
            />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
}
