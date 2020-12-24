// React Imports
import React, { FC } from "react";
import NearTooltip from "./NearTooltip";
import useClosableSnackbar from "../../Hooks/useClosableSnackbar";

// Material UI Imports
import {
  Typography,
  Divider,
  IconButton,
  Button,
  capitalize,
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import {
  clearTodayData,
  TodayDataType,
  undoTodayData,
} from "../../Redux/today.slice";
import { useAppDispatch } from "../../Store";

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  heading: {
    position: "relative",
  },
  title: {},
  clear: {
    position: "absolute",
    top: "50%",
    right: theme.spacing(1),
    transform: "translate(0%,-50%)",
  },
  clearButton: {
    padding: theme.spacing(1),
  },
}));

interface HeadingProps {
  name: TodayDataType;
  clearable: boolean;
}

const Heading: FC<HeadingProps> = ({ name, clearable, children }) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const { enqueueSnackbar, closeSnackbar } = useClosableSnackbar();

  return (
    <>
      <Divider className={classes.divider} />
      <div className={classes.heading}>
        <Typography className={classes.title} variant="h5" align="center">
          {children}
        </Typography>
        <NearTooltip title="Clear" spacing={0.75}>
          <span className={classes.clear}>
            <IconButton
              size="small"
              className={classes.clearButton}
              onClick={() => {
                dispatch(clearTodayData(name));
                enqueueSnackbar(`${capitalize(name)} cleared`, {
                  variant: "success",
                  autoHideDuration: 4000,
                  action: (key) => {
                    const Undo = (
                      <Button
                        onClick={() => {
                          dispatch(undoTodayData(name));
                          closeSnackbar(key);
                        }}
                        variant="text"
                      >
                        Undo
                      </Button>
                    );
                    return Undo;
                  },
                });
              }}
              disabled={!clearable}
            >
              <Clear fontSize="small" />
            </IconButton>
          </span>
        </NearTooltip>
      </div>
    </>
  );
};

export default Heading;
