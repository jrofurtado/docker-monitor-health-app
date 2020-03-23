import React, { useEffect, useState, Fragment } from "react";
import "./App.css";
//import { useSelector} from "react-redux";
import { getApps } from "../../resources/requests";

function App() {
  // Redux
  // @ts-ignore
  //const keycloak = useSelector(state => state.keycloak);
  //keycloak.logout();

  const [apps, setApps] = useState<Array<String>>([]);

  useEffect(() => {
    // On Component Mount: Get Apps
    getApps().then(res => {
      console.log("Apps: ", res);
      if (res) {
        setApps(res);
      }
    });
  }, []);

  return (
    <Fragment>
      <h1>Monitoring App</h1>
      <ul>
        {apps.map(app => (
          <li id={`${app}`}>app</li>
        ))}
      </ul>
    </Fragment>
  );
}

export default App;
