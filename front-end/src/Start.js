/** @jsxImportSource @emotion/react */
import { Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import StarIcon from "@mui/icons-material/Star";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/styles";
import ScaleUp from "./effects/ScaleUp";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";

const useStyles = (theme) => ({
  cards: {
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  topleftsub: {
    textAlign: "left",
    fontFamily: theme.palette.primary.textFont,
    fontSize: "24px",
    fontWeight: "600",
    color: theme.palette.primary.contrastText,
    margin: "0px",
    marginTop: "65px",
    marginLeft: "5%",
  },
  midleftsub: {
    textAlign: "left",
    fontFamily: theme.palette.primary.textFont,
    fontSize: "26px",
    fontWeight: "600",
    color: theme.palette.primary.contrastText,
    margin: "0px",
    marginBottom: "1%",
  },
  middle: {
    display: "flex",
    flex: "1 1 auto",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  typetrack: {
    textAlign: "left",
    fontFamily: theme.palette.primary.textFont,
    fontSize: "60px",
    fontWeight: "600",
    color: theme.palette.secondary.dark,
    margin: "0px",
    marginLeft: "5%",
  },
  titles: {
    textAlign: "center",
    fontFamily: theme.palette.primary.textFont,
    fontSize: "42px",
    fontWeight: "600",
    color: theme.palette.secondary.dark,
    margin: "0px",
  },
  subtitles: {
    textAlign: "center",
    fontFamily: theme.palette.primary.textFont,
    fontSize: "22px",
    fontWeight: "600",
    color: theme.palette.primary.contrastText,
    margin: "5px",
  },
  icons: {
    color: theme.palette.secondary.dark,
    transform: "scale(3)",
    marginBottom: "20px",
  },
});

export default function Start({ redirect }) {
  const theme = useTheme();
  const styles = useStyles(theme);
  const isSmall = !useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Grid
      container
      rowSpacing={{ xs: 26, sm: 26, md: 26 }}
      columnSpacing={{ xs: 2, sm: 8, md: 8 }}
    >
      <Grid item xs={12}>
        <h2 css={styles.topleftsub}> Refined chatting for tasteful people </h2>
        <h1 css={styles.typetrack}> typetrack. </h1>
      </Grid>
      <Grid item xs={12}>
        <div css={styles.middle}>
          <h1 css={styles.midleftsub}>Please, log in the application</h1>
          <ScaleUp scale={1.15}>
            <Button
              size="medium"
              variant="contained"
              color="misc"
              onClick={redirect}
            >
              Log In
            </Button>
          </ScaleUp>
        </div>
      </Grid>
      <Grid item xs={4}>
        <div css={styles.cards}>
          <ScaleUp>
            <MenuIcon css={styles.icons} />
          </ScaleUp>
          <h1 css={[styles.titles, isSmall && { fontSize: "20px" }]}>
            Channels
          </h1>
          <h2
            css={[
              styles.subtitles,
              isSmall && { fontSize: "14px", marginBottom: "0" },
            ]}
          >
            {" "}
            Navigating through channels never felt that good{" "}
          </h2>
        </div>
      </Grid>
      <Grid item xs={4}>
        <div css={styles.cards}>
          <ScaleUp>
            <StarIcon css={styles.icons} />
          </ScaleUp>
          <h1 css={[styles.titles, isSmall && { fontSize: "20px" }]}>Unique</h1>
          <h2 css={[styles.subtitles, isSmall && { fontSize: "14px" }]}>
            {" "}
            Premium chatting experience
          </h2>
        </div>
      </Grid>
      <Grid item xs={4}>
        <div css={styles.cards}>
          <ScaleUp>
            <FullscreenIcon css={styles.icons} />
          </ScaleUp>
          <h1 css={[styles.titles, isSmall && { fontSize: "20px" }]}>
            Focused
          </h1>
          <h2
            css={[
              styles.subtitles,
              { marginBottom: "0" },
              isSmall && { fontSize: "14px", marginBottom: "0" },
            ]}
          >
            {" "}
            Made by users for users, using your feedback to improve{" "}
          </h2>
        </div>
      </Grid>
    </Grid>
  );
}

Start.propTypes = {
  redirect: PropTypes.func.isRequired,
};
