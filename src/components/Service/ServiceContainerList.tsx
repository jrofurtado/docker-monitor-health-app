import React from "react";
//Script

// Material-UI
import { Grid } from "@mui/material";

//Interface
import {
  ServiceInterface,
  ContainerInterface,
} from "../../resources/interfaces";
//Components
import ServiceItemRow from "./ServiceItemRow";

interface Props {
  service: ServiceInterface;
  handleContainerClick: (container: ContainerInterface, title: string) => void;
}

export default function ServiceContainerList(props: Props) {
  const { service, handleContainerClick } = props;

  return (
    <>
      {service.containers?.map(
        (container: ContainerInterface, index: number) => {
          return (
            <Grid
              container
              key={index}
              onClick={() =>
                handleContainerClick(
                  container,

                  container.names.toString().substring(1, 50)
                )
              }
            >
              <ServiceItemRow
                name={container.names.toString().substring(1, 50)}
                healthy={container.healthy}
              />
            </Grid>
          );
        }
      )}
    </>
  );
}
