// React Imports
import React, { FC, useState } from "react";
import NearTooltip from "./Reusable/NearTooltip";

// Redux Imports
import { useSelector } from "react-redux";
import { getUser, togglePopup, useAppDispatch, AppDispatch } from "../Redux";

// Firebase Imports
import { FirebaseReducer } from "react-redux-firebase";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Avatar,
  Menu,
  Toolbar,
  MenuItem,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { Person } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
  },
  avatar: {
    cursor: "pointer",
  },
}));

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const user = useSelector(getUser);

  return (
    <AppBar
      elevation={2}
      color="transparent"
      position="static"
      variant="elevation"
    >
      <Toolbar className={classes.toolbar}>
        {!user.isLoaded ? (
          <CircularProgress />
        ) : user.isEmpty ? (
          <NearTooltip title="Login" spacing={0.75}>
            <IconButton
              onClick={() =>
                dispatch(togglePopup({ open: true, type: "login" }))
              }
            >
              <Person />
            </IconButton>
          </NearTooltip>
        ) : (
          <ProfileMenu dispatch={dispatch} user={user} />
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
      <NearTooltip title="Profile" spacing={0.75}>
        <Avatar
          alt={user.displayName ?? "Profile Picture"}
          src={user.photoURL ?? undefined}
          variant="circular"
          className={classes.avatar}
          onClick={handleClick}
        />
      </NearTooltip>
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
