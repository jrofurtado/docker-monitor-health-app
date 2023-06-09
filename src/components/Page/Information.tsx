import { Grid } from "@mui/material";
import ServiceInformation from "../Service/ServiceInformation";
import { useEffect, useState } from "react";
import { ServInterface } from "../../resources/interfaces";
import Header from "../Header/Header";
import { useDispatch } from "react-redux";
import { setHeaderTitle } from "../../redux-store/props-redux/reducers/propsReducers";

export default function Information() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderTitle("Service Information"));
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}></Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <ServiceInformation
          /* timeStamp={service.timeStamp}
            application={service.appName}
            server={service.serviceName}
            service={service} */
          />
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </>
  );
}
