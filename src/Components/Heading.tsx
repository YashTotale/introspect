// React Imports
import React, { FC } from "react";
import { useSnackbar } from "notistack";

// Material UI Imports
import {
  Typography,
  Divider,
  IconButton,
  Tooltip,
  Button,
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  heading: {
    position: "relative",
  },
  title: {},
  clearTooltip: {
    marginTop: theme.spacing(1),
  },
  clear: {
    position: "absolute",
    top: "50%",
    right: theme.spacing(1),
    transform: "translate(0%,-50%)",
    padding: theme.spacing(1),
  },
}));

interface HeadingProps {
  name: string;
  clear: () => void;
  undo: () => void;
  clearable: boolean;
  dividerClassName?: string;
  headingClassName?: string;
  titleClassName?: string;
  clearClassName?: string;
}

const Heading: FC<HeadingProps> = ({
  name,
  clear,
  undo,
  clearable,
  children,
  dividerClassName,
  headingClassName,
  titleClassName,
  clearClassName,
}) => {
  const classes = useStyles();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
          <IconButton
            size="small"
            className={`${classes.clear} ${clearClassName}`}
            onClick={() => {
              clear();
              enqueueSnackbar(`${name} cleared`, {
                variant: "success",
                autoHideDuration: 4000,
                action: (key) => (
                  <Button
                    onClick={() => {
                      undo();
                      closeSnackbar(key);
                    }}
                    variant="text"
                  >
                    Undo
                  </Button>
                ),
              });
            }}
            disabled={!clearable}
          >
            <Clear fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
    </>
  );
};

export default Heading;
