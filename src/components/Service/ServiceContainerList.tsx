import React from "react";
//Script
import { firstLetterToUpperCase } from "../../resources/scripts";
// Material-UI

//Interface
import {
  ServiceInterface,
  ContainerInterface,
} from "../../resources/interfaces";
//Components
import ServiceItemRow from "./ServiceItemRow";
import { StyledGrid } from "../../JsxStyles/Styles";

interface Props {
  service: ServiceInterface;
  handleContainerClick: (container: ContainerInterface, title: string) => void;
}

export default function ServiceContainerList(props: Props) {
  const { service, handleContainerClick } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (
    <StyledGrid>
      <>
        {service.containers.map(
          (container: ContainerInterface, index: number) => {
            return (
              <StyledGrid
                container
                key={index}
                onClick={() =>
                  handleContainerClick(
                    container,
                    firstLetterToUpperCase(
                      container.names.toString().substring(1, 50)
                    )
                  )
                }
              >
                <ServiceItemRow
                  name={firstLetterToUpperCase(
                    container.names.toString().substring(1, 50)
                  )}
                  healthy={container.healthy}
                />
              </StyledGrid>
            );
          }
        )}
      </>
    </StyledGrid>
  );
}
