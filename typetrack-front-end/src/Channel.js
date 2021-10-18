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
    },
    channelHead: {
        position: "-webkit-sticky",
        position: "sticky",
        alignSelf: "center",
        fontFamily: "Montserrat, sans-serif",
        padding: "10px",
        boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    },
    textalign: {
        fontSize: "30px",
        textAlign: "center",
    }
}

const channel = {
    name: 'channel 1'
}

function Channel() {
    return (
        <div css={styles.channel}>
            <div css={styles.channelHeads}>
                <link href="https://fonts.googleapis.com/css?family=Montserrat:100" rel="stylesheet"></link>
                <h1 css={styles.textalign}>Channel discussion #{channel.name}</h1>
            </div>
            {Messages()}
            <MessageForm addMessage={addMessage}/>
        </div>
    );
}

export default Channel