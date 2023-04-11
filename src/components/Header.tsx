import React, { useState, MouseEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Header.css";
import Gravatar from "react-gravatar";
import { firstLetterToUpperCase } from "../resources/scripts";
// Interfaces
import { NotificationStatusInterface } from "../resources/interfaces";
// Redux
import allActions from "../redux-store/New-apps-redux/actions";
// Material-UI
import { Grid, MenuItem, Menu, Button } from "@mui/material";

import {
  ArrowBack,
  ExitToApp,
  NotificationsActive,
  NotificationsOff,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

interface headerProps {
  kc: any;
  title: string;
  currentComp: string;
  handleBackButtonClick: () => void;
}

export default function Header(props: headerProps) {
  const { kc, title, currentComp, handleBackButtonClick } = props;
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(
    null
  );

  const handleClick = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Redux
  const notificationStatus = useSelector(
    (state: {
      application: { notificationStatus: NotificationStatusInterface };
    }) => state.application.notificationStatus
  );
  const dispatch = useDispatch();

  // Set Notification Status
  const setNotificationStatus = (
    notificationStatus: NotificationStatusInterface
  ): void => {
    dispatch(
      allActions.applicationActions.addNotificationStatus(notificationStatus)
    );
  };

  // Logout
  const logout = (): void => {
    kc.logout();
  };

  return (
    <Grid container className="header">
      <Grid item xs={12} className="header__container">
        <Grid container className="header__container__content">
          <Grid item xs={2} className="header__container__content__left">
            {/* rever maneira mais rapida*/}
            {currentComp === "ServiceHistory" ? (
              <Link to="/">
                <Button className="header__container__content__left__backButton">
                  <ArrowBack />
                </Button>
              </Link>
            ) : (
              <Button
                className="header__container__content__left__backButton"
                onClick={handleBackButtonClick}
              >
                {currentComp === "Applications" ? null : <ArrowBack />}
              </Button>
            )}
          </Grid>
          <Grid item xs={8} className="header__container__content__center">
            <h1 className="header__container__content__center__title">
              {title}
            </h1>
          </Grid>
          <Grid item xs={2} className="header__container__content__right">
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Gravatar
                  email={kc.tokenParsed.preferred_username}
                  default="monsterid"
                  size={40}
                  className="photo"
                  onClick={handleClick}
                />
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    className="user-menu-item global-button"
                    onClick={() =>
                      setNotificationStatus({
                        global: !notificationStatus.global,
                        apps: notificationStatus.apps,
                      })
                    }
                  >
                    {notificationStatus.global ? (
                      <NotificationsActive className="active" />
                    ) : (
                      <NotificationsOff />
                    )}
                    <button>Subscrição Global</button>
                  </MenuItem>
                  <MenuItem
                    className="user-menu-item logout-button"
                    onClick={kc.logout}
                  >
                    <ExitToApp />
                    <button>Logout</button>
                  </MenuItem>
                </Menu>
              </Grid>
              <Grid item>
                <h6 id="username">
                  {firstLetterToUpperCase(kc.tokenParsed.preferred_username)}
                </h6>
                <p>
                  {firstLetterToUpperCase(kc.tokenParsed.preferred_username)}
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
