import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Requests
import { getApplicationNamesList } from "../../resources/requests";
// Components
import ApplicationsList from "./Presentation/ApplicationsList";
// Redux
import allActions from "../../redux/actions";
// Interfaces
import { ApplicationInterface } from "../../resources/interfaces";

export default function Applications() {
  // Redux
  const applications = useSelector(
    (state: { application: { list: Array<ApplicationInterface> } }) =>
      state.application.list
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // Set Fetched Applications
    const setApplications = (
      applications: Array<ApplicationInterface>
    ): void => {
      dispatch(allActions.applicationActions.addApplication(applications));
    };
    // Get Applications every 10 seconds
    const interval = setInterval(
      (function fetchApplications() {
        getApplicationNamesList().then(res => {
          console.log("Fetched Apps: ", res);
          if (res) {
            setApplications(res);
          }
        });
        return fetchApplications;
      })(),
      10000
    );

    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  return <ApplicationsList applications={applications} />;
}
