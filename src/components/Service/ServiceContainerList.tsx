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
  response: ServiceInterface;
  handleContainerClick: (container: ContainerInterface, title: string) => void;
}

export default function ServiceContainerList(props: Props) {
  const { response, handleContainerClick } = props;

  return (
    <>
      {response.containers &&
        Array.isArray(response.containers) &&
        response.containers.map(
          (container: ContainerInterface, index: number) => (
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
          )
        )}
    </>
  );
}
