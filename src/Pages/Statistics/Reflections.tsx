// React Imports
import React, { FC } from "react";
import Heading from "./Heading";
import NoResponses from "./NoResponses";

// Redux Imports
import { Responses } from "../../Redux";

// Material UI Imports
import {} from "@material-ui/core";
import { sortOccurence } from "../../Utils/funcs";
import TableChart from "../../Components/Reusable/Charts/TableChart";

interface ReflectionsProps {
  responses: Responses;
}

const Reflections: FC<ReflectionsProps> = ({ responses }) => {
  // const responseDates = Object.keys(responses);
  const responseAnswers = Object.values(responses)
    .map(({ reflection }) => reflection)
    .filter((reflection) => reflection.length);

  const words = sortOccurence(responseAnswers);

  return (
    <>
      <Heading>Reflections</Heading>
      {!responseAnswers.length ? (
        <NoResponses name="reflections" verb="reflect on" />
      ) : (
        <TableChart data={words} header={["Word", "Count"]} />
      )}
    </>
  );
};

export default Reflections;
