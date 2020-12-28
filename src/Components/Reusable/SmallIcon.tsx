// React Imports
import React, { FC } from "react";
import NearTooltip from "./NearTooltip";

// Material UI Imports
import { IconButton, IconButtonProps } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

interface StyleProps {
  offset?: number;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  span: {
    position: "absolute",
    top: "50%",
    right: ({ offset }) => theme.spacing(offset ?? 1),
    transform: "translate(0%,-50%)",
  },
  button: {
    padding: theme.spacing(1),
  },
}));

interface SmallIconProps {
  title: string;
  icon: JSX.Element;
  IconButtonProps?: IconButtonProps;
  offset?: number;
}

const SmallIcon: FC<SmallIconProps> = ({
  title,
  IconButtonProps,
  icon,
  offset,
}) => {
  const classes = useStyles({ offset });
  return (
    <NearTooltip title={title} spacing={0.75}>
      <span className={classes.span}>
        <IconButton
          size="small"
          className={classes.button}
          {...IconButtonProps}
        >
          {icon}
        </IconButton>
      </span>
    </NearTooltip>
  );
};

export default SmallIcon;
