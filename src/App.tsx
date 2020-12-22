// React Imports
import React, { FC, lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import Header from "./Components/Header";
import Popup from "./Components/Popup";
import Footer from "./Components/Footer";
import Page from "./Components/Loading/Page";

// Redux Imports
import ReduxStore from "./Redux/Store";

// Material UI Imports
import Theme from "./Theme";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Page Imports
const Home = lazy(() => import("./Pages/Home"));

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  page: {
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
              <Popup />
              <div className={classes.page}>
                <Routes />
              </div>
              <Footer />
            </Paper>
          </SnackbarProvider>
        </BrowserRouter>
      </Theme>
    </ReduxStore>
  );
};

const Routes: FC = () => {
  return (
    <Suspense fallback={<Page />}>
      <Switch>
        <Route exact path="/popup.html">
          <Home />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default App;
