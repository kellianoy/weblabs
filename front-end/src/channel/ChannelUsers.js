/** @jsxImportSource @emotion/react */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
// Layout
import { useTheme } from "@mui/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Useritem from "./Useritem";
import Divider from "@mui/material/Divider";
import Transition from "@mui/material/Zoom";
//Local
import Context from "../context/Context";

export default function ChannelUsers() {
  const theme = useTheme();
  //Setting a hook for a list of channel users
  const [channelUsers, setChannelUsers] = useState([]);
  const [channel, setChannel] = useState({});
  //let's get what channel is being used
  const { oauth, id, setID } = useContext(Context);
  //UseEffect() for the users : getting the users and refreshing the list each time
  useEffect(() => {
    const getUsers = async () => {
      try {
        if (id) {
          const { data: users } = await axios.get(
            `http://localhost:3001/channels/users/${id}`,
            {
              headers: {
                Authorization: `Bearer ${oauth.access_token}`,
              },
            }
          );
          const { data: channel } = await axios.get(
            `http://localhost:3001/channels/${id}`,
            {
              headers: {
                Authorization: `Bearer ${oauth.access_token}`,
              },
            }
          );
          setChannel(channel);
          setChannelUsers(users);
        } else setChannelUsers([]);
      } catch (err) {
        console.error(err);
      }
    };
    getUsers();
  }, [id, setID]);
  const checked = id !== "";
  return (
    <Box
      sx={{
        display: "flex",
        flex: "1 1 auto",
        flexDirection: "column",
      }}
    >
      <Transition in={checked}>
        <Box>
          {channelUsers.length !== 0 && (
            <Divider
              variant="middle"
              css={{ backgroundColor: theme.palette.primary.contrastText }}
            />
          )}
          <List sx={{ maxHeight: "100%", overflow: "auto" }}>
            {channelUsers.map((user, i) => {
              return (
                <Useritem
                  user={user}
                  key={i}
                  owner={channel.owner === user.id ? true : false}
                />
              );
            })}
          </List>
        </Box>
      </Transition>
    </Box>
  );
}
