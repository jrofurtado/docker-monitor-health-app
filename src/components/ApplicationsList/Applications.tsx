import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Requests
import { getApplicationNamesList } from "../../resources/requests";
// Components
import ApplicationsList from "./ApplicationsList";

// Redux

// Interfaces
import {
  ApplicationInterface,
  NotificationStatusInterface,
} from "../../resources/interfaces";

import {
  setHeaderTitle,
  setNewApplications,
} from "../../redux-store/props-redux/reducers/propsReducers";
import { RootState } from "../../redux-store/props-redux/store";

interface Props {
  handleServiceClick: () => void;
  handleHeaderTitle?: () => void;
  handleCurrentComp: (currentComp: string) => void;
}

export default function Applications(props: Props): JSX.Element {
  //State
  const { handleServiceClick } = props;
  /* Applications */

  // Redux
  const applications = useSelector(
    (state: RootState) => state.application.newApplications
  );
  /* console.log(applications); */
  const notificationStatus = useSelector(
    (state: RootState) => state.application.newNotificationStatus
  );
  /* console.log(notificationStatus); */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderTitle(""));
    const setApplications = (
      applications: Array<ApplicationInterface>
    ): void => {
      dispatch(setNewApplications(applications));
    };

    // Get Applications every 10 seconds
    const appInterval = setInterval(
      (function fetchApplications(): TimerHandler {
        getApplicationNamesList().then((res) => {
          // console.log("Fetched Apps: ", res);
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
  }, []);

  return (
    <>
      <ApplicationsList
        applications={applications}
        notificationState={notificationStatus}
        handleServiceClick={handleServiceClick}
      />
    </>
  );
}
