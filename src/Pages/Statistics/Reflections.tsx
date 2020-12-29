// React Imports
import React, { FC } from "react";
import { Heading, NoResponses } from "./Components";
import { TableChart } from "../../Components/Reusable/Charts";
import { sortOccurence } from "../../Utils/funcs";

// Redux Imports
import { Responses } from "../../Redux";

// Material UI Imports
import {} from "@material-ui/core";

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
