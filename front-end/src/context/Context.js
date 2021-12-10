import React, { useState } from "react";
import { useCookies } from "react-cookie";
import PropTypes from "prop-types";

const Context = React.createContext();

export default Context;

export const Provider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [oauth, setOauth] = useState(cookies.oauth);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [channels, setChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState(null);
  //For adding a channel
  const [openDialog, setOpenDialog] = useState(false);
  //let's get what channel is being used
  const [id, setID] = useState(0);
  return (
    <Context.Provider
      value={{
        oauth: oauth,
        setOauth: (oauth) => {
          if (oauth) {
            const payload = JSON.parse(
              Buffer.from(oauth.id_token.split(".")[1], "base64").toString(
                "utf-8"
              )
            );
            oauth.email = payload.email;
            setCookie("oauth", oauth);
          } else {
            setCurrentChannel(null);
            setChannels([]);
            removeCookie("oauth");
          }
          setOauth(oauth);
        },
        channels: channels,
        drawerVisible: drawerVisible,
        setDrawerVisible: setDrawerVisible,
        setChannels: setChannels,
        currentChannel: currentChannel,
        setCurrentChannel: (channelId) => {
          const channel = channels.find((channel) => channel.id === channelId);
          setCurrentChannel(channel);
        },
        openDialog: openDialog,
        setOpenDialog: setOpenDialog,
        id: id,
        setID: setID,
      }}
    >
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};
