// React Imports
import React, { FC } from "react";

// Redux Imports
import {
  getPopupOpen,
  getPopupType,
  getUser,
  togglePopup,
  useAppDispatch,
} from "../Redux";
import { useSelector } from "react-redux";

// Firebase Imports
import firebase from "firebase/app";
import { StyledFirebaseAuth } from "react-firebaseui";
import { useFirebase } from "react-redux-firebase";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  loginTooltip: {
    marginTop: theme.spacing(0.75),
  },
  logoutButton: {
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

interface PopupProps {}

const Popup: FC<PopupProps> = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const firebaseInstance = useFirebase();

  const user = useSelector(getUser);
  const open = useSelector(getPopupOpen);
  const type = useSelector(getPopupType);

  switch (type) {
    case "login": {
      if (!user.isEmpty && open)
        dispatch(togglePopup({ type: "login", open: false }));
      return (
        <Dialog
          open={open}
          onClose={() => dispatch(togglePopup({ type: "login", open: false }))}
        >
          <DialogTitle>Sign in with Google</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Signing in with Google allows you to preserve your information and
              connect with multiple devices.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <StyledFirebaseAuth
              firebaseAuth={firebaseInstance.auth()}
              uiConfig={{
                signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
                signInFlow: "popup",
                signInSuccessUrl: "/home",
              }}
            />
          </DialogActions>
        </Dialog>
      );
    }
    case "logout": {
      if (user.isEmpty && open)
        dispatch(togglePopup({ type: "login", open: false }));
      return (
        <Dialog
          open={open}
          onClose={() => dispatch(togglePopup({ type: "logout", open: false }))}
        >
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Your data will be preserved, however, you will not be able to save
              any new Introspections.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              className={classes.logoutButton}
              onClick={() => firebaseInstance.logout()}
            >
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
  }
};

export default Popup;
