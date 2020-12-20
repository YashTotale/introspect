// React Imports
import React, { FC } from "react";
import Rating from "./Components/Rating";

// Material UI Imports
import Theme from "./Theme";
import { Divider, Paper } from "@material-ui/core";
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
    <Theme>
      <Paper className={classes.container}>
        <Rating />
      </Paper>
    </Theme>
  );
};

export default App;
