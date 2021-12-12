/** @jsxImportSource @emotion/react */
import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useContext,
  useState,
} from "react";
// Layout
import { useTheme } from "@mui/styles";
import { Toolbar, Box, Tooltip, IconButton, Avatar } from "@mui/material";
import Gravatar from "react-gravatar";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditIcon from "@mui/icons-material/Edit";
// Markdown
import { unified } from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";
// Time
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(calendar);
dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  calendar: {
    sameElse: "DD/MM/YYYY hh:mm A",
  },
});
import PropTypes from "prop-types";
import Context from "../context/Context";
import DeleteMessage from "./DeleteMessage";
import ModifyMessage from "./ModifyMessage";

const useStyles = (theme) => ({
  root: {
    position: "relative",
    flex: "1 1 auto",
    overflow: "auto",
    "& ul": {
      margin: "1%",
      padding: 0,
      textIndent: 0,
      listStyleType: 0,
    },
  },
  author: {
    marginRight: "1%",
    color: theme.palette.secondary.dark,
    fontFamily: theme.palette.secondary.textFont,
    fontSize: "20px",
    fontWeight: "800",
    "&:hover": {
      textDecoration: `underline`,
      textUnderlineOffset: "4px",
    },
  },
  date: {
    color: theme.palette.secondary.dark,
    fontFamily: theme.palette.secondary.textFont,
    fontWeight: "600",
    fontSize: "12px",
    opacity: "0.75",
  },
  message: {
    padding: "0.01%",
    paddingLeft: "0.5%",
    paddingRight: "0.5%",
    color: theme.palette.secondary.light,
    fontFamily: theme.palette.primary.textFont,
    fontWeight: "600",
    fontSize: "15px",

    "&:hover": {
      bgcolor: theme.palette.primary.dark,
    },
  },
  fabWrapper: {
    position: "absolute",
    right: 0,
    top: 0,
    width: "50px",
  },
  fab: {
    position: "fixed !important",
    top: 0,
    width: "50px",
  },
  icons: {
    fill: theme.palette.secondary.dark,
  },
  iconButtons: {
    marginLeft: "1%",
    ":hover": { bgcolor: theme.palette.primary.main },
  },
});

//This component lists messages
const List = forwardRef(function List({ messages, onScrollDown }, ref) {
  const theme = useTheme();
  const styles = useStyles(theme);
  const { oauth } = useContext(Context);
  const [openDelete, setOpenDelete] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [currentMessage, setCurrentMessage] = useState({});

  // Expose the `scroll` action
  useImperativeHandle(ref, () => ({
    scroll: scroll,
  }));
  const rootEl = useRef(null);
  const scrollEl = useRef(null);
  const scroll = () => {
    scrollEl.current.scrollIntoView();
  };
  // See https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj
  const throttleTimeout = useRef(null); // react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    const rootNode = rootEl.current; // react-hooks/exhaustive-deps
    const handleScroll = () => {
      if (throttleTimeout.current === null) {
        throttleTimeout.current = setTimeout(() => {
          throttleTimeout.current = null;
          const { scrollTop, offsetHeight, scrollHeight } = rootNode; // react-hooks/exhaustive-deps
          onScrollDown(scrollTop + offsetHeight < scrollHeight);
        }, 200);
      }
    };
    handleScroll();
    rootNode.addEventListener("scroll", handleScroll);
    return () => rootNode.removeEventListener("scroll", handleScroll);
  });
  return (
    <div css={styles.root} ref={rootEl}>
      {openDelete && (
        <DeleteMessage
          open={openDelete}
          setOpen={setOpenDelete}
          message={currentMessage}
        />
      )}
      {openModify && (
        <ModifyMessage
          open={openModify}
          setOpen={setOpenModify}
          message={currentMessage}
        />
      )}
      <ul>
        {messages.map((message, i) => {
          const { value } = unified()
            .use(markdown)
            .use(remark2rehype)
            .use(html)
            .processSync(message.content);
          return (
            <li key={i} css={styles.message}>
              <Toolbar disableGutters>
                <Avatar
                  sx={{
                    bgcolor: theme.palette.primary.dark,
                    marginRight: "1%",
                    width: "36px",
                    height: "36px",
                  }}
                >
                  <Gravatar email={message.author} size={36} default="retro" />
                </Avatar>
                <span css={styles.author}>{message.username}</span>
                <span css={styles.date}>
                  {dayjs().calendar(message.creation)}
                </span>
                <Box sx={{ flexGrow: 1 }} />
                {message.author === oauth.email && (
                  <>
                    <Tooltip arrow title="Edit message" placement="bottom">
                      <IconButton
                        sx={styles.iconButtons}
                        onClick={() => {
                          setOpenModify(true);
                          setCurrentMessage(message);
                        }}
                      >
                        <EditIcon css={styles.icons} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip arrow title="Delete message" placement="bottom">
                      <IconButton
                        sx={styles.iconButtons}
                        onClick={() => {
                          setOpenDelete(true);
                          setCurrentMessage(message);
                        }}
                      >
                        <DeleteOutlineOutlinedIcon
                          css={[
                            styles.icons,
                            { fill: theme.palette.misc.owner },
                          ]}
                        />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              </Toolbar>
              <Box
                sx={styles.message}
                dangerouslySetInnerHTML={{ __html: value }}
              />
            </li>
          );
        })}
      </ul>
      <div ref={scrollEl} />
    </div>
  );
});

List.propTypes = {
  onScrollDown: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
};

export default List;
