/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";

const styles = {
    header: {
      backgroundColor: '#14202F',
      flexShrink: 0,
    },
    typetrack: {
      textAlign: "left",
      fontSize: "28px",
      fontFamily: "Montserrat, sans-serif",
      marginLeft: "26px",
    }
}

function Header() {
  return (
    <header className="App-header" css={styles.header}>
      <link href="https://fonts.googleapis.com/css?family=Montserrat:100" rel="stylesheet"></link>
      <h1 css={styles.typetrack}>typetrack</h1>
    </header>
  );
}

export default Header