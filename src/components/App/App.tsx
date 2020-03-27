import React from 'react';
//import { useSelector } from "react-redux";
import './App.css';
// Components
import Navigation from '../Navigation/Navigation';

function App(): JSX.Element {
  // Redux
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
