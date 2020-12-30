// React Imports
import React, { FC, lazy, Suspense } from "react";
import moment from "moment";
import { Bar } from "../../Components/Loading";
import { SmallIcon } from "../../Components/Reusable";
import { useClosableSnackbar } from "../../Hooks";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getHomeDate,
  getIsHomeDataSaved,
  getUser,
  resetHomeData,
  togglePopup,
  undoHomeData,
  useAppDispatch,
} from "../../Redux";

// Material UI Imports
import { Button, makeStyles, Typography } from "@material-ui/core";
import { Cached, Event } from "@material-ui/icons";

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
  dateWrapper: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(1, 0, 0),
  },
  date: {},
}));

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useClosableSnackbar();

  const user = useSelector(getUser);
  const date = useSelector(getHomeDate);
  const isSaved = useSelector(getIsHomeDataSaved);

  return (
    <>
      <div className={classes.heading}>
        <Typography variant="h4" align="center">
          Home
        </Typography>
        <SmallIcon
          icon={<Cached fontSize="small" />}
          title="Reset Changes"
          IconButtonProps={{
            onClick: () => {
              dispatch(resetHomeData());
              enqueueSnackbar("Reset changes", {
                variant: "success",
                autoHideDuration: 6000,
                action: (key) => {
                  const Undo = (
                    <Button
                      onClick={() => {
                        dispatch(undoHomeData());
                        closeSnackbar(key);
                      }}
                      variant="text"
                    >
                      Undo
                    </Button>
                  );
                  return Undo;
                },
              });
            },
            disabled: isSaved,
          }}
        />
      </div>
      <div className={classes.dateWrapper}>
        <Typography variant="subtitle1" className={classes.date}>
          {moment(date, "DD-MM-YYYY").format("MMMM Do, YYYY")}
        </Typography>
        <SmallIcon
          icon={<Event fontSize="small" />}
          title="Choose Date"
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
      <Suspense fallback={<Bar size="small" />}>
        <Description />
      </Suspense>
      <Suspense fallback={<Bar size="small" />}>
        <Reflection />
      </Suspense>
      <Suspense fallback={<Bar size="xs" />}>
        <Footer />
      </Suspense>
    </>
  );
};

export default Home;
