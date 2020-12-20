import React, { useState, FC } from "react";

import { RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  ratings: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
  },
}));

interface RatingProps {}

const Rating: FC<RatingProps> = () => {
  const classes = useStyles();

  const [rating, setRating] = useState(0);

  return (
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
  );
};

interface RatingRadioProps {
  value: number;
}

const RatingRadio: FC<RatingRadioProps> = ({ value }) => {
  return (
    <FormControlLabel
      value={value}
      control={<Radio />}
      label={value}
      labelPlacement="bottom"
    />
  );
};

export default Rating;
