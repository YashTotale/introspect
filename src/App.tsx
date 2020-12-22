// React Imports
import React, { FC } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import Home from "./Pages/Home";

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
        <BrowserRouter>
          <SnackbarProvider>
            <Paper className={classes.container}>
              <Header />
              <div className={classes.sections}>
                <Switch>
                  <Route exact path="/popup.html">
                    <Home />
                  </Route>
                  {/* <Route path="/">
                    <Home />
                  </Route> */}
                </Switch>
              </div>
              <Footer />
            </Paper>
          </SnackbarProvider>
        </BrowserRouter>
      </Theme>
    </ReduxStore>
  );
};

export default App;
