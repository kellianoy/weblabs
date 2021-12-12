/** @jsxImportSource @emotion/react */
import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";
// Layout
import { useTheme } from "@mui/styles";
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

const useStyles = (theme) => ({
  root: {
    position: "relative",
    flex: "1 1 auto",
    overflow: "auto",
    "& ul": {
      margin: 0,
      marginLeft: "1%",
      padding: 0,
      textIndent: 0,
      listStyleType: 0,
    },
  },
  author: {
    padding: "2px",
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
    padding: "2px",
    color: theme.palette.secondary.dark,
    fontFamily: theme.palette.secondary.textFont,
    fontWeight: "600",
    fontSize: "12px",
    opacity: "0.75",
  },
  message: {
    padding: "0px",
    margin: "0px",
    color: theme.palette.secondary.light,
    fontFamily: theme.palette.secondary.textFont,
    fontWeight: "600",
    fontSize: "14px",
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
});

//This component lists messages
const List = forwardRef(function List({ messages, onScrollDown }, ref) {
  const styles = useStyles(useTheme());
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
      <ul>
        {messages.map((message, i) => {
          const { value } = unified()
            .use(markdown)
            .use(remark2rehype)
            .use(html)
            .processSync(message.content);
          return (
            <li key={i} css={styles.message}>
              <p>
                <span css={styles.author}>{message.username}</span>
                <span css={styles.date}>
                  {dayjs().calendar(message.creation)}
                </span>
              </p>
              <div
                css={styles.message}
                dangerouslySetInnerHTML={{ __html: value }}
              ></div>
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
