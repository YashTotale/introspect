// React Imports
import React, { FC } from "react";
import Heading from "./Heading";

// Redux Imports
import { clearRating, getRating, setRating, useAppDispatch } from "../Redux";

// Material UI Imports
import { RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
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
  const dispatch = useAppDispatch();

  const rating = useSelector(getRating);

  return (
    <>
      <Heading onClear={() => dispatch(clearRating())}>Rate your day</Heading>
      <RadioGroup
        aria-label="rating"
        name="rating"
        value={rating}
        onChange={(e, value) => dispatch(setRating(parseInt(value)))}
        className={classes.ratings}
      >
        {[...Array(6)].map((x, i) => (
          <RatingRadio key={i} value={i} />
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
      control={<Radio color="primary" />}
      label={value}
      labelPlacement="bottom"
      className={classes.radio}
    />
  );
};

export default Rating;
