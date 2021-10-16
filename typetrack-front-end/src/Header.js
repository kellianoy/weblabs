/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";

const styles = {
    header: {
      backgroundColor: 'rgba(255,255,255,.3)',
      flexShrink: 0,
    },
    typetrack: {
      textAlign: "center",
      fontFamily: "Montserrat, sans-serif",
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