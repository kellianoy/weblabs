import PropTypes from "prop-types";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
//This component handle errors by showing a message
export default function Error({
  open,
  setOpen,
  message = "Unspecified error happened",
}) {
  return (
    <Snackbar
      open={open}
      onClose={() => setOpen(false)}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      sx={{ opacity: "1" }}
    >
      <Alert severity="error"> {message} </Alert>
    </Snackbar>
  );
}

Error.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};
