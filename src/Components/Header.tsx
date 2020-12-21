// React Imports
import React, { FC } from "react";
import { StyledFirebaseAuth } from "react-firebaseui";

// Redux Imports
import { useFirebase } from "react-redux-firebase";
import firebase from "firebase";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar } from "@material-ui/core";
import {} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const classes = useStyles();
  const firebaseInstance = useFirebase();

  return (
    <AppBar
      elevation={2}
      color="transparent"
      position="static"
      variant="elevation"
    >
      <Toolbar className={classes.toolbar}>
        <StyledFirebaseAuth
          firebaseAuth={firebaseInstance.auth()}
          uiConfig={{
            signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
          }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
