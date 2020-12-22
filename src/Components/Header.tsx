// React Imports
import React, { FC, useState } from "react";
import LoginPopup from "./LoginPopup";

// Firebase Imports
import { useFirebase } from "react-redux-firebase";

// Redux Imports
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Avatar,
  Menu,
  Toolbar,
  Tooltip,
  MenuItem,
} from "@material-ui/core";

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
    // width: theme.spacing() * 2,
    // height: theme.spacing() * 2,
  },
}));

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const classes = useStyles();

  const currentUser = useSelector<RootState>(
    (state) => state.firebase.auth
  ) as any;

  return (
    <AppBar
      elevation={2}
      color="transparent"
      position="static"
      variant="elevation"
    >
      <Toolbar className={classes.toolbar}>
        {currentUser.isEmpty ? (
          <LoginPopup />
        ) : (
          <ProfileMenu user={currentUser} />
        )}
      </Toolbar>
    </AppBar>
  );
};

interface ProfileMenuProps {
  user: any;
}

const ProfileMenu: FC<ProfileMenuProps> = ({ user }) => {
  const classes = useStyles();
  const firebaseInstance = useFirebase();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Tooltip title="Profile" classes={{ tooltip: classes.profileTooltip }}>
        <Avatar
          alt="Profile Picture"
          src={user.photoURL}
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
            firebaseInstance.logout();
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
