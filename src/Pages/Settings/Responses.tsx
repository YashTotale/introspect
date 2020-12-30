// React Imports
import React, { FC } from "react";
import Config from "./Components/Config";

// Redux Imports
import { useSelector } from "react-redux";
import { getSavedPrefix } from "../../Redux";

// Material UI Imports
import { TextField } from "@material-ui/core";
import { EditOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  prefix: {
    maxWidth: 125,
  },
  prefixInput: {
    padding: 0,
  },
}));

const Responses: FC = () => {
  const classes = useStyles();
  const descriptionPrefix = useSelector(getSavedPrefix("description"));
  const reflectionPrefix = useSelector(getSavedPrefix("reflection"));

  return (
    <Config
      title="Responses"
      items={[
        {
          name: "Description Prefix",
          icon: <EditOutlined />,
          action: (
            <TextField
              placeholder={descriptionPrefix}
              inputProps={{
                className: classes.prefixInput,
              }}
              className={classes.prefix}
            />
          ),
        },
        {
          name: "Reflection Prefix",
          icon: <EditOutlined />,
          action: (
            <TextField
              placeholder={reflectionPrefix}
              inputProps={{
                className: classes.prefixInput,
              }}
              className={classes.prefix}
            />
          ),
        },
      ]}
    />
  );
};

export default Responses;
