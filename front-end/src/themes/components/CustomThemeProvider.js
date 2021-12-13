import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import getTheme from "./Switch";
import PropTypes from "prop-types";

//Inspired by https://www.58bits.com/blog/2020/05/27/material-ui-theme-switcher-react

// eslint-disable-next-line no-unused-vars
export const CustomThemeContext = React.createContext({
  currentTheme: "cobalt",
  setTheme: null,
});

const CustomThemeProvider = ({ children }) => {
  // Read current theme from localStorage or maybe from an api
  const currentTheme = localStorage.getItem("appTheme") || "cobalt";
  // State to hold the selected theme name
  const [themeName, _setThemeName] = useState(currentTheme);

  // Retrieve the theme object by theme name
  const theme = getTheme(themeName);

  // Wrap _setThemeName to store new theme names in localStorage
  const setThemeName = (name) => {
    localStorage.setItem("appTheme", name);
    _setThemeName(name);
  };

  return (
    <CustomThemeContext.Provider
      value={{
        currentTheme: themeName,
        setTheme: setThemeName,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};

export default CustomThemeProvider;

CustomThemeProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
