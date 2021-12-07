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
import Useritem from "./Useritem";
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

export default function Channels() {
  const theme = useTheme();
  const styles = useStyles(theme);
  //let's get what channel is being used
  const [id, setID] = useState(useParams()["*"]);
  const { oauth, channels, setChannels } = useContext(Context);
  //Setting a hook for a list of channel users
  const [channelUsers, setChannelUsers] = useState([]);
  const navigate = useNavigate();
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
        if (id)
          setValue(channels.findIndex((channel) => channel.id === id) + 1);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
    //get the users of the channel
  }, [oauth, setChannels]);
  //UseEffect() for the users : getting the users and refreshing the list each time
  useEffect(() => {
    const getUsers = async (channel) => {
      try {
        if (id) {
          const { data: users } = await axios.get(
            `http://localhost:3001/channels/users/${channel}`,
            {
              headers: {
                Authorization: `Bearer ${oauth.access_token}`,
              },
            }
          );
          setChannelUsers(users);
        } else setChannelUsers([]);
      } catch (err) {
        console.error(err);
      }
    };
    getUsers(id);
  }, [id, setID]);
  const [value, setValue] = useState(0);
  const handleChange = (e, newValue) => {
    e.stopPropagation();
    setValue(newValue);
  };

  return (
    <Box css={styles.root}>
      <AppBar
        elevation={0}
        position="relative"
        sx={{
          bottom: "auto",
          top: 0,
        }}
      >
        <StyledTabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
        >
          <StyledTab
            variant="fullWidth"
            label="typetrack."
            value={0}
            key={0}
            sx={styles.typetrack}
            onClick={(e) => {
              e.preventDefault();
              //go to this channel
              setID();
              navigate(`/channels/`);
            }}
          />
        </StyledTabs>
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
                    key={i + 1}
                    value={i + 1}
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
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          </ListItem>
        </List>
      </Box>

      <Divider
        variant="middle"
        css={{ backgroundColor: theme.palette.primary.contrastText }}
      />
      <Box
        sx={{
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
        }}
      >
        <List sx={{ maxHeight: "100%", overflow: "auto" }}>
          {channelUsers.map((user, i) => {
            return (
              <Useritem
                user={user}
                key={i}
                owner={i === 0 ? "Channel owner" : "User"}
              />
            );
          })}
        </List>
      </Box>
    </Box>
  );
}
