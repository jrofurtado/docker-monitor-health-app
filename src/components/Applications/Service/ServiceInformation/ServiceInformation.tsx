import React from 'react';
import './ServiceInformation.css';
import { ServiceInterface } from '../../../../resources/interfaces';

interface Props {
  service: ServiceInterface | {};
}

export default function ServiceInformation(props: Props): JSX.Element {
  const { service } = props;

  /*
  TODO:
  - Mostrada a data de forma legível (adicionar css)
  - Mostrar cada os componentes de forma semelhante à lista de aplicações
  */

  // If Loading
  if (service === {}) {
    return <p>Service Information</p>;
  } else {
    return (
      <>
        <p>Service Information</p>
        <pre>{JSON.stringify(service, undefined, 2)}</pre>
      </>
    );
  }
}
