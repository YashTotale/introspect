// React Imports
import React, { FC } from "react";

// Redux Imports

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
} from "@material-ui/core";
import { Person } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
  },
  profileTooltip: {
    marginTop: theme.spacing(0.75),
  },
}));

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const classes = useStyles();

  return (
    <AppBar
      elevation={2}
      color="transparent"
      position="static"
      variant="elevation"
    >
      <Toolbar className={classes.toolbar}>
        <ProfileMenu />
      </Toolbar>
    </AppBar>
  );
};

interface ProfileMenuProps {}

const ProfileMenu: FC<ProfileMenuProps> = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Profile" classes={{ tooltip: classes.profileTooltip }}>
        <IconButton onClick={handleClick}>
          <Person />
        </IconButton>
      </Tooltip>
      <Menu
        elevation={6}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default Header;
