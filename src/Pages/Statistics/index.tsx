// React Imports
import React, { FC } from "react";
import Ratings from "./Ratings";
import Heading from "./Heading";

// Redux Imports
import { useSelector } from "react-redux";
import { getProfileLoaded, getSortedResponses } from "../../Redux";

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
  const isLoaded = useSelector(getProfileLoaded);
  const responses = useSelector(getSortedResponses);

  if (!isLoaded || !responses) return null;

  return (
    <>
      <Typography variant="h4" align="center">
        Statistics
      </Typography>
      <Ratings responses={responses} />
      <Heading>Descriptions</Heading>
      <Heading>Reflections</Heading>
    </>
  );
};

export default Statistics;
