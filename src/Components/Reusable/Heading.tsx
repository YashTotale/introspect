// React Imports
import React, { FC } from "react";
import useClosableSnackbar from "../../Hooks/useClosableSnackbar";

// Material UI Imports
import {
  Typography,
  Divider,
  IconButton,
  Tooltip,
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
  clearTooltip: {
    marginTop: theme.spacing(0.75),
  },
}));

interface HeadingProps {
  name: TodayDataType;
  clearable: boolean;
  dividerClassName?: string;
  headingClassName?: string;
  titleClassName?: string;
  clearClassName?: string;
}

const Heading: FC<HeadingProps> = ({
  name,
  clearable,
  children,
  dividerClassName,
  headingClassName,
  titleClassName,
  clearClassName,
}) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const { enqueueSnackbar, closeSnackbar } = useClosableSnackbar();

  return (
    <>
      <Divider className={`${classes.divider} ${dividerClassName}`} />
      <div className={`${classes.heading} ${headingClassName}`}>
        <Typography
          className={`${classes.title} ${titleClassName}`}
          variant="h5"
          align="center"
        >
          {children}
        </Typography>
        <Tooltip
          title="Clear"
          interactive
          classes={{
            tooltip: classes.clearTooltip,
          }}
        >
          <span className={`${classes.clear} ${clearClassName}`}>
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
        </Tooltip>
      </div>
    </>
  );
};

export default Heading;
