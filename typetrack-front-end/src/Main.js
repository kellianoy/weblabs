/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import Channel from './Channel'
import Channels from './Channels'

const styles = {
    main: {
      backgroundColor: '#373B44',
      flex: '1 1 auto',
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden',
    }  
}

const channels= {
  channel1: {
      name: 'CHANNEL ONE'
  },
  channel2: {
      name: 'CHANNEL TWO'
  },
  channel3: {
      name: 'CHANNEL THREE'
  } 
}

function Main() {
    return (
        <main className="App-main" css={styles.main}>
        {Channels(channels)}
        {Channel()}
      </main>
    );
}

export default Main



