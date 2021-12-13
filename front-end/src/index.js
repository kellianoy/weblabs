import React from "react";
import ReactDOM from "react-dom";
import { CookiesProvider } from "react-cookie";
import "./index.css";
import App from "./App";
import { Provider as ContextProvider } from "./context/Context";
import * as serviceWorker from "./serviceWorker";
import "typeface-roboto";
// Layout
import CustomThemeProvider from "./themes/components/CustomThemeProvider";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <CustomThemeProvider>
      <ContextProvider>
        <CookiesProvider>
          <Router>
            <App />
          </Router>
        </CookiesProvider>
      </ContextProvider>
    </CustomThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
