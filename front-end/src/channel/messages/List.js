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
import {
  Toolbar,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditIcon from "@mui/icons-material/Edit";
// Markdown
import { unified } from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";
// Time
import dayjs from "dayjs";

import PropTypes from "prop-types";
import Context from "../../context/Context";
import DeleteMessage from "./fonctionnalities/DeleteMessage";
import ModifyMessage from "./fonctionnalities/ModifyMessage";
import MyGravatar from "../../settings/tabs/MyGravatar";
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
});

//This component lists messages
const List = forwardRef(function List({ messages, onScrollDown }, ref) {
  const theme = useTheme();
  const styles = useStyles(theme);
  const { oauth, channelUsers } = useContext(Context);
  const [openDelete, setOpenDelete] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(null);

  //To handle the menu
  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (event, activate) => {
    if (activate) {
      event.preventDefault();
      setContextMenu(
        contextMenu === null
          ? {
              mouseX: event.clientX - 2,
              mouseY: event.clientY - 4,
            }
          : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
            // Other native context menus might behave different.
            // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
            null
      );
    }
  };

  const handleClose = () => {
    setContextMenu(null);
  };

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
          //Current date
          const mDate = dayjs(new Date(messages[i].creation / 1000));
          const author = message.author === oauth.email;
          //Is the same person posting ?
          const samePerson =
            i >= 1 && messages[i].author === messages[i - 1].author;
          var lDate;
          var closeDate = false;
          //Is it a close date ?
          if (samePerson && i >= 1) {
            lDate = dayjs(new Date(messages[i - 1].creation / 1000));
            closeDate =
              mDate.$D === lDate.$D &&
              mDate.$M === lDate.$M &&
              mDate.$y === lDate.$y &&
              (mDate.$H - lDate.$H) * 60 + (mDate.$m - lDate.$m) <= 10;
          }
          const { value } = unified()
            .use(markdown)
            .use(remark2rehype)
            .use(html)
            .processSync(message.content);
          const currentUser = channelUsers.find(
            (user) => user.email === message.author
          );

          return (
            <li key={i} css={styles.message}>
              {author && (
                <Menu
                  PaperProps={{
                    style: {
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                  open={contextMenu !== null}
                  onClose={handleClose}
                  anchorReference="anchorPosition"
                  anchorPosition={
                    contextMenu !== null
                      ? {
                          top: contextMenu.mouseY,
                          left: contextMenu.mouseX,
                        }
                      : undefined
                  }
                >
                  <MenuItem
                    data-which-message={i}
                    onClick={(e) => {
                      var { whichMessage } = e.currentTarget.dataset;
                      console.log(whichMessage);
                      setCurrentMessage(messages[whichMessage]);
                      setOpenModify(true);
                      handleClose();
                    }}
                  >
                    <span css={{ color: theme.palette.secondary.dark }}>
                      Edit message
                    </span>
                    <IconButton sx={styles.iconButtons}>
                      <EditIcon css={styles.icons} />
                    </IconButton>
                  </MenuItem>
                  <MenuItem
                    data-which-message={i}
                    onClick={(e) => {
                      var { whichMessage } = e.currentTarget.dataset;
                      setCurrentMessage(messages[whichMessage]);
                      setOpenDelete(true);
                      handleClose();
                    }}
                  >
                    <span css={{ color: theme.palette.misc.owner }}>
                      Delete message
                    </span>
                    <IconButton sx={styles.iconButtons}>
                      <DeleteOutlineOutlinedIcon
                        css={[styles.icons, { fill: theme.palette.misc.owner }]}
                      />
                    </IconButton>
                  </MenuItem>
                </Menu>
              )}
              {
                //We want to show off, so let's prevent showing the user header if he already sent a message
                !closeDate && (
                  <Toolbar disableGutters>
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.primary.dark,
                        marginRight: "1%",
                        width: "36px",
                        height: "36px",
                      }}
                    >
                      <MyGravatar
                        email={message.author}
                        md5={currentUser ? currentUser.avatar : ""}
                        size={36}
                      />
                    </Avatar>
                    <span css={styles.author}>
                      {currentUser ? currentUser.username : ""}
                    </span>
                    <span css={styles.date}>
                      {
                        //Fixing date that was wrong before
                        mDate.format("ddd, MMM D, YYYY h:mm A")
                      }
                    </span>
                    <Box sx={{ flexGrow: 1 }} />
                  </Toolbar>
                )
              }

              <Box
                onContextMenu={(e) => {
                  handleContextMenu(e, author);
                }}
                sx={[
                  styles.message,
                  author && {
                    "&:hover": {
                      bgcolor: theme.palette.primary.dark,
                    },
                  },
                ]}
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
