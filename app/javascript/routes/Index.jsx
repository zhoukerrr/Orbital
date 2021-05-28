import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
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
        render={(p) => <Events {...p} user_id={props.user_id} />}
      />
      <Route
        path="/event/:id"
        exact
        render={(p) => <Event {...p} user_id={props.user_id} />}
      />
      <Route
        path="/event"
        exact
        render={(p) => <NewEvent {...p} user_id={props.user_id} />}
      />
      <Route render={() => <Redirect to={{pathname: "/"}} />} />
    </Switch>
  </Router>
);
