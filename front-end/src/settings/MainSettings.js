/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from "@mui/styles";
import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import {
  Tab,
  Tabs,
  Box,
  AppBar,
  IconButton,
  Toolbar,
  Paper,
  Slide,
  Dialog,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// Local
import Context from "../context/Context";

const useStyles = (theme) => ({
  root: {
    background: theme.palette.primary.main,
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//This component exports the typetrack. button screen : it is also the welcome screen of the application when you log in
export default function MainSettings({ open, setOpen }) {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const styles = useStyles(theme);
  const { setOauth } = useContext(Context);
  const elements = ["Account", "Avatar", "Themes"];
  const onClickLogout = (e) => {
    e.stopPropagation();
    setOauth(null);
  };
  return (
    <Paper sx={styles.root}>
      <Dialog
        fullScreen
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        PaperProps={{
          style: {
            backgroundColor: theme.palette.primary.main,
          },
        }}
        TransitionComponent={Transition}
      >
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
              onClick={() => setOpen(false)}
              aria-label="close"
              sx={{ ":hover": { bgcolor: theme.palette.primary.light } }}
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
                    onClick={(e) => {
                      e.preventDefault();
                    }}
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
          <Box
            sx={{
              display: "flex",
              flex: "1 1 auto",
              flexDirection: "column",
              width: "70%",
              margin: "1%",
            }}
          ></Box>
        </Box>
      </Dialog>
    </Paper>
  );
}

MainSettings.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
