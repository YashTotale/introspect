// React Imports
import React, { FC } from "react";
import { Link as RouterLink } from "react-router-dom";

// Material UI Imports
import { Link, Typography } from "@material-ui/core";
import {} from "@material-ui/core";

interface NoResponsesProps {
  name?: string;
  verb?: string;
}

const NoResponses: FC<NoResponsesProps> = ({ name, verb }) => {
  const text =
    name && verb
      ? `You have no ${name}. To view ${name} statistics, ${verb} a day in the `
      : "You have no responses. To view statistics, respond and save your response in the ";
  return (
    <Typography align="center">
      {text}
      <Link component={RouterLink} to="">
        Home
      </Link>{" "}
      page.
    </Typography>
  );
};

export default NoResponses;
