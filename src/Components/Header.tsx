// React Imports
import React, { FC, useState } from "react";

// Redux Imports
import { useSelector } from "react-redux";
import { getUser, togglePopup } from "../Redux";
import { AppDispatch, useAppDispatch } from "../Redux/Store";

// Firebase Imports
import { FirebaseReducer } from "react-redux-firebase";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Avatar,
  Menu,
  Toolbar,
  Tooltip,
  MenuItem,
  IconButton,
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
  avatar: {
    cursor: "pointer",
  },
}));

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const currentUser = useSelector(getUser);

  return (
    <AppBar
      elevation={2}
      color="transparent"
      position="static"
      variant="elevation"
    >
      <Toolbar className={classes.toolbar}>
        {currentUser.isEmpty ? (
          <Tooltip title="Login" classes={{ tooltip: classes.profileTooltip }}>
            <IconButton
              onClick={() =>
                dispatch(togglePopup({ open: true, type: "login" }))
              }
            >
              <Person />
            </IconButton>
          </Tooltip>
        ) : (
          <ProfileMenu dispatch={dispatch} user={currentUser} />
        )}
      </Toolbar>
    </AppBar>
  );
};

interface ProfileMenuProps {
  user: FirebaseReducer.AuthState;
  dispatch: AppDispatch;
}

const ProfileMenu: FC<ProfileMenuProps> = ({ user, dispatch }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Tooltip title="Profile" classes={{ tooltip: classes.profileTooltip }}>
        <Avatar
          alt={user.displayName ?? "Profile Picture"}
          src={user.photoURL ?? undefined}
          variant="circular"
          className={classes.avatar}
          onClick={handleClick}
        />
      </Tooltip>
      <Menu
        elevation={6}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(togglePopup({ type: "logout", open: true }));
            handleClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;
