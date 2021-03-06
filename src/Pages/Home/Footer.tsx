// React Imports
import React, { FC } from "react";
import { useClosableSnackbar } from "../../Hooks";

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
  getProfileLoaded,
} from "../../Redux";

// Material UI Imports
import { Button, CircularProgress } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

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
    opacity: isSaved ? 0.6 : undefined,
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

  const user = useSelector(getUser);

  const isError = useSelector(getSavedError);
  const isSaveLoading = useSelector(getSavedLoading);
  const isProfileLoading = !useSelector(getProfileLoaded);
  const isSaveNotified = useSelector(getSavedNotified);

  const isSaved = useSelector(getIsHomeDataSaved);
  const classes = useStyles({ isSaved, isError });

  const isLoading = isSaveLoading || isProfileLoading;

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
