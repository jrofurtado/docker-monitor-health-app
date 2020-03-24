import React from "react";
import Applications from "../Applications/Applications";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
              <Link to="/Service">Services</Link>
            </li>
          </ul>
        </nav>
        <section>
          <Switch>
            <Route path="/history">
              <h2>History Page</h2>
            </Route>
            <Route path="/service">
              <h2>Service Page</h2>
            </Route>
            <Route path="/">
              <Applications />
            </Route>
          </Switch>
        </section>
      </div>
    </Router>
  );
}
