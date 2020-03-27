import React from 'react';
import { firstLetterToUpperCase } from '../../../../../resources/scripts';
// Material-UI
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

interface Props {
  name: string;
  healthy: boolean;
}

export default function ApplicationItemRow(props: Props): JSX.Element {
  return (
    <>
      <Grid item xs={6}>
        {firstLetterToUpperCase(props.name)}
      </Grid>
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        item
        xs={6}
      >
        {props.healthy ? (
          <IconButton aria-label="delete" className="green-color">
            <CheckCircleIcon fontSize="small" />
          </IconButton>
        ) : (
          <IconButton aria-label="delete" className="red-color">
            <CancelIcon fontSize="small" />
          </IconButton>
        )}
      </Grid>
    </>
  );
}
