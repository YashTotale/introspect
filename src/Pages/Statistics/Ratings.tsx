// React Imports
import React, { FC } from "react";
import moment from "moment";
import Heading from "./Heading";
import { LineChart } from "../../Components/Reusable/Charts";

// Redux Imports
import { Responses } from "../../Store";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import {} from "@material-ui/core";
import {} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  // Styles
}));

interface RatingsProps {
  responses: Responses;
}

const Ratings: FC<RatingsProps> = ({ responses }) => {
  const classes = useStyles();

  return (
    <>
      <Heading>Ratings</Heading>
      <LineChart
        data={Object.values(responses).map(({ rating }) => rating)}
        categories={Object.keys(responses).map((day) => {
          const date = moment(day, "DD-MM-YYYY").format("x");
          return parseInt(date);
        })}
      />
    </>
  );
};

export default Ratings;
