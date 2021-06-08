import { clamp, range, round } from "lodash";
import * as React from "react";
import { Link } from "react-router-dom";
import PageGroup from "./PageGroup";

type Props = {
  match: {
    params: any;
  };
  history: any;
  user_id: number;
  role: string;
};

type State = {
  events: any[];
  usernames: any[];
  done: boolean;
  page: number;
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
    };
  }

  componentDidMount = () => {
    const {
      match: {
        params: { page },
      },
    } = this.props;
    const url = "/api/v1/events/public";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        this.setState({
          events: response.event,
          usernames: response.usernames,
          page: clamp(
            parseInt(page),
            1,
            Math.ceil(response.event.length / this.noOfEventsPerPage)
          ),
        });
        console.log(response);
      })
      .then(() => this.setState({ done: true }))
      .catch(() => this.props.history.push("/"));
  };

  UNSAFE_componentWillReceiveProps = (nextProp: Props) => {
    const {
      match: {
        params: { page },
      },
    } = nextProp;
    this.setState({ page: parseInt(page) });
    const url = "/api/v1/events/public";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        this.setState({
          events: response.event,
          usernames: response.usernames,
        });
        console.log(response);
      })
      .then(() => this.setState({ done: true }))
      .catch(() => nextProp.history.push("/"));
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

  render = () => {
    const { events } = this.state;
    const size: number = events.length;
    const begin = Math.min(
      (this.state.page - 1) * this.noOfEventsPerPage,
      Math.floor(size / this.noOfEventsPerPage) * this.noOfEventsPerPage
    );
    const end = Math.min(begin + 5, size);
    const allEvents = events.slice(begin, end).map((event) => (
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
                  Tag 1
                </button>
                <button type="button" className="btn btn-outline-dark">
                  Tag 2
                </button>
                <button type="button" className="btn btn-outline-dark">
                  Tag 3
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

    const canCreate =
      this.props.role == "admin" || this.props.role == "organiser";

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">List of events</h1>
            <p className="lead text-muted">Learning web development again</p>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            {allEvents.length > 0 ? (
              <PageGroup
                history={this.props.history}
                numberOfEvents={events.length}
                currentPage={this.state.page}
                numberOfEventsPerPage={this.noOfEventsPerPage}
              />
            ) : null}
            {canCreate ? <this.CreateButton /> : null}
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
  };
}

export default Events;
