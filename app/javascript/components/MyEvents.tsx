import * as React from "react";
import * as qs from "qs";
import { Link, Redirect } from "react-router-dom";
import EventTypeButtonGroup from "./commons/EventTypeButtonGroup";
import EventCatalog from "./commons/EventCatalog";

type Props = {
  key: number;
  history: any;
  location: any;
  role: string;
};

type State = {
  queryString: string;
  eventType: "approved" | "rejected" | "submitted";
  tags: string[];
};

class Events extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    if (this.props.location.search !== "") {
      const params: any = qs.parse(this.props.location.search, {
        ignoreQueryPrefix: true,
      });
      this.state = {
        tags: Object.keys(params).includes("tags") ? params.tags : [],
        eventType: Object.keys(params).includes("status")
          ? params.status
          : "approved",
        queryString: Object.keys(params).includes("status")
          ? this.props.location.search + "&user=self"
          : this.props.location.search + "&status=approved&user=self",
      };
    } else {
      this.state = {
        queryString: "?status=approved&user=self",
        eventType: "approved",
        tags: [],
      };
    }
  }

  CreateButton = () => (
    <Link to="/event" className="btn custom-button">
      Create New Event
    </Link>
  );

  pageButtonGroupOnClickHandler = (value: number) => {
    var link = "/my_events?status=" + this.state.eventType + "&page=" + value;
    if (this.state.tags.length !== 0) {
      link = link.concat(
        "&" + qs.stringify({ tags: this.state.tags }, { encode: false })
      );
    }
    this.props.history.push(link);
  };

  eventTypeButtonOnClickHandler = (str: string) => {
    const link = "/my_events?status=" + str;
    this.props.history.push(link);
  };

  tagButtonOnClickHandler = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const link =
      "/my_events?status=" +
      this.state.eventType +
      "&" +
      qs.stringify({ tags: [evt.currentTarget.value] }, { encode: false });
    this.props.history.push(link);
  };

  render = () => {
    const canCreate =
      this.props.role == "admin" || this.props.role == "organiser";

    if (this.props.role == "admin" || this.props.role == "organiser") {
      return (
        <>
          <section className="jumbotron jumbotron-fluid text-center">
            <div className="container py-5">
              <h1 className="display-4">My Events</h1>
              <p className="lead text-muted">Learning web development again</p>
            </div>
          </section>
          <div className="py-5">
            <main className="container">
              <div className="d-flex justify-content-between">
                <EventTypeButtonGroup
                  currentType={this.state.eventType}
                  onClickHandler={this.eventTypeButtonOnClickHandler}
                />
                {canCreate ? <this.CreateButton /> : null}
              </div>
              <br />
              <EventCatalog
                key={Math.random()}
                queryString={this.state.queryString}
                pageButtonGroupOnClickHandler={
                  this.pageButtonGroupOnClickHandler
                }
                tagButtonOnClickHandler={this.tagButtonOnClickHandler}
              />
              <Link to="/" className="btn btn-link">
                Home
              </Link>
            </main>
          </div>
        </>
      );
    } else {
      return <Redirect push to="/events" />;
    }
  };
}

export default Events;
