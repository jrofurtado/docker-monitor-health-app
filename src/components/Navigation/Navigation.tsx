import React from 'react';
// Components
import Applications from '../Applications/Applications';
// Material-UI
import Container from '@material-ui/core/Container';

export default function Navigation(): JSX.Element {
  return (
    <div>
      <Container maxWidth="md">
        <Applications />
      </Container>
    </div>
  );
}
