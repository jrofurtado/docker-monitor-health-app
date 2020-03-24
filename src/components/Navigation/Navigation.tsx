import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// Components
import Applications from "../Applications/Applications";
import History from "../History/History";
import Service from "../Service/Service";
// Material-UI
import Container from "@material-ui/core/Container";

export default function Navigation() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Applications</Link>
            </li>
            <li>
              <Link to="/History">History</Link>
            </li>
            <li>
              <Link to="/Service">Service</Link>
            </li>
          </ul>
        </nav>
        <Container maxWidth="md">
          <Switch>
            <Route path="/history">
              <History />
            </Route>
            <Route path="/service">
              <Service />
            </Route>
            <Route path="/">
              <Applications />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}
