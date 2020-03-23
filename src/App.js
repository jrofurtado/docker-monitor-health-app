import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function App() {
  // Redux
  //const keycloak = useSelector(state => state.keycloak);
  //console.log("Keycloak: ", keycloak);

  //axios.defaults.headers.common["Authorization"] = "Bearer " + keycloak.token;

  axios
    .get("/api/apps")
    .then(async response => {
      console.log("Response1: ", response);
      const responseAsJson = await response.json();
      console.log("Response2: ", responseAsJson);
    })
    .catch(error => {
      console.log("Error: ", error);
    });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
