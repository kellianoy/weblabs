/** @jsxImportSource @emotion/react */
import { useContext, useRef, useState, useEffect } from "react";
import axios from "axios";
// Layout
import { useTheme } from "@mui/styles";
import { Fab } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// Local
import Form from "./Form";
import List from "./List";
import Context from "../context/Context";
import { useNavigate, useParams } from "react-router-dom";
import ChannelHeader from "./ChannelHeader";

const useStyles = (theme) => ({
  root: {
    height: "100%",
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflowX: "auto",
    backgroundColor: theme.palette.primary.light,
  },
  fab: {
    position: "absolute !important",
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabDisabled: {
    display: "none !important",
  },
  icons: {
    color: theme.palette.secondary.dark,
  },
});

//This component shows the content of a channel
export default function Channel() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { channels, oauth } = useContext(Context);
  const channel = channels.find((channel) => channel.id === id);
  const theme = useTheme();
  const styles = useStyles(theme);
  const listRef = useRef();
  const [messages, setMessages] = useState([]);
  const [scrollDown, setScrollDown] = useState(false);
  const addMessage = (message) => {
    setMessages([...messages, message]);
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data: messages } = await axios.get(
          `http://localhost:3001/channels/${id}/messages`,
          {
            headers: {
              // TODO: secure the request
            },
          }
        );
        setMessages(messages);
        if (listRef.current) {
          listRef.current.scroll();
        }
      } catch (err) {
        navigate("/404");
      }
    };
    fetch();
  }, [id, oauth, navigate]);
  const onScrollDown = (scrollDown) => {
    setScrollDown(scrollDown);
  };
  const onClickScroll = () => {
    listRef.current.scroll();
  };

  // On refresh, context.channel is not yet initialized
  if (!channel) {
    return <div>loading</div>;
  }
  return (
    <div css={styles.root}>
      <ChannelHeader name={channel.name} />
      <List
        channel={channel}
        messages={messages}
        onScrollDown={onScrollDown}
        ref={listRef}
      />
      <Form addMessage={addMessage} channel={channel} user={oauth} />
      <Fab
        color="primary"
        aria-label="Latest messages"
        css={[styles.fab, scrollDown || styles.fabDisabled]}
        onClick={onClickScroll}
      >
        <ArrowDropDownIcon />
      </Fab>
    </div>
  );
}
