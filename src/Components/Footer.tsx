// React Imports
import React, { FC } from "react";
import moment from "moment";

// Redux Imports
import { getTodayData, getUser, togglePopup, useAppDispatch } from "../Redux";
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
  const dispatch = useAppDispatch();
  const firebaseInstance = useFirebase();

  const user = useSelector(getUser);
  const todayData = useSelector(getTodayData);

  return (
    <div className={classes.footer}>
      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          user.isEmpty
            ? dispatch(togglePopup({ open: true, type: "login" }))
            : firebaseInstance.updateProfile({
                responses: {
                  [moment().format("DD-MM-YYYY")]: todayData,
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
