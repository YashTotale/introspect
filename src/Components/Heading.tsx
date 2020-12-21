// React Imports
import React, { FC } from "react";

// Material UI Imports
import { Typography, Divider, IconButton, Tooltip } from "@material-ui/core";
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
  dividerClassName?: string;
  headingClassName?: string;
  titleClassName?: string;
  clearClassName?: string;
  onClear: () => void;
}

const Heading: FC<HeadingProps> = ({
  dividerClassName,
  headingClassName,
  titleClassName,
  clearClassName,
  onClear,
  children,
}) => {
  const classes = useStyles();
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
            onClick={onClear}
          >
            <Clear fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
    </>
  );
};

export default Heading;
