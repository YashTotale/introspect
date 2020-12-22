// React Imports
import React, { FC, useState } from "react";

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
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { Person } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  loginTooltip: {
    marginTop: theme.spacing(0.75),
  },
}));

interface LoginPopupProps {}

const LoginPopup: FC<LoginPopupProps> = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip title="Login" classes={{ tooltip: classes.loginTooltip }}>
        <IconButton onClick={() => setOpen(true)}>
          <Person />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={() => setOpen(false)}>
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
    </>
  );
};

export default LoginPopup;
