import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps,
} from "react-router-dom";
import Home from "../components/Home";
import Events from "../components/Events";
import Event from "../components/Event";
import NewEvent from "../components/NewEvent";
import MyEvents from "../components/MyEvents";
import AllSubmitted from "../components/AllSubmitted";

export default (props: any) => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route
        path="/all_submitted"
        exact
        render={(p: RouteComponentProps) => (
          <AllSubmitted {...p} role={props.role} />
        )}
      />
      <Route
        path="/my_events"
        exact
        render={(p: RouteComponentProps) => (
          <MyEvents {...p} user_id={props.user_id} role={props.role} />
        )}
      />
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
