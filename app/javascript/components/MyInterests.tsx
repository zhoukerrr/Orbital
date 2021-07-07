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

class MyInterests extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      events: [],
      done: false,
    };
  }

  zip = (arr1: any[], arr2: any[]) => {
    for (let i = 0; i < arr1.length; i++) {
      arr1[i].username = arr2[i];
    }
    return arr1;
  };

  componentDidMount = () => {
    const url = `/api/v1/interests/my_interested_events`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((result) => {
        this.setState({
          events: this.zip(result.event, result.organiser),
          done: true,
        });
      })
      .catch(() => this.props.history.push("/"));
  };

  render = () => {
    const { events } = this.state;

    const allInterests = events.map((event) => (
      <div className="list-group">
        <a className="list-group-item list-group-item-action">
          <div>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{event.name}</h5>
              <small className="text-muted">by {event.username}</small>
            </div>
            <p className="mb-1">{event.summary}</p>
            <div className="d-flex w-100 justify-content-between">
              <small className="text-muted">
                <button type="button" className="btn btn-outline-dark" disabled>
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

export default MyInterests;
