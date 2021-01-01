// React Imports
import React, { FC } from "react";
import { Link as RouterLink } from "react-router-dom";

// Material UI Imports
import { Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  noResponses: {
    margin: theme.spacing(1, 0),
  },
}));

interface NoResponsesProps {
  name?: string;
  verb?: string;
}

const NoResponses: FC<NoResponsesProps> = ({ name, verb }) => {
  const classes = useStyles();

  return (
    <Typography className={classes.noResponses} align="center">
      {name && verb
        ? `You have no ${name} in the specified date range. To view ${name} statistics, ${verb} a day in this date range in the `
        : "You have no responses in the specified date range. To view statistics, respond and save your response in the "}
      <Link component={RouterLink} to="">
        Home
      </Link>{" "}
      page.
    </Typography>
  );
};

export default NoResponses;
