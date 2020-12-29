// React Imports
import React, { FC } from "react";

// Redux Imports
import { toggleDarkMode, useAppDispatch } from "../../Redux";

// Material UI Imports
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Switch,
} from "@material-ui/core";
import { Brightness7, Brightness4 } from "@material-ui/icons";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  display: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Display: FC = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const theme = useTheme();

  return (
    <List
      subheader={<ListSubheader>Display</ListSubheader>}
      className={classes.display}
    >
      <ListItem>
        <ListItemIcon>
          {theme.palette.type === "dark" ? <Brightness4 /> : <Brightness7 />}
        </ListItemIcon>
        <ListItemText primary="Dark Mode" />
        <ListItemSecondaryAction>
          <Switch
            checked={theme.palette.type === "dark"}
            onChange={() =>
              dispatch(toggleDarkMode(theme.palette.type !== "dark"))
            }
            edge="end"
          />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
};

export default Display;
