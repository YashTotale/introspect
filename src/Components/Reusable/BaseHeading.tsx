// React Imports
import React, { FC } from "react";
import { Line, SmallIcon } from "./index";

// Material UI Imports
import { Typography, IconButtonProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  baseHeading: {
    position: "relative",
  },
}));

interface BaseHeadingProps {
  icon: JSX.Element;
  iconTitle: string;
  IconButtonProps: IconButtonProps;
  className?: string;
}

const BaseHeading: FC<BaseHeadingProps> = ({
  children,
  icon,
  iconTitle,
  IconButtonProps,
  className,
}) => {
  const classes = useStyles();

  return (
    <>
      <Line />
      <div className={`${classes.baseHeading} ${className}`}>
        <Typography variant="h5" align="center">
          {children}
        </Typography>
        <SmallIcon
          IconButtonProps={IconButtonProps}
          icon={icon}
          title={iconTitle}
        />
      </div>
    </>
  );
};

export default BaseHeading;
