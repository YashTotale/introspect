// React Imports
import React, { FC } from "react";
import Heading from "./Heading";
import NoResponses from "./NoResponses";
import TableChart from "../../Components/Reusable/Charts/TableChart";

// Redux Imports
import { Responses } from "../../Redux";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import {} from "@material-ui/core";
import { sortOccurence } from "../../Utils/funcs";

const useStyles = makeStyles((theme) => ({
  wordCount: {
    maxHeight: 200,
  },
}));

interface DescriptionsProps {
  responses: Responses;
}

const Descriptions: FC<DescriptionsProps> = ({ responses }) => {
  const classes = useStyles();

  // const responseDates = Object.keys(responses);
  const responseAnswers = Object.values(responses)
    .map(({ description }) => description)
    .filter((description) => description.length);

  const words = sortOccurence(responseAnswers);

  return (
    <>
      <Heading>Descriptions</Heading>
      {!responseAnswers.length ? (
        <NoResponses name="descriptions" verb="describe" />
      ) : (
        <TableChart header={["Word", "Count"]} data={words} />
      )}
    </>
  );
};

export default Descriptions;
