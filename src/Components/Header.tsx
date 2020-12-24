// React Imports
import React, { FC, useState } from "react";
import NearTooltip from "./Reusable/NearTooltip";

// Redux Imports
import { useSelector } from "react-redux";
import { getUser, togglePopup, useAppDispatch, AppDispatch } from "../Redux";

// Firebase Imports
import { FirebaseReducer } from "react-redux-firebase";

// Material UI Imports
import {
  AppBar,
  Avatar,
  Menu,
  Toolbar,
  MenuItem,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { Assessment, Home, Person } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    height: theme.spacing(7),
  },
  button: {
    padding: theme.spacing(0.75),
  },
  icon: {
    fontSize: "1.75rem",
  },
  navButton: {
    margin: theme.spacing(0, 0.75),
  },
  home: {
    marginLeft: 0,
  },
  statistics: {
    marginRight: "auto",
  },
  avatar: {
    cursor: "pointer",
  },
}));

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const user = useSelector(getUser);

  const classes = useStyles({ loggedIn: !user.isEmpty });

  return (
    <AppBar
      elevation={2}
      color="transparent"
      position="static"
      variant="elevation"
    >
      <Toolbar className={classes.toolbar}>
        <NearTooltip title="Home" spacing={1}>
          <IconButton
            onClick={() => {
              user.isEmpty
                ? dispatch(togglePopup({ open: true, type: "login" }))
                : history.push("");
            }}
            className={`${classes.button} ${classes.home} ${classes.navButton}`}
          >
            <Home className={classes.icon} />
          </IconButton>
        </NearTooltip>
        <NearTooltip title="Statistics" spacing={1}>
          <IconButton
            onClick={() => {
              user.isEmpty
                ? dispatch(togglePopup({ open: true, type: "login" }))
                : history.push("statistics");
            }}
            className={`${classes.button} ${classes.navButton} ${classes.statistics}`}
          >
            <Assessment className={classes.icon} />
          </IconButton>
        </NearTooltip>
        {!user.isLoaded ? (
          <CircularProgress />
        ) : user.isEmpty ? (
          <LoginButton dispatch={dispatch} classes={classes} />
        ) : (
          <ProfileMenu
            dispatch={dispatch}
            history={history}
            user={user}
            classes={classes}
          />
        )}
      </Toolbar>
    </AppBar>
  );
};

interface LoginButtonProps {
  dispatch: AppDispatch;
  classes: ReturnType<typeof useStyles>;
}

const LoginButton: FC<LoginButtonProps> = ({ dispatch, classes }) => {
  return (
    <NearTooltip title="Login" spacing={1}>
      <IconButton
        onClick={() => dispatch(togglePopup({ open: true, type: "login" }))}
        className={classes.button}
      >
        <Person className={classes.icon} />
      </IconButton>
    </NearTooltip>
  );
};

interface ProfileMenuProps {
  user: FirebaseReducer.AuthState;
  dispatch: AppDispatch;
  classes: ReturnType<typeof useStyles>;
  history: ReturnType<typeof useHistory>;
}

const ProfileMenu: FC<ProfileMenuProps> = ({
  user,
  dispatch,
  classes,
  history,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <NearTooltip title="Profile" spacing={1}>
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
            history.push("settings");
          }}
        >
          Settings
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
