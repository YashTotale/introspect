// React Imports
import React, { FC } from "react";
import { Heading, NoResponses } from "./Components";
import { TableChart } from "../../Components/Reusable/Charts";
import { sortOccurence } from "../../Utils/funcs";

// Redux Imports
import { Responses } from "../../Redux";

// Material UI Imports
import {} from "@material-ui/core";

interface DescriptionsProps {
  responses: Responses;
}

const Descriptions: FC<DescriptionsProps> = ({ responses }) => {
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
        <>
          <TableChart
            title="Most Frequent Words"
            header={["Word", "Count"]}
            data={words}
          />
        </>
      )}
    </>
  );
};

export default Descriptions;
