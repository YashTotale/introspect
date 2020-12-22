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

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import {
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
}));

interface PopupProps {}

const Popup: FC<PopupProps> = () => {
  const classes = useStyles();
  const user = useSelector(getUser);
  const dispatch = useAppDispatch();

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
              firebaseAuth={firebase.auth()}
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
  }
};

export default Popup;
