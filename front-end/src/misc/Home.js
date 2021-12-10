/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from "@mui/styles";
import ChannelHeader from "../channel/ChannelHeader";
const useStyles = (theme) => ({
  root: {
    flex: "1 1",
    display: "flex",
    flexDirection: "column",
    background: theme.palette.primary.light,
  },
  card: {
    textAlign: "center",
  },
  icon: {
    width: "30%",
    fill: theme.palette.secondary.dark,
  },
});

//This component exports the typetrack. button screen : it is also the welcome screen of the application when you log in
export default function Home() {
  const styles = useStyles(useTheme());
  return (
    <div css={styles.root}>
      <ChannelHeader name={"Home"} />
    </div>
  );
}
