// React Imports
import React, { FC } from "react";

// Redux Imports

// Firebase Imports
import firebase from "firebase";
import { StyledFirebaseAuth } from "react-firebaseui";
import { useFirebase } from "react-redux-firebase";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import {} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  // Styles
}));

interface LoginPopupProps {}

const LoginPopup: FC<LoginPopupProps> = () => {
  const classes = useStyles();
  const firebaseInstance = useFirebase();

  return (
    <StyledFirebaseAuth
      firebaseAuth={firebaseInstance.auth()}
      uiConfig={{
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
      }}
    />
  );
};

export default LoginPopup;
