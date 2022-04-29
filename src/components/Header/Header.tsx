import React, { useState, MouseEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Header.css";
import Gravatar from "react-gravatar";
import { firstLetterToUpperCase } from "../../resources/scripts";
// Interfaces
import { NotificationStatusInterface } from "../../resources/interfaces";
// Redux
import allActions from "../../redux/actions";
// Material-UI
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";
import NavigationBar from "../Navigation/NavigationBar/NavigationBar";

interface Props {
  kc: any;
  title: string;
  currentComp: string;
  handleBackButtonClick: () => void;
}

export default function Header(props: Props): JSX.Element {
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

  return (
    <div className="header">
      <Grid container direction="row" justify="flex-start" alignItems="center">
        <Grid item xs={8}>
          <Grid container direction="row" justify="flex-start" alignItems="center">
            {currentComp !== "Applications" ? (
              <Grid item xs={1}>
                <NavigationBar handleBackButtonClick={handleBackButtonClick} />
              </Grid>) :
              <></>
            }
            <Grid item xs={11}>
              <h3 className="app-name">{title}</h3>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container justify="flex-end">
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
                    <NotificationsActiveIcon className="active" />
                  ) : (
                      <NotificationsOffIcon />
                    )}
                  <button>Subscrição Global</button>
                </MenuItem>
                <MenuItem
                  className="user-menu-item logout-button"
                  onClick={kc.logout}
                >
                  <ExitToAppIcon />
                  <button>Logout</button>
                </MenuItem>
              </Menu>
            </Grid>
            <Grid item>
              <h6 id="username">
                {firstLetterToUpperCase(
                  kc.tokenParsed.preferred_username
                )}
              </h6>
              <p>
                {firstLetterToUpperCase(
                  kc.tokenParsed.preferred_username
                )}
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div >
  );
}
