/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import MessageForm from './MessageForm';
import Messages from "./Messages";
import addMessage from "./Messages";

const styles = {
    channel: {
        height: '100%',
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: '#212529',
    }
}


const channel = {
    name: 'channel 1'
}

function Channel() {
    return (
        <div css={styles.channel}>
            {Messages(channel)}
            <MessageForm addMessage={addMessage}/>
        </div>
    );
}

export default Channel