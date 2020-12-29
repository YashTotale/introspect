// React Imports
import React, { FC } from "react";

// Material UI Imports
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(1, 0),
  },
}));

interface LineProps {}

const Line: FC<LineProps> = () => {
  const classes = useStyles();
  return <Divider className={classes.divider} />;
};

export default Line;
