// React Imports
import React, { FC } from "react";
import Heading from "./Heading";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import {} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  // Styles
}));

interface DescriptionProps {}

const Description: FC<DescriptionProps> = () => {
  const classes = useStyles();
  return (
    <>
      <Heading>Describe your day</Heading>
    </>
  );
};

export default Description;
