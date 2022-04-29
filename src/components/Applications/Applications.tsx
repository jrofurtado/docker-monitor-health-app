import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Requests
import {
  getApplicationNamesList,
  getNotificationInfo,
} from "../../resources/requests";
// Components
import ApplicationsList from "./ApplicationsList/ApplicationsList";
// Redux
import allActions from "../../redux/actions";
// Interfaces
import {
  ApplicationInterface,
  NotificationStatusInterface,
} from "../../resources/interfaces";

interface Props {
  handleServiceClick: () => void;
  handleHeaderTitle: () => void;
  handleCurrentComp: (currentComp: string) => void;
}

export default function Applications(props: Props): JSX.Element {
  //State 
  const { handleServiceClick, handleHeaderTitle, handleCurrentComp } = props;
  /* Applications */

  // Redux
  const applications = useSelector(
    (state: { application: { list: Array<ApplicationInterface> } }) =>
      state.application.list
  );
  const notificationStatus = useSelector(
    (state: {
      application: { notificationStatus: NotificationStatusInterface };
    }) => state.application.notificationStatus
  );
  const dispatch = useDispatch();

  useEffect(() => {
    handleCurrentComp("Applications");
    // Set Fetched Applications
    const setApplications = (
      applications: Array<ApplicationInterface>
    ): void => {
      dispatch(allActions.applicationActions.addApplication(applications));
    };

    // Get Applications every 10 seconds
    const appInterval = setInterval(
      (function fetchApplications(): TimerHandler {
        getApplicationNamesList().then((res) => {
          console.log("Fetched Apps: ", res);
          if (res) {
            setApplications(res);
          }
        });
        return fetchApplications;
      })(),
      10000
    );

    return (): void => {
      clearInterval(appInterval);
    };
  }, [dispatch, handleCurrentComp]);

  /* Notifications */
  useEffect(() => {
    // Set Fetched Notification Status

    const setNotificationStatus = (
      notificationStatus: NotificationStatusInterface
    ): void => {
      dispatch(
        allActions.applicationActions.addNotificationStatus(notificationStatus)
      );
    };

    handleHeaderTitle();
    // Get Notification state every 10 seconds
    const notificationInterval = setInterval(
      (function fetchNotificationInfo(): TimerHandler {
        getNotificationInfo().then((res) => {
          console.log("Fetched Notification Status: ", res);
          if (res) {
            setNotificationStatus(res);
          }
        });
        return fetchNotificationInfo;
      })(),
      10000
    );

    return (): void => {
      clearInterval(notificationInterval);
    };
  }, [dispatch, handleHeaderTitle]);

  return (
    <div>
      <ApplicationsList
        applications={applications}
        notificationState={notificationStatus}
        handleServiceClick={handleServiceClick}
      />
    </div>
  );
}
