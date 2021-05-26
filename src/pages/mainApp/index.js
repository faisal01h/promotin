import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "../../components/molecules";
import Home from "../Home";

function MainApp() {
  return (
    <div className="main-app wrapper">
      <Header />

      <div className="content-wrapper">
        <Router>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default MainApp;
