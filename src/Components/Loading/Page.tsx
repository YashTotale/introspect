// React Imports
import React, { FC } from "react";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import {} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  skeleton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 450,
  },
}));

interface PageProps {}

const Page: FC<PageProps> = () => {
  const classes = useStyles();
  return (
    <div className={classes.skeleton}>
      <CircularProgress />
    </div>
  );
};

export default Page;
