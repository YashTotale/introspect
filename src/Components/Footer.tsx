// React Imports
import React, { FC } from "react";

// Redux Imports
import { getUser } from "../Redux";
import { useSelector } from "react-redux";

// Firebase Imports
import { useFirebase } from "react-redux-firebase";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    display: "flex",
    flexDirection: "row-reverse",
    padding: theme.spacing(1),
  },
}));

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  const classes = useStyles();
  const user = useSelector(getUser);
  const firebaseInstance = useFirebase();

  return (
    <div className={classes.footer}>
      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          user.isEmpty
            ? null
            : firebaseInstance.updateProfile({
                testing: {
                  woo: "yay",
                },
              })
        }
      >
        Done
      </Button>
    </div>
  );
};

export default Footer;
