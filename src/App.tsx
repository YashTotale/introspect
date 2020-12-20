// React Imports
import React, { FC } from "react";
import Rating from "./Components/Rating";
import Description from "./Components/Description";
import Reflection from "./Components/Reflection";

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
    <Theme>
      <Paper className={classes.container}>
        <Rating />
        <Description />
        <Reflection />
      </Paper>
    </Theme>
  );
};

export default App;
