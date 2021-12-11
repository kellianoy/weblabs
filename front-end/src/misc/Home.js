/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from "@mui/styles";
import { useContext } from "react";
import Divider from "@mui/material/Divider";
import SettingsIcon from "@mui/icons-material/Settings";
// Local
import ChannelHeader from "../channel/ChannelHeader";
import Context from "../context/Context";

const useStyles = (theme) => ({
  root: {
    flex: "1 1",
    display: "flex",
    flexDirection: "column",
    background: theme.palette.primary.light,
  },
  text: {
    fontFamily: theme.palette.primary.textFont,
    fontColor: theme.palette.primary.contrastText,
    fontSize: "18px",
    marginTop: "1%",
    marginLeft: "2%",
  },
  typetrack: {
    textAlign: "left",
    fontFamily: theme.palette.primary.textFont,
    fontSize: "32px",
    fontWeight: "600",
    color: theme.palette.secondary.dark,
    margin: "0px",
    marginTop: "2%",
    marginLeft: "2%",
  },
  title: {
    textAlign: "left",
    fontFamily: theme.palette.primary.textFont,
    fontSize: "24px",
    fontWeight: "600",
    color: theme.palette.secondary.dark,
    margin: "0px",
    marginTop: "2%",
    marginLeft: "2%",
  },
});

//This component exports the typetrack. button screen : it is also the welcome screen of the application when you log in
export default function Home() {
  const theme = useTheme();
  const styles = useStyles(theme);
  const { user } = useContext(Context);
  return (
    <div css={styles.root}>
      <ChannelHeader name={"Home"} />
      <div css={{ marginTop: "2%" }}>
        <span css={styles.typetrack}> typetrack. </span>
        <span css={styles.text}>
          {" "}
          Welcome{" "}
          <span css={{ color: theme.palette.misc.main, fontWeight: "600" }}>
            {user.username}{" "}
          </span>{" "}
          !
        </span>
      </div>
      <span css={styles.title}> How do I get started ? </span>
      <Divider
        variant="left"
        css={{
          backgroundColor: theme.palette.primary.contrastText,
          marginTop: "1%",
          marginLeft: "2%",
          width: "30%",
        }}
      />
      <p css={styles.text}>
        {
          "If you haven't created or joined a channel, please do and start talking with your friends ! If you already did, please click on a channel."
        }
      </p>
      <span css={styles.title}> How do I change my username ? </span>
      <Divider
        variant="left"
        css={{
          backgroundColor: theme.palette.primary.contrastText,
          marginTop: "1%",
          marginLeft: "2%",
          width: "30%",
        }}
      />
      <p css={styles.text}>
        {
          "By default, your username is your email address. Fortunately, you can change your username by clicking the settings icon on the left bottom of your screen. This page also allows you to log out."
        }
      </p>
      <p css={styles.text}>{"The icon should look like this:"}</p>
      <SettingsIcon
        sx={{
          fill: theme.palette.misc.main,
          marginLeft: "2%",
        }}
      />
      <span css={styles.title}> Changelog </span>
      <Divider
        variant="left"
        css={{
          backgroundColor: theme.palette.primary.contrastText,
          marginTop: "1%",
          marginLeft: "2%",
          width: "30%",
        }}
      />
    </div>
  );
}
