import React from 'react';
import './ApplicationListItem.css';
// Interfaces
import {
  ApplicationInterface,
  ServerInterface,
} from '../../../../resources/interfaces';
// Material-UI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
// Components
import ApplicationItemRow from './ApplicationItemRow/ApplicationItemRow';

interface Props {
  application: ApplicationInterface;
  open: boolean;
  handleApplicationClick: (name: string) => void;
  handleServiceClick: (app: string, service: string) => void;
}

export default function ApplicationListItem(props: Props): JSX.Element {
  const handleRowClick = (name: string): void => {
    if (name === props.application.name) {
      props.handleApplicationClick(props.application.name);
    } else {
      props.handleServiceClick(props.application.name, name);
    }
  };

  return (
    <>
      <Paper className="application">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={`server-item max-width ${props.open ? 'active' : ''}`}
          onClick={(): void => handleRowClick(props.application.name)}
        >
          <ApplicationItemRow
            name={props.application.name}
            healthy={props.application.healthy}
          />
        </Grid>

        <Collapse
          in={props.open}
          timeout="auto"
          unmountOnExit
          className="max-width"
        >
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="flex-start"
            item
            xs={12}
            className={'applications-services max-width'}
          >
            {props.application.servers.map((server: ServerInterface) => (
              <Grid
                key={`${server.name}`}
                container
                direction="row"
                justify="center"
                alignItems="center"
                className="server-item max-width"
                onClick={(): void => handleRowClick(server.name)}
              >
                <ApplicationItemRow
                  name={server.name}
                  healthy={server.status.healthy}
                />
              </Grid>
            ))}
          </Grid>
        </Collapse>
      </Paper>
    </>
  );
}
