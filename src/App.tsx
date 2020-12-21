// React Imports
import React, { FC } from "react";

import Rating from "./Sections.tsx/Rating";
import Description from "./Sections.tsx/Description";
import Reflection from "./Sections.tsx/Reflection";

import SnackBar from "./Components/Snackbar";

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
    padding: theme.spacing(1),
  },
}));

const App: FC = () => {
  const classes = useStyles();

  return (
    <ReduxStore>
      <Theme>
        <Paper className={classes.container}>
          <Rating />
          <Description />
          <Reflection />
          <SnackBar />
        </Paper>
      </Theme>
    </ReduxStore>
  );
};

export default App;
