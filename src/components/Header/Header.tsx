import React, { useState, MouseEvent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Header.css";
import Gravatar from "react-gravatar";
import { firstLetterToUpperCase } from "../../resources/scripts";
// Interfaces
import { headerProps } from "../../resources/interfaces";
// Redux

// Material-UI
import { Grid, MenuItem, Menu, Button } from "@mui/material";

import { ArrowBack, ExitToApp } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../../redux-store/props-redux/store";
import {
  setAppName,
  setServiceName,
  setSearchTimeStamp,
} from "../../redux-store/props-redux/reducers/propsReducers";

export default function Header(props: headerProps) {
  const { kc } = props;

  let location = useLocation();

  const { headerTitle, appName, serviceName, timeStamp } = useSelector(
    (state: RootState) => state.application
  );

  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(
    null
  );
  //opens the menu
  const handleClick = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };
  //closes the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  //sets the application name, service name and timestamp
  if (appName === "") {
    const path = location.pathname;
    const appLocation = path.split("/")[2];
    const serviceLocation = path.split("/")[3];
    dispatch(setAppName(appLocation));
    dispatch(setServiceName(serviceLocation));
    dispatch(setSearchTimeStamp(timeStamp));
  }
  //converts the timestamp to string
  const convertToString = (time: number) => {
    return time.toString();
  };
  console.log(`timeStamp: ${timeStamp}`);
  console.log(`converted: ${convertToString(timeStamp)}`);
  const setUrl = (title: string) => {
    return title === "Service Information"
      ? `/logs/${appName}/${serviceName}?from=${timeStamp}`
      : "/";
  };

  //sets header title
  const url = setUrl(headerTitle);

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
            {headerTitle !== "" && (
              <Link to={url}>
                <Button>
                  <ArrowBack />
                </Button>
              </Link>
            )}
          </Grid>
          <Grid item xs={8} className="header__container__content__center">
            <h1 className="header__container__content__center__title">
              {headerTitle}
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
