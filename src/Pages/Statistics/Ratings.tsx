// React Imports
import React, { FC } from "react";
import { Heading, NoResponses } from "./Components";
import { LineChart, BarChart } from "../../Components/Reusable/Charts";
import { createUnixDate } from "../../Utils/funcs";

// Redux Imports
import { Responses } from "../../Redux";

// Material UI Imports
import {} from "@material-ui/core";

interface RatingsProps {
  responses: Responses;
}

const Ratings: FC<RatingsProps> = ({ responses }) => {
  const dates = Object.keys(responses);
  const ratings = Object.values(responses)
    .map(({ rating }) => rating)
    .filter((rating) => rating !== null) as number[];

  const counts = ratings.reduce(
    (counts, rating) => {
      counts[rating]++;
      return counts;
    },
    [...Array(6).fill(0)]
  );

  return (
    <>
      <Heading>Ratings</Heading>
      {!ratings.length ? (
        <NoResponses name="ratings" verb="rate" />
      ) : (
        <>
          <LineChart
            title="Rating over time"
            y="Rating"
            data={ratings}
            categories={dates.map((date) => createUnixDate(date))}
          />
          <BarChart
            categories={[0, 1, 2, 3, 4, 5]}
            data={counts}
            y="Count"
            title="Rating count"
          />
        </>
      )}
    </>
  );
};

export default Ratings;
