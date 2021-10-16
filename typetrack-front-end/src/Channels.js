/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";

const styles = {
    channels: {
      minWidth: "10%",
      backgroundColor: '#373B44',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
    },
    channel: {
        ':hover': {
            backgroundColor: 'rgba(255,255,255,.2)',
          },
    }
}

function Channel() {
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
    return (
        <div css={styles.channels}>
         <ul>
            { channels.map((channel, i) => (
                <li key={i}>
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