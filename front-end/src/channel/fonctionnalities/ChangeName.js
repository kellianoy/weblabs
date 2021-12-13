/** @jsxImportSource @emotion/react */
import { useContext, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
// Layout
import { useTheme } from "@mui/styles";
import {
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputBase,
  Button,
  Grow,
} from "@mui/material";
// Local
import Context from "../../context/Context";
import Error from "../../misc/Error";

const useStyles = (theme) => ({
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
export default function ChangeName({ open, setOpen }) {
  const theme = useTheme();
  const styles = useStyles(theme);
  const { oauth, setUpdateChannels, user, id } = useContext(Context);
  const [error, setError] = useState(false);
  const [content, setContent] = useState("");
  const modifyChannel = async () => {
    try {
      if (content === "") {
        setError(true);
      } else {
        await axios.put(
          `http://localhost:3001/channels/${id}`,
          {
            name: content,
          },
          {
            headers: {
              Authorization: `Bearer ${oauth.access_token}`,
            },
          }
        );
        //We close the open dialogs
        setContent("");
        setOpen(false);
        setUpdateChannels(true);
      }
    } catch (err) {
      console.error(err);
      setOpen(true);
      //We notify the error
    }
  };
  return (
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
        Change your channel name
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
            defaultValue=""
            placeholder={user.username + "'s awesome channel"}
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
          onClick={modifyChannel}
        >
          Validate
        </Button>
      </DialogActions>
      <Error
        open={error}
        setOpen={setError}
        message="You have to enter a channel name"
      />
    </Dialog>
  );
}

ChangeName.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
