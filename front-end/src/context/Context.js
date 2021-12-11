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
  //let's get what channel is being used
  const [id, setID] = useState("");
  const [user, setUser] = useState({});
  const [updateChannels, setUpdateChannels] = useState(false);
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
        id: id,
        setID: setID,
        user: user,
        setUser: setUser,
        updateChannels: updateChannels,
        setUpdateChannels: setUpdateChannels,
      }}
    >
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};
