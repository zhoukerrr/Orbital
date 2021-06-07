import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  RouteComponentProps,
} from "react-router-dom";
import Home from "../components/Home";
import Events from "../components/Events";
import Event from "../components/Event";
import NewEvent from "../components/NewEvent";

export default (props: any) => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route
        path="/events"
        exact
        render={(p: RouteComponentProps) => (
          <Events {...p} user_id={props.user_id} role={props.role} />
        )}
      />
      <Route
        path="/event/:id"
        exact
        render={(p: RouteComponentProps) => (
          <Event {...p} user_id={props.user_id} role={props.role} />
        )}
      />
      <Route
        path="/event"
        exact
        render={(p: RouteComponentProps) => (
          <NewEvent {...p} user_id={props.user_id} role={props.role} />
        )}
      />
    </Switch>
  </Router>
);

//Default route is removed
//<Route render={() => <Redirect to={{ pathname: "/" }} />} />
