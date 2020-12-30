// React Imports
import React, { FC } from "react";

// Material UI Imports
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    minWidth: 40,
  },
}));

interface ConfigItem {
  name: string;
  description?: string;
  icon: JSX.Element;
  action: JSX.Element;
}

interface ConfigProps {
  title: string;
  items: ConfigItem[];
}

const Config: FC<ConfigProps> = ({ title, items }) => {
  const classes = useStyles();

  return (
    <List subheader={<ListSubheader>{title}</ListSubheader>}>
      {items.map(({ name, description, icon, action }, i) => (
        <ListItem key={i}>
          <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
          <ListItemText primary={name} secondary={description} />
          <ListItemSecondaryAction>{action}</ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default Config;
