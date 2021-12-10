/** @jsxImportSource @emotion/react */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// Layout
import { useTheme } from "@mui/styles";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import AppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
// Local
import Context from "../context/Context";
import ChannelUsers from "./ChannelUsers";
import AddChannel from "./AddChannel";

const useStyles = (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    display: "flex",
    flex: "1 1 auto",
    overflow: "auto",
    flexDirection: "column",
  },
  channels: {
    margin: "auto",
    padding: ".2rem .5rem",
    whiteSpace: "nowrap",
  },
  channel: {
    fontFamily: theme.palette.primary.textFont,
    fontSize: "16px",
    fontWeight: "600",
    color: theme.palette.primary.contrastText,
  },
  typetrack: {
    center: "center",
    fontFamily: theme.palette.primary.textFont,
    fontSize: "22px",
    fontWeight: "600",
    padding: "4%",
    color: theme.palette.secondary.dark,
    opacity: "1",
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
    width: "95%",
    margin: "auto",
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

//This components shows the left part of the screen with the channels list and users part
export default function Channels() {
  const theme = useTheme();
  const styles = useStyles(theme);

  //let's get what channel is being used
  //getting the oauth channels and setChannels from the context
  const { id, setID, oauth, channels, setChannels, openDialog, setOpenDialog } =
    useContext(Context);
  const navigate = useNavigate();
  //Setting the id as the params of the page
  //Setting the value for tabs
  const [value, setValue] = useState(false);
  const handleChange = (e, newValue) => {
    e.stopPropagation();
    setValue(newValue);
  };
  const firstId = useParams()["*"];
  //use effect using the get channels
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data: channels } = await axios.get(
          `http://localhost:3001/users/channels/${oauth.email}`,
          {
            headers: {
              Authorization: `Bearer ${oauth.access_token}`,
            },
          }
        );
        setChannels(channels);
        //set the current channel to the one in parameters
        setID(firstId);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [oauth, setID, openDialog]);

  //useEffect for ID
  useEffect(() => {
    const update = () => {
      if (id) setValue(channels.findIndex((channel) => channel.id === id));
    };
    update();
  }, [id, channels, setChannels]);

  return (
    <Box css={styles.root}>
      {openDialog && <AddChannel />}
      <AppBar
        elevation={0}
        position="relative"
        sx={{
          bottom: "auto",
          top: 0,
        }}
      >
        <StyledTab
          variant="fullWidth"
          label="typetrack."
          sx={styles.typetrack}
          onClick={(e) => {
            e.preventDefault();
            setID("");
            setValue(false);
            //go to start page
            navigate(`/channels/`);
          }}
        />
        <Divider
          variant="middle"
          css={{
            backgroundColor: theme.palette.primary.contrastText,
            width: "20%",
            margin: "auto",
          }}
        />
        <div css={{ height: "10%" }}></div>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          height: "25%",
        }}
      >
        <List sx={{ maxHeight: "100%", overflow: "auto", textAlign: "center" }}>
          {channels.length !== 0 && (
            <StyledTabs
              orientation="vertical"
              value={value}
              onChange={handleChange}
            >
              {channels.map((channel, i) => {
                return (
                  <StyledTab
                    wrapped
                    label={channel.name}
                    key={i}
                    value={i}
                    css={styles.channel}
                    onClick={(e) => {
                      e.preventDefault();
                      //go to this channel
                      setID(channel.id);
                      navigate(`/channels/${channel.id}`);
                    }}
                  />
                );
              })}
            </StyledTabs>
          )}
          <ListItem>
            <ListItemText
              primary="Add a channel"
              primaryTypographyProps={{
                fontSize: 20,
                fontWeight: "400",
                color: theme.palette.secondary.main,
                textAlign: "left",
              }}
            />
            <Tooltip title="Create or join a channel" placement="right">
              <Fab
                sx={{
                  backgroundColor: theme.palette.misc.main,
                  ":hover": {
                    backgroundColor: theme.palette.misc.main,
                    opacity: "0.85",
                  },
                }}
                size="small"
                aria-label="add"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenDialog(true);
                }}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          </ListItem>
        </List>
      </Box>
      <ChannelUsers />
    </Box>
  );
}
