// React Imports
import React, { FC } from "react";

// Material UI Imports
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Tooltip, TooltipProps } from "@material-ui/core";

interface StyleProps {
  spacing: number;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  tooltip: {
    margin: ({ spacing }) => theme.spacing(spacing, 0),
  },
}));

interface NearTooltipProps extends TooltipProps {
  spacing: number;
}

const NearTooltip: FC<NearTooltipProps> = (props) => {
  const classes = useStyles({ spacing: props.spacing });

  return (
    <Tooltip
      {...props}
      classes={{
        ...props.classes,
        tooltip: `${props.classes?.tooltip} ${classes.tooltip}`,
      }}
    />
  );
};

export default NearTooltip;
