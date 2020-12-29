// React Imports
import React, { FC } from "react";
import Heading from "./Heading";
import NoResponses from "./NoResponses";
import TableChart from "../../Components/Reusable/Charts/TableChart";

// Redux Imports
import { useSelector } from "react-redux";
import { Responses } from "../../Redux";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import {} from "@material-ui/core";

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

  const words = Object.entries(
    responseAnswers.reduce((obj, description) => {
      description.split(/\s|\.|,/g).forEach((word) => {
        word = word.toLowerCase().replace(/[\W_]+/g, "");
        if (word) obj[word] = (obj[word] ?? 0) + 1;
      });
      return obj;
    }, {} as Record<string, number>)
  ).sort((one, two) => two[1] - one[1]);

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
