// React Imports
import React, { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import Ratings from "./Ratings";
import Heading from "./Heading";
import { Page } from "../../Components/Loading";

// Redux Imports
import { useSelector } from "react-redux";
import { getProfileLoaded, getSortedResponses } from "../../Redux";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Link } from "@material-ui/core";

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
        <Typography>
          You have no responses. To view statistics, respond and save your
          response in the{" "}
          <Link component={RouterLink} to="">
            Home
          </Link>{" "}
          page.
        </Typography>
      ) : (
        <>
          <Ratings responses={responses} />
          <Heading>Descriptions</Heading>
          <Heading>Reflections</Heading>
        </>
      )}
    </>
  );
};

export default Statistics;
