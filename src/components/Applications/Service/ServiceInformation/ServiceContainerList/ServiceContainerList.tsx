import React from "react";
//Script
import { firstLetterToUpperCase } from "../../../../../resources/scripts";
// Material-UI
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
//Interface
import {
  ServiceInterface,
  ContainerInterface,
} from "../../../../../resources/interfaces";
//Components
import ServiceItemRow from "../ServiceItemRow/ServiceItemRow";

/* const useStyles = makeStyles({
  paper: {
    borderRadius: "0.3rem",
    backgroundColor: "white",
    margin: "0.5rem 0",
    cursor: "pointer",
  },
}); */

interface Props {
  service: ServiceInterface;
  handleContainerClick: (container: ContainerInterface, title: string) => void;
}

export default function ServiceContainerList(props: Props) {
  const { service, handleContainerClick } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const useStyles = styled("div")(({ theme }) => ({
    borderRadius: "0.3rem",
    backgroundColor: "white",
    margin: "0.5rem 0",
    cursor: "pointer",
    boxShadow: theme.shadows[5],
  }));
  return (
    <>
      {service.containers.map(
        (container: ContainerInterface, index: number) => {
          return (
            <Grid
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
            </Grid>
          );
        }
      )}
    </>
  );
}
