// React Imports
import React, { FC, lazy, Suspense } from "react";
import { Bar } from "../../Components/Loading";

// Redux Imports
import { useSelector } from "react-redux";
import { getUser, togglePopup, useAppDispatch } from "../../Redux";

// Material UI Imports
import { makeStyles, Typography } from "@material-ui/core";
import { Event } from "@material-ui/icons";
import SmallIcon from "../../Components/Reusable/SmallIcon";

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
  const user = useSelector(getUser);

  return (
    <>
      <div className={classes.heading}>
        <Typography variant="h4" align="center">
          Home
        </Typography>
        <SmallIcon
          icon={<Event fontSize="small" />}
          title="Choose date"
          IconButtonProps={{
            onClick: () =>
              dispatch(
                togglePopup({
                  open: true,
                  type: user.isEmpty ? "login" : "date",
                })
              ),
          }}
        />
      </div>
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
