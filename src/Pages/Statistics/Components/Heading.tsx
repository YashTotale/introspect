// React Imports
import React, { FC } from "react";
import { Line } from "../../../Components/Reusable";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  heading: {
    marginBottom: theme.spacing(1),
  },
}));

interface HeadingProps {}

const Heading: FC<HeadingProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <Line />
      <Typography align="center" className={classes.heading} variant="h5">
        {children}
      </Typography>
    </>
  );
};

export default Heading;
