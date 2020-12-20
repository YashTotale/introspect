// React Imports
import React, { FC } from "react";
import Heading from "./Heading";
import TextArea from "./TextArea";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import {} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

interface DescriptionProps {}

const Description: FC<DescriptionProps> = () => {
  const classes = useStyles();

  return (
    <>
      <Heading>Describe your day</Heading>
      <TextArea label="Description" placeholder="Today was..." />
    </>
  );
};

export default Description;
