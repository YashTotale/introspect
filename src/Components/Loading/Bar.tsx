// React Imports
import React, { FC } from "react";

// Material UI Imports
import { Skeleton } from "@material-ui/lab";
import { makeStyles, Theme } from "@material-ui/core/styles";

type Size = "xs" | "small" | "medium" | "large";

interface StyleProps {
  size: Size;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  skeleton: ({ size }) => ({
    height:
      size === "xs"
        ? 50
        : size === "small"
        ? 100
        : size === "medium"
        ? 125
        : size === "large"
        ? 150
        : undefined,
    marginTop: theme.spacing(2),
  }),
}));

interface BarProps {
  size: Size;
}

const Bar: FC<BarProps> = ({ size }) => {
  const classes = useStyles({ size });
  return <Skeleton className={classes.skeleton} variant="rect" />;
};

export default Bar;
