// React Imports
import React, { FC } from "react";
import moment from "moment";
import Heading from "./Heading";
import NoResponses from "./NoResponses";

import { LineChart } from "../../Components/Reusable/Charts";

// Redux Imports
import { Responses } from "../../Store";

// Material UI Imports
import {} from "@material-ui/core";

interface RatingsProps {
  responses: Responses;
}

const Ratings: FC<RatingsProps> = ({ responses }) => {
  const responseDates = Object.keys(responses);
  const responseAnswers = Object.values(responses)
    .map(({ rating }) => rating)
    .filter((rating) => rating !== null);

  return (
    <>
      <Heading>Ratings</Heading>
      {!responseAnswers.length ? (
        <NoResponses name="ratings" verb="rate" />
      ) : (
        <LineChart
          title="Rating over time"
          y="Rating"
          data={responseAnswers}
          categories={responseDates.map((date) =>
            parseInt(moment(date, "DD-MM-YYYY").format("x"))
          )}
        />
      )}
    </>
  );
};

export default Ratings;
