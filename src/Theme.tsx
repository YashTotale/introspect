//React Imports
import React from "react";

//Material UI Imports
import {
  useMediaQuery,
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
  colors,
} from "@material-ui/core";

export const alternativeFont = "Arial, sans-serif";

const Theme: React.FC = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = createMuiTheme({
    typography: {
      fontFamily: "Palatino, Georgia, Serif",
      fontWeightBold: 600,
    },
    palette: {
      type: prefersDarkMode ? "dark" : "light",
      primary: colors.amber,
      secondary: colors.lightBlue,
    },
    spacing: 8,
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
