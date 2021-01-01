// React Imports
import React, { FC } from "react";
import Display from "./Display";
import Responses from "./Responses";

// Material UI Imports
import { Typography } from "@material-ui/core";

interface SettingsProps {}

const Settings: FC<SettingsProps> = () => {
  return (
    <>
      <Typography variant="h4" align="center">
        Settings
      </Typography>
      <Display />
      <Responses />
    </>
  );
};

export default Settings;
