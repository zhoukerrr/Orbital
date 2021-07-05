import * as React from "react";
import { Link } from "react-router-dom";

type Props = {
  history: any;
  location: any;
  user_id: number;
  role: string;
};

type State = {
  interests: any[];
  done: boolean;
};

class Events extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      interests: [],
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
      .then((response) => {
        this.setState({
          interests: response,
          done: true,
        });
        console.log(response);
      })
      .catch(() => this.props.history.push("/"));
  };

  render = () => {
    const { interests } = this.state;

    const allInterests = interests.map((interest) => (
      <div className="list-group">
        <a className="list-group-item list-group-item-action">
          <div>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{interest.event_id}</h5>
            </div>
            <div className="d-flex w-100 justify-content-between">
              <Link
                to={`/event/${interest.event_id}`}
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
              <div className="column" style={{ width: "80%" }}>
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
