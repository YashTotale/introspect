// React Imports
import React, { FC } from "react";

// Redux Imports
import { useSelector } from "react-redux";
import { getUser, togglePopup, useAppDispatch, getTodaySaved } from "../Redux";
import { saveTodayData } from "../Redux/today.slice";

// Firebase Imports

// Material UI Imports
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Button, CircularProgress } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";

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
      ? green[500]
      : isError !== false
      ? red[500]
      : undefined,
    "&:hover": {
      backgroundColor: isSaved
        ? green[700]
        : isError !== false
        ? red[700]
        : undefined,
    },
  }),
  doneBtnSpinner: {
    color: green[500],
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

  const user = useSelector(getUser);
  const saved = useSelector(getTodaySaved);

  const loading = saved === null;
  const isSaved = typeof saved === "boolean" && saved;
  const isError = typeof saved === "string" && saved;

  const classes = useStyles({ isSaved, isError });

  return (
    <div className={classes.footer}>
      <div className={classes.doneWrapper}>
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={() =>
            user.isEmpty
              ? dispatch(togglePopup({ open: true, type: "login" }))
              : dispatch(saveTodayData())
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
