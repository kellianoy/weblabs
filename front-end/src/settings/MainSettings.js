/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from "@mui/styles";
import { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Tab,
  Tabs,
  Box,
  AppBar,
  IconButton,
  Toolbar,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate, Route, Routes } from "react-router-dom";
// Local
import Context from "../context/Context";
import Account from "./Account";
import Avatars from "./Avatars";
import Themes from "./Themes";

const useStyles = (theme) => ({
  root: {
    background: theme.palette.primary.main,
    width: "100%",
    height: "100%",
    overflow: "auto",
  },
  title: {
    fontFamily: theme.palette.primary.textFont,
    fontWeight: "600",
    fontSize: "28px",
    color: theme.palette.secondary.dark,
    marginLeft: "2%",
  },
  tab: {
    fontFamily: theme.palette.primary.textFont,
    fontSize: "16px",
    fontWeight: "600",
    color: theme.palette.primary.contrastText,
  },
});

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))(({ theme }) => ({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    bgcolor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    width: "100%",
    height: "30%",
    margin: "auto",
    backgroundColor: theme.palette.misc.main,
  },
}));

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    color: theme.palette.primary.contrastText,
    marginTop: "2px",
    "&.Mui-selected": {
      color: theme.palette.misc.main,
    },
    "&:hover": {
      borderRadius: "4px",
      backgroundColor: theme.palette.primary.light,
    },
  })
);

//This component exports the typetrack. button screen : it is also the welcome screen of the application when you log in
export default function MainSettings() {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const styles = useStyles(theme);
  const { setOauth, setUser } = useContext(Context);
  const elements = ["Account", "Avatars", "Themes"];
  const paths = ["account", "avatars", "themes"];
  const navigate = useNavigate();
  const onClickLogout = (e) => {
    e.stopPropagation();
    setUser({});
    setOauth(null);
  };
  return (
    <div css={styles.root}>
      <AppBar
        sx={{
          position: "relative",
          bgcolor: theme.palette.primary.dark,
        }}
      >
        <Toolbar>
          <span css={styles.title}>Settings</span>
          <Box sx={{ flexGrow: "1" }} />
          <IconButton
            edge="start"
            onClick={() => {
              navigate("/channels");
            }}
            aria-label="close"
            sx={{ ":hover": { bgcolor: theme.palette.primary.main } }}
          >
            <CloseIcon sx={{ fill: theme.palette.secondary.dark }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          flex: "1 1 auto",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            marginLeft: "1%",
            marginTop: "0.5%",
          }}
        >
          <StyledTabs
            orientation="vertical"
            value={value}
            onChange={(e, newValue) => {
              e.stopPropagation();
              setValue(newValue);
            }}
          >
            {elements.map((element, i) => {
              return (
                <StyledTab
                  wrapped
                  label={element}
                  key={i}
                  value={i}
                  sx={styles.tab}
                  component={Link}
                  to={paths[i]}
                />
              );
            })}
            <StyledTab
              wrapped
              label="Log out"
              key={elements.lenght + 1}
              value={elements.lenght + 1}
              sx={[styles.tab, { color: theme.palette.misc.owner }]}
              onClick={onClickLogout}
            />
          </StyledTabs>
        </Box>
        <Divider
          orientation="vertical"
          sx={{
            bgcolor: theme.palette.primary.contrastText,
            height: "90%",
            margin: "auto",
            marginLeft: "1%",
          }}
          flexItem
        />
        <Routes>
          <Route path={paths[0]} element={<Account />} />
          <Route path={paths[1]} element={<Avatars />} />
          <Route path={paths[2]} element={<Themes />} />
        </Routes>
      </Box>
    </div>
  );
}
