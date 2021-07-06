import * as React from "react";
import { Link } from "react-router-dom";

type Props = {
  history: any;
  location: any;
  user_id: number;
  role: string;
};

type State = {
  events: any[];
  done: boolean;
};

class Events extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      events: [],
      done: false,
    };
  }

  componentDidMount = () => {
    const url = `/api/v1/interests/my_interests`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((interests) => {
        return interests.map((interest: any) => interest.event_id);
      })
      .then((event_ids) => {
        return Promise.all(
          event_ids.map((id: any) =>
            fetch(`/api/v1/show/${id}`).then((response) => {
              if (response.ok) {
                return response.json();
              }
              throw new Error("Network response was not ok.");
            })
          )
        );
      })
      .then((result) => {
        this.setState({
          events: result,
          done: true,
        });
      })
      .catch(() => this.props.history.push("/"));
  };

  render = () => {
    const { events } = this.state;

    const allInterests = events.map((entry) => (
      <div className="list-group">
        <a className="list-group-item list-group-item-action">
          <div>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{entry.event.name}</h5>
              <small className="text-muted">by {entry.organiser.name}</small>
            </div>
            <p className="mb-1">{entry.event.summary}</p>
            <div className="d-flex w-100 justify-content-between">
              <small className="text-muted">
                <button type="button" className="btn btn-outline-dark" disabled>
                  {entry.event.tag}
                </button>
              </small>
              <Link
                to={`/event/${entry.event.id}`}
                className="btn custom-button"
              >
                View Event
              </Link>
            </div>
          </div>
        </a>
      </div>
    ));

    const noInterests = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No such event yet. Why not <Link to="/events">Find one!</Link>
        </h4>
      </div>
    );

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">List of interested events</h1>
            <p className="lead text-muted">CCSGP</p>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="row" style={{ flexWrap: "nowrap" }}>
              <div
                className="row"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                }}
              >
                {allInterests.length > 0
                  ? allInterests
                  : this.state.done
                  ? noInterests
                  : null}
              </div>
            </div>
          </main>
        </div>
      </>
    );
  };
}

export default Events;
