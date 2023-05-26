import { Grid } from "@mui/material";
import ServiceHistory from "../Service/ServiceHistory";
import { useEffect, useState } from "react";
import { ServInterface, ServiceInterface } from "../../resources/interfaces";
import { useDispatch } from "react-redux";
import { setHeaderTitle } from "../../redux-store/props-redux/reducers/propsReducers";

export default function History() {
  const [service, setService] = useState<ServInterface | any>({
    appName: "",
    serviceName: "",
  });

  const [view, setView] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderTitle("Service History"));
  }, []);

  const handleMessageClick = (service: ServiceInterface): void => {
    setService(service);
    setView(true);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}></Grid>
        <Grid item xs={1}></Grid>

        <Grid item xs={10}>
          <ServiceHistory handleMessageClick={handleMessageClick} />
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </>
  );
}
