
import './App.css';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
var moment = require('moment'); // require

const styles = {
    messages: {
        flex: '1 1 auto',
        height: '100%',
        overflow: 'auto',
        '& ul': {
          'margin': 0,
          'padding': 0,
          'textIndent': 0,
          'listStyleType': 0,
        },
    },
    message: {
      margin: '.2rem',
      padding: '.2rem',
      boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
      // backgroundColor: '#66728E',
      ':hover': {
        backgroundColor: 'rgba(96,96,96,0.4)',
      },
    },
    small:{
      margin: '.2rem',
      padding: '.2rem',
      boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
      // backgroundColor: '#66728E',
      ':hover': {
        backgroundColor: 'rgba(96,96,96,0.4)',
      },
        opacity: 0.3,
      
    }
    
}

export default ({
  messages
}) => {

  return (
    <div css={styles.messages}>
      <ul>
        { messages.map( (message, i) => (
        <li key={i} css={styles.message}>
        <p>
          <span><b>{message.author}</b></span>
            {' '}
          <span><small css={styles.small}>{(new moment(message.creation).format('MMMM Do YYYY, h:mm:ss a')).toString()}</small></span>
        </p>
        <div>
        {
          message.content
          .split(/(\n +\n)/)
          .filter( el => el.trim() )
          .map( el => <p>{el}</p>)
        }
        </div>
        </li>
        ))}
      </ul>
      </div>
  );
}
