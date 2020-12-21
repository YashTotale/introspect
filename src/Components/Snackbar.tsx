// React Imports
import React, { FC } from "react";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getSnackbarMessage,
  getSnackbarSeverity,
  getSnackbarType,
  getSnackbarOpen,
  toggleSnackbar,
  useAppDispatch,
  getSnackbarUndo,
} from "../Redux";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { Snackbar, Button, IconButton, Slide } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { alternativeFont } from "../Theme";

const useStyles = makeStyles((theme) => ({
  alert: {
    fontFamily: alternativeFont,
    fontWeight: 600,
  },
}));

interface SnackBarProps {}

const SnackBar: FC<SnackBarProps> = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const open = useSelector(getSnackbarOpen);
  const handleClose = () => dispatch(toggleSnackbar(false));

  const message = useSelector(getSnackbarMessage);
  const severity = useSelector(getSnackbarSeverity);
  const type = useSelector(getSnackbarType);
  const withUndo = useSelector(getSnackbarUndo);

  return (
    <Snackbar
      autoHideDuration={3000}
      onClose={handleClose}
      open={open}
      message={message}
      TransitionComponent={(props) => <Slide {...props} direction="up" />}
      action={
        withUndo && (
          <>
            <Button
              color="primary"
              size="small"
              variant="contained"
              onClick={handleClose}
            >
              UNDO
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <Close fontSize="small" />
            </IconButton>
          </>
        )
      }
    >
      <Alert
        classes={{ message: classes.alert }}
        variant="filled"
        severity={severity}
        onClose={handleClose}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
