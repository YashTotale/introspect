// React Imports
import React, { FC } from "react";

// Material UI Imports
import { Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heading: {},
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

interface HeadingProps {
  className?: string;
  dividerClassName?: string;
}

const Heading: FC<HeadingProps> = ({
  className,
  dividerClassName,
  children,
}) => {
  const classes = useStyles();
  return (
    <>
      <Divider className={`${classes.divider} ${dividerClassName}`} />
      <Typography
        className={`${classes.heading} ${className}`}
        variant="h5"
        align="center"
      >
        {children}
      </Typography>
    </>
  );
};

export default Heading;
