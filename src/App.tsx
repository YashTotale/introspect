// React Imports
import React, { FC } from "react";

// Util Imports
import { EXTENSION_NAME } from "./Utils/constants";

// Material UI Imports
import Theme from "./Theme";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

const App: FC = () => {
  const classes = useStyles();
  return (
    <Theme>
      <Typography variant="h3">{EXTENSION_NAME}</Typography>
    </Theme>
  );
};

export default App;
