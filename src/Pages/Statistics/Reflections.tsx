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

interface ReflectionsProps {
  responses: Responses;
}

const Reflections: FC<ReflectionsProps> = ({ responses }) => {
  const classes = useStyles();

  const responseDates = Object.keys(responses);
  const responseAnswers = Object.values(responses)
    .map(({ reflection }) => reflection)
    .filter((reflection) => reflection.length);

  return (
    <>
      <Heading>Reflections</Heading>
      {!responseAnswers.length ? (
        <NoResponses name="reflections" verb="reflect on" />
      ) : (
        <></>
      )}
    </>
  );
};

export default Reflections;
