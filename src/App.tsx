// React Imports
import React, { FC } from "react";
import Rating from "./Components/Rating";

// Util Imports
import { EXTENSION_NAME } from "./Utils/constants";

// Material UI Imports
import Theme from "./Theme";
import { Divider, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
  },
}));

const App: FC = () => {
  const classes = useStyles();

  return (
    <Theme>
      <Paper className={classes.container}>
        <Typography variant="h5">{EXTENSION_NAME}</Typography>
        <Divider />
        <Rating />
      </Paper>
    </Theme>
  );
};

export default App;
