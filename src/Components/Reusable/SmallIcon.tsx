// React Imports
import React, { FC } from "react";
import NearTooltip from "./NearTooltip";

// Material UI Imports
import { IconButton, IconButtonProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  span: {
    position: "absolute",
    top: "50%",
    right: theme.spacing(1),
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
}

const SmallIcon: FC<SmallIconProps> = ({ title, IconButtonProps, icon }) => {
  const classes = useStyles();
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
