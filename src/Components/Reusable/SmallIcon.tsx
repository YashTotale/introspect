// React Imports
import React, { FC } from "react";
import NearTooltip from "./NearTooltip";

// Material UI Imports
import { IconButton, IconButtonProps } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

interface StyleProps {
  offset?: number;
  absolute?: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  span: ({ absolute, offset }) => {
    if (absolute === false) return {};
    return {
      position: "absolute",
      top: "50%",
      right: theme.spacing(offset ?? 1),
      transform: "translate(0%,-50%)",
    };
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
  absolute?: boolean;
}

const SmallIcon: FC<SmallIconProps> = ({
  title,
  IconButtonProps,
  icon,
  offset,
  absolute,
}) => {
  const classes = useStyles({ offset, absolute });
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
