// React Imports
import React, { FC } from "react";
import useClosableSnackbar from "../../Hooks/useClosableSnackbar";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getUser,
  togglePopup,
  useAppDispatch,
  saveHomeData,
  saveNotified,
  getSavedError,
  getSavedNotified,
  getSavedLoading,
  getIsHomeDataSaved,
} from "../../Redux";

// Material UI Imports
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Button, CircularProgress } from "@material-ui/core";

interface StyleProps {
  isSaved: boolean;
  isError: string | null;
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
      : isError !== null
      ? theme.palette.error.main
      : theme.palette.primary.main,
    "&:hover": {
      backgroundColor:
        isError !== null
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

  const isError = useSelector(getSavedError);
  const isLoading = useSelector(getSavedLoading);
  const isSaveNotified = useSelector(getSavedNotified);

  const isSaved = useSelector(getIsHomeDataSaved);

  const user = useSelector(getUser);

  const classes = useStyles({ isSaved, isError });

  if (!isSaveNotified) {
    if (isError !== null) {
      enqueueSnackbar(isError, {
        variant: "error",
        autoHideDuration: 4000,
      });
    } else {
      enqueueSnackbar("Successfully saved", {
        variant: "success",
        autoHideDuration: 4000,
      });
    }
    dispatch(saveNotified());
  }

  return (
    <div className={classes.footer}>
      <div className={classes.doneWrapper}>
        <Button
          variant="contained"
          color="primary"
          disabled={isLoading}
          tabIndex={(isSaved && -1) || undefined}
          onClick={() =>
            user.isEmpty
              ? dispatch(togglePopup({ open: true, type: "login" }))
              : !isSaved && dispatch(saveHomeData())
          }
          className={classes.doneBtn}
        >
          {isSaved ? "Saved" : "Save"}
        </Button>
        {isLoading && (
          <CircularProgress size={24} className={classes.doneBtnSpinner} />
        )}
      </div>
    </div>
  );
};

export default Footer;
