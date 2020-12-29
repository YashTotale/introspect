// React Imports
import React, { FC } from "react";
import { Page } from "../../Components/Loading";

import NoResponses from "./NoResponses";
import Ratings from "./Ratings";
import Descriptions from "./Descriptions";
import Reflections from "./Reflections";

// Redux Imports
import { useSelector } from "react-redux";
import { getProfileLoaded, getSortedResponses } from "../../Redux";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  // Styles
}));

interface StatisticsProps {}

const Statistics: FC<StatisticsProps> = () => {
  const classes = useStyles();
  const isLoaded = useSelector(getProfileLoaded);
  const responses = useSelector(getSortedResponses);

  const responseLength = responses ? Object.keys(responses).length : 0;

  return (
    <>
      <Typography variant="h4" align="center">
        Statistics
      </Typography>
      {!isLoaded ? (
        <Page />
      ) : !responseLength ? (
        <NoResponses />
      ) : (
        <>
          <Ratings responses={responses} />
          <Descriptions responses={responses} />
          <Reflections responses={responses} />
        </>
      )}
    </>
  );
};

export default Statistics;
