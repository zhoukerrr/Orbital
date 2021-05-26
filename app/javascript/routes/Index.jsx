import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import Home from "../components/Home";
import Events from "../components/Events";
import Event from "../components/Event";
import NewEvent from "../components/NewEvent";

export default (props) => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route
        path="/events"
        exact
        render={() => <Events user_id={props.user_id} />}
      />
      <Route path="/event/:id" exact component={Event} />
      <Route
        path="/event"
        exact
        render={() => <NewEvent user_id={props.user_id} />}
      />
    </Switch>
  </Router>
);
