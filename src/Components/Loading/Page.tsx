// React Imports
import React, { FC } from "react";

// Material UI Imports
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
