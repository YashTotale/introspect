// React Imports
import React, { FC, lazy, Suspense } from "react";
import moment from "moment";
import { Bar } from "../../Components/Loading";

// Redux Imports
import { useSelector } from "react-redux";
import { getHomeDate, setDate, useAppDispatch } from "../../Redux";

// Material UI Imports
import { makeStyles, Typography } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";

const Rating = lazy(() => import("./Rating"));
const Description = lazy(() => import("./Description"));
const Reflection = lazy(() => import("./Reflection"));
const Footer = lazy(() => import("./Footer"));

const useStyles = makeStyles((theme) => ({
  heading: {
    position: "relative",
  },
  datePicker: {
    maxWidth: 140,
    marginLeft: "auto",
  },
}));

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const date = useSelector(getHomeDate);

  return (
    <>
      <Typography variant="h4" align="center">
        Home
      </Typography>
      <KeyboardDatePicker
        value={new Date(parseInt(moment(date, "DD-MM-YYYY").format("x")))}
        placeholder="10-10-2018"
        onChange={(date) => {
          if (date && date.format("DD-MM-YYYY") !== "Invalid date") {
            dispatch(setDate(date.format("DD-MM-YYYY")));
          }
        }}
        maxDate={new Date()}
        format="DD-MM-YYYY"
        className={classes.datePicker}
      />
      <Suspense fallback={<Bar size="small" />}>
        <Rating />
      </Suspense>
      <Suspense fallback={<Bar size="large" />}>
        <Description />
      </Suspense>
      <Suspense fallback={<Bar size="large" />}>
        <Reflection />
      </Suspense>
      <Suspense fallback={<Bar size="xs" />}>
        <Footer />
      </Suspense>
    </>
  );
};

export default Home;
