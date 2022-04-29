import React from 'react';
// Components
import ServiceHistory from './ServiceInformation/ServiceHistory';
import ServiceInformation from './ServiceInformation/ServiceInformation';

// Interface
import { ServiceInterface } from '../../../resources/interfaces';

interface Props {
  appName: string;
  serviceName: string;
  handleHeaderTitle: (...args: string[]) => void;
  handleCurrentComp: (currentComp: string) => void;
  view: boolean;
  service: ServiceInterface | any;
  handleMessageClick: (service: ServiceInterface) => void;
}

export default function Service(props: Props): JSX.Element {
  const { appName, serviceName, handleHeaderTitle, handleCurrentComp, view, service, handleMessageClick } = props;


  return view ? <ServiceInformation appName={appName} serviceName={serviceName} service={service} handleHeaderTitle={handleHeaderTitle}
    handleCurrentComp={handleCurrentComp} /> : (
      <>
        <ServiceHistory appName={appName} serviceName={serviceName} handleHeaderTitle={handleHeaderTitle} handleMessageClick={handleMessageClick}
          handleCurrentComp={handleCurrentComp} />
      </>
    );
}