import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto'
// Layout
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ContextProvider } from './App';
import { ChannelProvider } from './Main';
const theme = createTheme({
  palette: {
    mode: 'dark',
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ChannelProvider>
      <ContextProvider>
        <CookiesProvider>
          <ThemeProvider theme={theme}>
           <App />
          </ThemeProvider>
        </CookiesProvider>
      </ContextProvider>
    </ChannelProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
