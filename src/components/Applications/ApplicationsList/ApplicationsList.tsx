import React, { useState } from 'react';
import './ApplicationsList.css';
// Material-UI
import Grid from '@material-ui/core/Grid';
// Components
import ApplicationListItem from './ApplicationListItem/ApplicationListItem';
// Interfaces
import { ApplicationInterface } from '../../../resources/interfaces';

interface Props {
  applications: Array<ApplicationInterface>;
  handleServiceClick: (app: string, service: string) => void;
}

export default function ApplicationsList(props: Props): JSX.Element {
  const [openAppName, setOpenAppName] = useState('');

  const handleApplicationClick = (clickedAppName: string): void => {
    setOpenAppName(openAppName !== clickedAppName ? clickedAppName : '');
  };

  return (
    <>
      <h2>Applications</h2>
      <Grid container spacing={1}>
        {props.applications.map((application: ApplicationInterface) => {
          const shouldOpen = openAppName === application.name ? true : false;
          return (
            <Grid key={`${application.name}`} item xs={12}>
              <ApplicationListItem
                application={application}
                open={shouldOpen}
                handleApplicationClick={handleApplicationClick}
                handleServiceClick={props.handleServiceClick}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
