/** @jsxImportSource @emotion/react */
// Layout
import { useContext } from "react";
import { useTheme } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Transition from "@mui/material/Grow";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
//Local
import Context from "../context/Context";

export default function AddChannels() {
  const theme = useTheme();
  const { openDialog, setOpenDialog } = useContext(Context);
  return (
    <Dialog
      TransitionComponent={Transition}
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      maxWidth="sx"
      PaperProps={{
        style: {
          backgroundColor: theme.palette.primary.main,
        },
      }}
    >
      <DialogTitle
        sx={{
          color: theme.palette.secondary.main,
          fontFamily: theme.palette.primary.textFont,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Add a channel
      </DialogTitle>
      <DialogContent
        sx={{
          color: theme.palette.primary.contrastText,
          fontFamily: theme.palette.primary.textFont,
        }}
      >
        <DialogContentText
          sx={{
            color: theme.palette.primary.contrastText,
            fontFamily: theme.palette.primary.textFont,
            textAlign: "center",
            marginBottom: "5%",
          }}
        >
          You can choose if you want to create a new channel or join an existing
          one
        </DialogContentText>
        <Paper
          component="form"
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
            placeholder="Name of the new channel"
            inputProps={{ "aria-label": "Name of the new channel" }}
          />
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          sx={{
            bgcolor: theme.palette.misc.main,
            color: theme.palette.primary.dark,
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: theme.palette.misc.main,
            color: theme.palette.primary.dark,
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
