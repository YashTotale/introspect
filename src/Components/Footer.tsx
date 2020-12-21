// React Imports
import React, { FC } from "react";

// Redux Imports

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import {} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  footer: {
    display: "flex",
    flexDirection: "row-reverse",
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <Button variant="contained" color="primary">
        Done
      </Button>
    </div>
  );
};

export default Footer;
