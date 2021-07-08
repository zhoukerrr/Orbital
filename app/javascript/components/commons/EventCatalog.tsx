import * as qs from "qs";
import * as React from "react";
import { Link } from "react-router-dom";
import { Event } from "../types";
import PageGroup from "./PageButtonGroup";

type Props = {
  queryString: string;
  pageButtonGroupOnClickHandler: (value: number) => void;
  tagButtonOnClickHandler: (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

type State = {
  events: Event[];
  usernames: any[];
  page: number;
  noOfPages: number;
  isLoading: boolean;
};

export default class EventCatalog extends React.Component<Props, State> {
  private noOfEventsPerPage: number = 5;

  constructor(props: Props) {
    super(props);
    this.state = {
      events: [],
      usernames: [],
      page: 1,
      noOfPages: 0,
      isLoading: true,
    };
  }

  componentDidMount = () => {
    var url = "/api/v1/events?";
    const params: any = qs.parse(this.props.queryString, {
      ignoreQueryPrefix: true,
    });
    const keys: string[] = Object.keys(params);

    url += "status=" + params.status;
    url += "&user=" + params.user;
    url += "&limit=" + this.noOfEventsPerPage;
    if (keys.includes("page")) {
      this.setState({ page: parseInt(params.page) });
      const offset: number =
        (parseInt(params.page) - 1) * this.noOfEventsPerPage;
      url += "&offset=" + offset;
    }
    if (keys.includes("tags")) {
      url +=
        "&" + qs.stringify({ tags: params.tags }, { arrayFormat: "brackets" });
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
          isLoading: false,
        });
        console.log(response);
      })
      .catch(() => null);
  };

  getNamefromID(id: number): string {
    const { usernames } = this.state;
    const user: any = usernames.find((set) => set.id === id);
    return user ? user.name : "Anonymous";
  }

  getEventCard(event: Event): JSX.Element {
    return (
      <div className="list-group" key={event.id}>
        <div className="list-group-item list-group-item-action">
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
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  value={event.tag}
                  onClick={this.props.tagButtonOnClickHandler}
                >
                  {event.tag}
                </button>
              </small>
              <Link to={`/event/${event.id}`} className="btn custom-button">
                View Event
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  Spinner = () => {
    return (
      <div
        className="spinner-border"
        role="status"
        style={{ alignSelf: "center" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  };

  render() {
    const allEvents = this.state.events
      .slice()
      .map((value) => this.getEventCard(value));

    const noEvent = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No such event yet. Why not <Link to="/event">create one</Link>
        </h4>
      </div>
    );

    return (
      <>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            className="row"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
            }}
          >
            {allEvents.length > 0 ? (
              allEvents
            ) : !this.state.isLoading ? (
              noEvent
            ) : (
              <this.Spinner />
            )}
          </div>
          <br />
          <PageGroup
            noOfPages={this.state.noOfPages}
            currentPage={this.state.page}
            onClickHandler={this.props.pageButtonGroupOnClickHandler}
          />
        </div>
      </>
    );
  }
}
