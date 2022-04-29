import React from "react";
import { SnackbarProvider } from "notistack";
//import { useSelector } from "react-redux";
import "./App.css";
// Components
import Navigation from "../Navigation/Navigation";

interface Props {
  kc: any;
}

function App(props: Props): JSX.Element {
  const { kc } = props;

  // Redux
  //const keycloak = useSelector(state => state.keycloak);
  //keycloak.logout();

  return (
    <SnackbarProvider maxSnack={3}>
      <>
        <Navigation kc={kc} />
      </>
    </SnackbarProvider>
  );
}

export default App;
