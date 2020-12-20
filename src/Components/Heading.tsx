// React Imports
import React, { FC } from "react";

// Material UI Imports
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heading: {},
}));

interface HeadingProps {
  className?: string;
}

const Heading: FC<HeadingProps> = ({ className, children }) => {
  const classes = useStyles();
  return (
    <Typography
      className={`${classes.heading} ${className}`}
      variant="h5"
      align="center"
    >
      {children}
    </Typography>
  );
};

export default Heading;
