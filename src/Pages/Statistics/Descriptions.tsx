// React Imports
import React, { FC } from "react";
import Heading from "./Heading";
import NoResponses from "./NoResponses";

// Redux Imports
import { useSelector } from "react-redux";
import { Responses } from "../../Redux";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import {} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  // Styles
}));

interface DescriptionsProps {
  responses: Responses;
}

const Descriptions: FC<DescriptionsProps> = ({ responses }) => {
  const classes = useStyles();

  const responseDates = Object.keys(responses);
  const responseAnswers = Object.values(responses)
    .map(({ description }) => description)
    .filter((description) => description.length);

  return (
    <>
      <Heading>Descriptions</Heading>
      {!responseAnswers.length ? (
        <NoResponses name="descriptions" verb="describe" />
      ) : (
        <></>
      )}
    </>
  );
};

export default Descriptions;
