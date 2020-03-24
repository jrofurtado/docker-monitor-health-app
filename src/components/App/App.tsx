import React, { Fragment } from "react";
import "./App.css";
//import { useSelector } from "react-redux";
// Components
import Applications from "../Applications/Applications";

function App() {
  // Redux
  // @ts-ignore
  //const keycloak = useSelector(state => state.keycloak);
  //keycloak.logout();

  return (
    <Fragment>
      <h1>Monitoring App</h1>
      <Applications />
    </Fragment>
  );
}

export default App;
