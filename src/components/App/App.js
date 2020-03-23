import React, { useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch, useStore } from "react-redux";
import { getApps } from "../../resources/requests";

function App() {
  // Redux
  const keycloak = useSelector(state => state.keycloak);
  //keycloak.logout();

  useEffect(() => {
    // On Component Mount: Get Apps
    getApps().then(res => console.log("Apps: ", res));
  });

  return <h1>Monitoring App</h1>;
}

export default App;
