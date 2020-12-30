// React Imports
import React, { FC } from "react";
import Config from "./Components/Config";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getPrefix,
  initialSettingsState,
  setPrefix,
  useAppDispatch,
} from "../../Redux";

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
  const dispatch = useAppDispatch();

  const descriptionPrefix = useSelector(getPrefix("description"));
  const reflectionPrefix = useSelector(getPrefix("reflection"));

  return (
    <Config
      title="Responses"
      items={[
        {
          name: "Description Prefix",
          icon: <EditOutlined />,
          action: (
            <TextField
              placeholder={initialSettingsState.prefix.description}
              inputProps={{
                className: classes.prefixInput,
              }}
              value={descriptionPrefix}
              className={classes.prefix}
              onChange={(e) =>
                dispatch(setPrefix({ description: e.target.value }))
              }
            />
          ),
        },
        {
          name: "Reflection Prefix",
          icon: <EditOutlined />,
          action: (
            <TextField
              placeholder={initialSettingsState.prefix.reflection}
              inputProps={{
                className: classes.prefixInput,
              }}
              value={reflectionPrefix}
              className={classes.prefix}
              onChange={(e) =>
                dispatch(setPrefix({ reflection: e.target.value }))
              }
            />
          ),
        },
      ]}
    />
  );
};

export default Responses;
