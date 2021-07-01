import * as qs from "qs";
import * as React from "react";
import { Link } from "react-router-dom";
import PageGroup from "./commons/PageButtonGroup";

type Props = {
  history: any;
  location: any;
  user_id: number;
  role: string;
};

type State = {
  events: any[];
  usernames: any[];
  done: boolean;
  page: number;
  noOfPages: number;
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
    };
  }

  componentDidMount = () => {
    var url: string = "/api/v1/events?status=approved&user=all";
    if (this.props.location.search === "") {
      url = url.concat("&offset=0&limit=" + this.noOfEventsPerPage);
    } else {
      const params: any = qs.parse(this.props.location.search, {
        ignoreQueryPrefix: true,
      });

      const keys: string[] = Object.keys(params);
      if (keys.includes("page")) {
        this.setState({ page: parseInt(params.page) });
        const offset: number =
          (parseInt(params.page) - 1) * this.noOfEventsPerPage;
        url = url.concat("&offset=" + offset);
      } else {
        url = url.concat("&offset=0"); // 0 as default
      }
      url = url.concat("&limit=" + this.noOfEventsPerPage); // 5 as default
    }

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
          noOfPages: Math.ceil(response.noOfEvents / this.noOfEventsPerPage),
        });
        console.log(response);
      })
      .then(() => this.setState({ done: true }))
      .catch(() => this.props.history.push("/"));
  };

  getNamefromID(id: number): string {
    const { usernames } = this.state;
    const user: any = usernames.find((set) => set.id === id);
    return user ? user.name : "Anonymous";
  }

  CreateButton = () => (
    <Link to="/event" className="btn custom-button">
      Create New Event
    </Link>
  );

  pageButtonGroupOnClickHandler = (value: number) => {
    const link = "/events?page=" + value;
    this.props.history.push(link);
    this.props.history.go(0);
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
            <div className="d-flex justify-content-between">
              <PageGroup
                noOfPages={this.state.noOfPages}
                currentPage={this.state.page}
                onClickHandler={this.pageButtonGroupOnClickHandler}
              />
              {canCreate ? <this.CreateButton /> : null}
            </div>
            <br />
            {/* events catalog */}
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
