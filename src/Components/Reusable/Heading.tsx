// React Imports
import React, { FC } from "react";
import Line from "../../Components/Reusable/Line";

// Material UI Imports
import { Typography, IconButtonProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SmallIcon from "./SmallIcon";

const useStyles = makeStyles((theme) => ({
  heading: {
    position: "relative",
  },
}));

interface HeadingProps {
  icon: JSX.Element;
  iconTitle: string;
  IconButtonProps: IconButtonProps;
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
        <SmallIcon
          IconButtonProps={IconButtonProps}
          icon={icon}
          title={iconTitle}
        />
      </div>
    </>
  );
};

export default Heading;
