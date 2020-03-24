import React from "react";
import "./App.css";
//import { useSelector } from "react-redux";
// Components
import Navigation from "../Navigation/Navigation";

function App() {
  // Redux
  // @ts-ignore
  //const keycloak = useSelector(state => state.keycloak);
  //keycloak.logout();

  return (
    <>
      <h1>Monitoring App</h1>
      <Navigation />
    </>
  );
}

export default App;
