import React, { useState, useEffect } from 'react';
// Scripts
import { firstLetterToUpperCase } from '../../../resources/scripts';
// Requests
import { getServiceInfo } from '../../../resources/requests';
// Components
import ServiceInformation from './ServiceInformation/ServiceInformation';
import ServiceHistory from './ServiceHistory/ServiceHistory';

interface Props {
  appName: string;
  serviceName: string;
}

export default function Service(props: Props): JSX.Element {
  // State
  const [service, setService] = useState({});

  useEffect(() => {
    getServiceInfo(props.appName, props.serviceName).then((res) => {
      console.log('Fetched Service: ', res);
      if (res) {
        setService(res);
      }
    });
  }, []);

  /*
  TODO:
  - Mostrar duas Tabs (Information & Service)
  - Só apresentar o componente correspondente á tab ativa
  - Adicionar CSS a este componente
  - Poder voltar á lista de aplicações novamente
  */

  return (
    <div>
      <h2>
        {firstLetterToUpperCase(props.appName)} -{' '}
        <span>{firstLetterToUpperCase(props.serviceName)}</span>
      </h2>
      <ServiceInformation service={service} />
      <ServiceHistory />
    </div>
  );
}
