// React Imports
import React, { FC } from "react";
import useClosableSnackbar from "../../Hooks/useClosableSnackbar";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getUser,
  togglePopup,
  useAppDispatch,
  getTodaySaved,
} from "../../Redux";
import {
  getIsSaveNotified,
  resetSave,
  saveTodayData,
  saveNotified,
} from "../../Redux/today.slice";

// Firebase Imports

// Material UI Imports
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Button, CircularProgress } from "@material-ui/core";

interface StyleProps {
  isSaved: boolean;
  isError: string | false;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  footer: {
    display: "flex",
    flexDirection: "row-reverse",
    padding: theme.spacing(1),
  },
  doneWrapper: ({ isSaved }) => ({
    cursor: isSaved ? "not-allowed" : undefined,
    position: "relative",
  }),
  doneBtn: ({ isSaved, isError }) => ({
    pointerEvents: isSaved ? "none" : undefined,
    backgroundColor: isSaved
      ? theme.palette.success.main
      : isError !== false
      ? theme.palette.error.main
      : theme.palette.primary.main,
    "&:hover": {
      backgroundColor:
        isError !== false
          ? theme.palette.error.dark
          : theme.palette.primary.dark,
    },
  }),
  doneBtnSpinner: {
    color: theme.palette.success.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useClosableSnackbar();

  const user = useSelector(getUser);
  const saved = useSelector(getTodaySaved);
  const isSaveNotified = useSelector(getIsSaveNotified);

  const loading = saved === null;
  const isSaved = typeof saved === "boolean" && saved;
  const isError = typeof saved === "string" && saved;

  const classes = useStyles({ isSaved, isError });

  if (!isSaveNotified) {
    enqueueSnackbar("Successfully saved", {
      variant: "success",
      autoHideDuration: 4000,
    });
    dispatch(saveNotified());
  }

  if (isError !== false) {
    enqueueSnackbar(isError, {
      variant: "error",
      autoHideDuration: 4000,
    });
    dispatch(resetSave());
  }

  return (
    <div className={classes.footer}>
      <div className={classes.doneWrapper}>
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          tabIndex={(isSaved && -1) || undefined}
          onClick={() =>
            user.isEmpty
              ? dispatch(togglePopup({ open: true, type: "login" }))
              : !isSaved && dispatch(saveTodayData())
          }
          className={classes.doneBtn}
        >
          {isSaved ? "Saved" : "Save"}
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.doneBtnSpinner} />
        )}
      </div>
    </div>
  );
};

export default Footer;
