/** @jsxImportSource @emotion/react */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// Layout
import { useTheme } from "@mui/styles";
import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import SettingsIcon from "@mui/icons-material/Settings";
import Gravatar from "react-gravatar";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "@mui/material/AppBar";
import Tooltip from "@mui/material/Tooltip";
import ArrowRight from "@mui/icons-material/ArrowRight";
// Local
import Context from "../context/Context";
import Useritem from "./Useritem";

const useStyles = (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
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
    width: "90%",
    margin: "auto",
    marginTop: "4px",
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
  const { oauth, setOauth, channels, setChannels } = useContext(Context);
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
    };
    getUsers(id);
  }, [id, setID]);
  const [value, setValue] = useState(0);
  const handleChange = (e, newValue) => {
    e.stopPropagation();
    setValue(newValue);
  };

  const onClickLogout = (e) => {
    e.stopPropagation();
    setOauth(null);
  };

  return (
    <div css={styles.root}>
      <Box sx={{ flexGrow: 1 }}>
        <StyledTabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          variant="scrollable"
        >
          <StyledTab
            wrapped
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
          <Divider
            variant="middle"
            css={{
              backgroundColor: theme.palette.primary.contrastText,
              width: "20%",
              margin: "auto",
            }}
          />
          {!channels.length && (
            <StyledTab wrapped label="No channels" css={styles.channel} />
          )}
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
        <Divider
          variant="middle"
          css={{ backgroundColor: theme.palette.primary.contrastText }}
        />
      </Box>
      <Box>
        {channelUsers.map((user, i) => {
          return (
            <Useritem
              user={user}
              key={i}
              owner={i === 0 ? "Channel owner" : "User"}
            />
          );
        })}
      </Box>
      <AppBar
        position="absolute"
        sx={{
          backgroundColor: theme.palette.primary.dark,
          top: "auto",
          bottom: 0,
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemAvatar>
              <Avatar
                sx={{
                  bgcolor: theme.palette.misc.main,
                  margin: "auto",
                  width: "36px",
                  height: "36px",
                }}
              >
                <Gravatar email={oauth.email} size={36} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={oauth.email}
              primaryTypographyProps={{
                fontSize: 16,
                fontWeight: "400",
                letterSpacing: 0,
                color: theme.palette.secondary.main,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
              secondary="jeune âme en perdition"
              secondaryTypographyProps={{
                fontSize: 14,
                color: theme.palette.primary.contrastText,
              }}
            />
            <Tooltip title="Settings">
              <IconButton
                onClick={onClickLogout}
                color="misc"
                size="large"
                sx={{
                  color: theme.palette.misc.main,
                  "& svg": {
                    color: theme.palette.misc.main,
                    transition: "0.2s",
                    transform: "translateX(0) rotate(0)",
                  },
                  "&:hover, &:focus": {
                    bgcolor: "unset",
                    opacity: "0.85",
                    "& svg:first-of-type": {
                      transform: "translateX(-4px) rotate(-20deg)",
                    },
                    "& svg:last-of-type": {
                      right: 0,
                      opacity: 1,
                    },
                  },
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    height: "80%",
                    display: "block",
                    left: 0,
                    width: "1px",
                    bgcolor: "divider",
                  },
                }}
              >
                <SettingsIcon />
                <ArrowRight
                  sx={{ position: "absolute", right: 4, opacity: 0 }}
                />
              </IconButton>
            </Tooltip>
          </ListItem>
        </List>
      </AppBar>
    </div>
  );
}
