// React Imports
import React, { FC } from "react";
import Heading from "./Heading";

// Redux Imports

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import {} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  // Styles
}));

interface StatisticsProps {}

const Statistics: FC<StatisticsProps> = () => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h4" align="center">
        Statistics
      </Typography>
      <Heading>Ratings</Heading>
      <Heading>Descriptions</Heading>
      <Heading>Reflections</Heading>
    </>
  );
};

export default Statistics;
