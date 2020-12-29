// React Imports
import React, { FC } from "react";
import { Heading } from "./Components";

// Redux Imports
import { useSelector } from "react-redux";
import { getRating, setHomeData, useAppDispatch } from "../../Redux";

// Material UI Imports
import { RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  divider: {},
  ratings: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
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
      <Heading name="rating" clearable={rating !== null}>
        Rate your day
      </Heading>
      <RadioGroup
        aria-label="rating"
        name="rating"
        value={rating}
        onChange={(e, value) =>
          dispatch(setHomeData({ rating: parseInt(value) }))
        }
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
