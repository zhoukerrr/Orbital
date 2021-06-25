import * as React from "react";
import { Link, Redirect } from "react-router-dom";
import EventTypeButtonGroup from "./commons/EventTypeButtonGroup";
import PageGroup from "./commons/PageButtonGroup";

type Props = {
  history: any;
  user_id: number;
  role: string;
};

type State = {
  events: any[];
  usernames: any[];
  done: boolean;
  page: number;
  noOfPages: number;
  eventType: "approved" | "rejected" | "submitted";
};

class Events extends React.Component<Props, State> {
  private noOfEventsPerPage: number = 5;

  constructor(props: Props) {
    super(props);
    this.state = {
      events: [],
      usernames: [],
      done: false,
      page: 1,
      noOfPages: 1,
      eventType: "approved",
    };
  }

  componentDidMount = () => {
    const url = "/api/v1/events/self?status=approved";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        const begin = 0;
        const end = Math.min(
          begin + this.noOfEventsPerPage,
          response.event.length
        );

        this.setState({
          events: response.event.slice(begin, end),
          usernames: response.usernames,
          noOfPages: Math.ceil(response.event.length / this.noOfEventsPerPage),
        });
        console.log(response);
      })
      .then(() => this.setState({ done: true }))
      .catch(() => this.props.history.push("/"));
  };

  getNamefromID(id: number): string {
    const { usernames } = this.state;
    return usernames.find((set) => set.id == id).name;
  }

  CreateButton = () => (
    <div className="text-right mb-3">
      <Link to="/event" className="btn custom-button">
        Create New Event
      </Link>
    </div>
  );

  pageButtonGroupOnClickHandler = (value: number) => {
    const url = "/api/v1/events/self?status=" + this.state.eventType; // TODO: Add params to fetch only what is necessary
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        const begin = Math.min(
          (value - 1) * this.noOfEventsPerPage,
          Math.floor(response.event.length / this.noOfEventsPerPage) *
            this.noOfEventsPerPage
        );
        const end = Math.min(begin + 5, response.event.length);

        this.setState({
          events: response.event.slice(begin, end),
          usernames: response.usernames,
          noOfPages: Math.ceil(response.event.length / this.noOfEventsPerPage),
          page: value,
        });
        console.log(response);
      })
      .catch(() => this.props.history.push("/"));
    this.state.events.length;
  };

  eventTypeButtonOnClickHandler = (str: string) => {
    const value = str as "approved" | "rejected" | "submitted";
    const url = "/api/v1/events/self?status=" + value;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        const begin = 0;
        const end = Math.min(
          begin + this.noOfEventsPerPage,
          response.event.length
        );

        this.setState({
          events: response.event.slice(begin, end),
          usernames: response.usernames,
          noOfPages: Math.ceil(response.event.length / this.noOfEventsPerPage),
          page: 1,
          eventType: value,
        });
        console.log(response);
      })
      .then(() => this.setState({ done: true }))
      .catch(() => this.props.history.push("/"));
  };

  render = () => {
    const { events } = this.state;

    const canCreate =
      this.props.role == "admin" || this.props.role == "organiser";

    const allEvents = events.map((event) => (
      <div className="list-group">
        <a className="list-group-item list-group-item-action">
          <div>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{event.name}</h5>
              <small className="text-muted">
                by {this.getNamefromID(event.user_id)}
              </small>
            </div>
            <p className="mb-1">{event.summary}</p>
            <div className="d-flex w-100 justify-content-between">
              <small className="text-muted">
                <button type="button" className="btn btn-outline-dark">
                  {event.tag}
                </button>
              </small>
              <Link to={`/event/${event.id}`} className="btn custom-button">
                View Event
              </Link>
            </div>
          </div>
        </a>
      </div>
    ));
    const noEvent = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No such event yet. Why not <Link to="/event">create one</Link>
        </h4>
      </div>
    );

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
              <EventTypeButtonGroup
                currentType={this.state.eventType}
                onClickHandler={this.eventTypeButtonOnClickHandler}
              />
              <br />
              <br />
              <div className="d-flex justify-content-between">
                {allEvents.length > 0 ? (
                  <PageGroup
                    noOfPages={this.state.noOfPages}
                    currentPage={this.state.page}
                    onClickHandler={this.pageButtonGroupOnClickHandler}
                  />
                ) : null}
                {canCreate ? <this.CreateButton /> : null}
              </div>
              <br />
              <div
                className="row"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                }}
              >
                {allEvents.length > 0
                  ? allEvents
                  : this.state.done
                  ? noEvent
                  : null}
              </div>
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
