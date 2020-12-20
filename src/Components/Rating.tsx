import React, { useState, FC } from "react";

import {
  RadioGroup,
  Radio,
  FormControlLabel,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Heading from "./Heading";

const useStyles = makeStyles((theme) => ({
  heading: {},
  divider: {},
  ratings: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    margin: theme.spacing(0.5),
  },
}));

interface RatingProps {}

const Rating: FC<RatingProps> = () => {
  const classes = useStyles();

  const [rating, setRating] = useState(0);

  return (
    <>
      <Heading>Rate your day</Heading>
      <Divider className={classes.divider} />
      <RadioGroup
        aria-label="rating"
        name="rating"
        value={rating}
        onChange={(e, value) => setRating(parseInt(value))}
        className={classes.ratings}
      >
        {[...Array(6)].map((x, i) => (
          <RatingRadio value={i} />
        ))}
      </RadioGroup>
    </>
  );
};

const useRatingRadioStyles = makeStyles((theme) => ({
  radio: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

interface RatingRadioProps {
  value: number;
}

const RatingRadio: FC<RatingRadioProps> = ({ value }) => {
  const classes = useRatingRadioStyles();

  return (
    <FormControlLabel
      value={value}
      control={<Radio />}
      label={value}
      labelPlacement="bottom"
      color="primary"
      className={classes.radio}
    />
  );
};

export default Rating;
