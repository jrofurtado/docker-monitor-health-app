import React, { useState, MouseEvent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Header.css";
import Gravatar from "react-gravatar";
import { firstLetterToUpperCase } from "../resources/scripts";
// Interfaces
import {
  NotificationStatusInterface,
  headerProps,
} from "../resources/interfaces";
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
import { Link, useLocation } from "react-router-dom";

export default function Header(props: headerProps) {
  const {
    kc,
    title,
    currentComp,

    appName,
    serviceName,
  } = props;

  let location = useLocation();

  const [serv, setServ] = useState<string>(
    serviceName ?? location.pathname.split("/")[3]
  );
  const [app, setApp] = useState<string>(
    appName ?? location.pathname.split("/")[2]
  );

  useEffect(() => {
    console.log("serv");
    console.log(serv);
    console.log("app");
    console.log(app);

    if (!appName || !serviceName) {
      setApp(location.pathname.split("/")[2]);
      setServ(location.pathname.split("/")[3]);
      console.log(`path ${location.pathname}`);
    }
  }, [app, appName, location.pathname, serv, serviceName]);

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

  console.log("location");
  console.log(location);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="header"
    >
      <Grid item xs={12} className="header__container">
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          className="header__container__content"
        >
          <Grid
            item
            xs={2}
            alignItems="center"
            justifyContent="center"
            className="header__container__content__left"
          >
            {/* rever maneira mais rapida*/}

            <Link
              to={
                currentComp === "ServiceInformation"
                  ? `/logs/${app}/${serv}/`
                  : "/"
              }
            >
              <ArrowBack
                className={
                  currentComp !== "Applications"
                    ? "back-button"
                    : "back-button hide"
                }
                /* onClick={handleBackButtonClick} */
              />
            </Link>

            {/*  {currentComp === "ServiceInformation" ? (
              <Link to={`/logs/${app}/${serv}/`}>
                <ArrowBack
                  className="back-button"
                  onClick={handleBackButtonClick}
                />
              </Link>
            ) : (
              <Link to="/">
                <ArrowBack
                  className="back-button "
                  onClick={handleBackButtonClick}
                />
              </Link>
            )} */}
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
