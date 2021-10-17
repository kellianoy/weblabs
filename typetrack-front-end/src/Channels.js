/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";

const styles = {
    channels: {
      minWidth: "7.5%",
      backgroundColor: '#192E46',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
    },
    channeldiv: {
        height: '40px',
        lineHeight: '40px',
        textAlign: "center",
        ':hover': {
            backgroundColor: 'rgba(96,96,96,0.4)'
          },
    },
    channel: {
        color: 'rgba(190,190,190,1)',
        ':hover': {
            color: 'rgba(255,255,255,1',
        },
    },
    ul: {
        listStyleType:"none",
        margin: "0px",
        padding: "0px",
    }
}

const channels = [
    {
        "name": "channel 1",
    },
    {
        "name": "channel 2",
    },
    {
        "name": "channel 3",
    },
    {
        "name": "channel 4",
    }
];

function Channel() {
   
    return (
        <div css={styles.channels}>
         <ul css={styles.ul}>
            { channels.map((channel, i) => (
                <li key={i} css={styles.channeldiv}>
                <div>
                    <span css={styles.channel}>{channel.name}</span>
                </div>
             </li>
            ))}
        </ul>
        </div>
    );
}

export default Channel