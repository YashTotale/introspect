// React Imports
import React, { FC } from "react";
import BaseHeading from "../../Components/Reusable/Heading";

// Redux Imports

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import {} from "@material-ui/core";
import { Refresh } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  // Styles
}));

interface HeadingProps {}

const Heading: FC<HeadingProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <BaseHeading
      icon={<Refresh fontSize="small" />}
      iconTitle="Reload"
      IconButtonProps={{}}
    >
      {children}
    </BaseHeading>
  );
};

export default Heading;
