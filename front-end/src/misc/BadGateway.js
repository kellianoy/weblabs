/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import img404 from "./images/404.gif";
const useStyles = (theme) => ({
  root: {
    bgcolor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    fontFamily: theme.palette.primary.textFont,
    flex: "1 1 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  typetrack: {
    textTransform: "none",
    center: "center",
    fontFamily: theme.palette.primary.textFont,
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "1%",
    color: theme.palette.secondary.dark,
    opacity: "1",
    "&:hover": {
      borderRadius: "4px",
      backgroundColor: theme.palette.primary.light,
    },
  },
});

//This component exports a error sentence, for a bad gateway
export default function BadGateway() {
  const styles = useStyles(useTheme());
  const navigate = useNavigate();
  return (
    <Paper sx={styles.root}>
      <Button
        css={styles.typetrack}
        onClick={() => {
          navigate(`/channels/`);
        }}
      >
        typetrack.
      </Button>
      <img src={img404} />
      <span css={{ marginTop: "1%" }}>
        {" "}
        An unexpected error occured, it is probably not your fault. Sorry.{" "}
      </span>
    </Paper>
  );
}
