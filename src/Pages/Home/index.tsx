// React Imports
import React, { FC, lazy, Suspense } from "react";
import { Bar } from "../../Components/Loading";

// Redux Imports
import { useSelector } from "react-redux";
import {
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
import SmallIcon from "../../Components/Reusable/SmallIcon";
import useClosableSnackbar from "../../Hooks/useClosableSnackbar";

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
  const { enqueueSnackbar, closeSnackbar } = useClosableSnackbar();

  const user = useSelector(getUser);
  const isSaved = useSelector(getIsHomeDataSaved);

  return (
    <>
      <div className={classes.heading}>
        <Typography variant="h4" align="center">
          Home
        </Typography>
        <SmallIcon
          icon={<Cached fontSize="small" />}
          title="Reset changes"
          IconButtonProps={{
            onClick: () => {
              dispatch(resetHomeData());
              enqueueSnackbar("Reset changes", {
                variant: "success",
                autoHideDuration: 4000,
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
        <SmallIcon
          icon={<Event fontSize="small" />}
          title="Choose date"
          offset={6}
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
