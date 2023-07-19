import { Grid } from "@mui/material";
import Applications from "../ApplicationsList/Applications";
import ApplicationsStatus from "../Status/ApplicationsStatus";
import { useDispatch } from "react-redux"; // Import useSelector and useDispatch

export default function Home() {
  const dispatch = useDispatch();
  //links the application name and service name to the service
  const handleServiceClick = (app: string = "", serviceName: string = "") => {
    dispatch({
      type: "application/setService",
      payload: { appName: app, serviceName: serviceName },
    });
    dispatch({ type: "application/setView", payload: true });

    // Redirect to Service
  };

  // sets the current component
  const handleCurrentComp = (currentComp: string) => {
    dispatch({ type: "application/setCurrentComp", payload: currentComp });
    console.log("now" + currentComp);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}></Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Applications
            handleServiceClick={handleServiceClick}
            handleCurrentComp={handleCurrentComp}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}></Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <ApplicationsStatus />
        </Grid>
      </Grid>
    </>
  );
}
