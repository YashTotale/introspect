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
    overrides: {
      MuiTooltip: {
        arrow: {
          color: "rgb(0, 0, 0, 0.76)",
        },
        tooltip: {
          fontFamily: alternativeFont,
          fontWeight: 600,
          fontSize: "0.72rem",
          backgroundColor: "rgb(0, 0, 0, 0.76)",
        },
      },
      MuiButton: {
        label: {
          fontFamily: alternativeFont,
          fontWeight: 600,
        },
      },
      MuiMenuItem: {
        root: {
          fontFamily: alternativeFont,
          fontWeight: 600,
        },
      },
    },
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
