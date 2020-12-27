// React Imports
import React, { FC } from "react";
import Line from "../../Components/Reusable/Line";
import NearTooltip from "../../Components/Reusable/NearTooltip";

// Material UI Imports
import { Typography, IconButton, IconButtonProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heading: {
    position: "relative",
  },
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

interface HeadingProps {
  IconButtonProps: IconButtonProps;
  icon: JSX.Element;
  iconTitle: string;
}

const Heading: FC<HeadingProps> = ({
  children,
  icon,
  iconTitle,
  IconButtonProps,
}) => {
  const classes = useStyles();

  return (
    <>
      <Line />
      <div className={classes.heading}>
        <Typography variant="h5" align="center">
          {children}
        </Typography>
        <NearTooltip title={iconTitle} spacing={0.75}>
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
      </div>
    </>
  );
};

export default Heading;
