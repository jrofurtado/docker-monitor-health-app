import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Requests
import { getApplicationNamesList } from '../../resources/requests';
// Components
import ApplicationsList from './ApplicationsList/ApplicationsList';
import Service from './Service/Service';
// Redux
import allActions from '../../redux/actions';
// Interfaces
import { ApplicationInterface } from '../../resources/interfaces';

export default function Applications(): JSX.Element {
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
      (function fetchApplications(): TimerHandler {
        getApplicationNamesList().then((res) => {
          console.log('Fetched Apps: ', res);
          if (res) {
            setApplications(res);
          }
        });
        return fetchApplications;
      })(),
      10000
    );

    return (): void => {
      clearInterval(interval);
    };
  }, [dispatch]);

  // State
  const defaultServiceState: Array<string> = [];
  const [service, setService] = useState(defaultServiceState);

  const handleServiceClick = (app: string, service: string): void => {
    setService([app, service]);
  };

  return service.length ? (
    <Service appName={service[0]} serviceName={service[1]} />
  ) : (
    <ApplicationsList
      applications={applications}
      handleServiceClick={handleServiceClick}
    />
  );
}
