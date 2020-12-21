// React Imports
import React, { FC } from "react";
import { SnackbarProvider } from "notistack";

import Rating from "./Sections/Rating";
import Description from "./Sections/Description";
import Reflection from "./Sections/Reflection";

import Header from "./Components/Header";
import Footer from "./Components/Footer";

// Redux Imports
import ReduxStore from "./Redux/Store";

// Material UI Imports
import Theme from "./Theme";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  sections: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1),
  },
}));

const App: FC = () => {
  const classes = useStyles();

  return (
    <ReduxStore>
      <Theme>
        <SnackbarProvider>
          <Paper className={classes.container}>
            <Header />
            <div className={classes.sections}>
              <Rating />
              <Description />
              <Reflection />
            </div>
            <Footer />
          </Paper>
        </SnackbarProvider>
      </Theme>
    </ReduxStore>
  );
};

export default App;
