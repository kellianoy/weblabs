/** @jsxImportSource @emotion/react */
import { useContext, useState } from "react";
import axios from "axios";
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputBase,
  Button,
  Grow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Gravatar from "react-gravatar";
// Local
import Context from "../context/Context";
import Error from "../misc/Error";

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
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  field: {
    fontSize: 18,
    fontWeight: "400",
    color: theme.palette.primary.contrastText,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});
//This component exports the account part of settings
export default function Account() {
  const theme = useTheme();
  const styles = useStyles(theme);
  const { user, oauth, setUpdateUser } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [content, setContent] = useState(user.email);
  const modifyUsername = async () => {
    try {
      if (content === "") {
        setError(true);
      } else {
        await axios.put(
          `http://localhost:3001/users/${oauth.email}`,
          {
            email: oauth.email,
            username: content,
          },
          {
            headers: {
              Authorization: `Bearer ${oauth.access_token}`,
            },
          }
        );
        //We close the open dialogs
        setOpen(false);
        setUpdateUser(true);
      }
    } catch (err) {
      console.error(err);
      setOpen(true);
      //We notify the error
    }
  };
  return (
    <>
      <Box sx={styles.root}>
        <span css={styles.title}>Account</span>
        <Paper sx={styles.userinfo} elevation={0}>
          <List>
            <AppBar
              sx={{
                position: "relative",
                bgcolor: theme.palette.primary.dark,
              }}
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
              <IconButton
                onClick={() => setOpen(true)}
                sx={{ ":hover": { bgcolor: theme.palette.primary.light } }}
              >
                <EditIcon sx={{ fill: theme.palette.secondary.dark }} />
              </IconButton>
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
      <Dialog
        TransitionComponent={Grow}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth={true}
        maxWidth="md"
        PaperProps={{
          style: {
            backgroundColor: theme.palette.primary.main,
          },
        }}
      >
        <DialogTitle
          sx={[
            styles.title,
            {
              textAlign: "center",
            },
          ]}
        >
          Change your username
        </DialogTitle>
        <DialogContent>
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              maxWidth: "sx",

              bgcolor: theme.palette.primary.dark,
            }}
          >
            <InputBase
              sx={{
                flex: 1,
                paddingLeft: "2%",
                color: theme.palette.primary.contrastText,
                fontFamily: theme.palette.primary.textFont,
              }}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              fullwidth="true"
              autoFocus
              placeholder={user.email}
            />
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{
              bgcolor: theme.palette.misc.main,
              color: theme.palette.primary.dark,
              "&:hover": {
                backgroundColor: theme.palette.misc.main,
                color: theme.palette.primary.dark,
                opacity: "0.8",
              },
            }}
            onClick={modifyUsername}
          >
            Validate
          </Button>
        </DialogActions>
        <Error
          open={error}
          setOpen={setError}
          message="You have to enter a username"
        />
      </Dialog>
    </>
  );
}
