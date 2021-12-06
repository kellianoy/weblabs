/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from "@mui/styles";

const useStyles = (theme) => ({
  root: {
    bgcolor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    flex: "1 1 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

//This component exports a error sentence, for a bad gateway
export default function BadGateway() {
  const styles = useStyles(useTheme());
  return (
    <main css={styles.root}>
      <div>
        An unexpected error occured, it is probably not your fault. Sorry.
      </div>
    </main>
  );
}
