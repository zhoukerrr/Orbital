import * as React from "react";
import { Link } from "react-router-dom";

type Props = {
  history: any;
  location: any;
  user_id: number;
  role: string;
};

type State = {
  reports: any[];
  done: boolean;
};

class Reports extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      reports: [],
      done: false,
    };
  }

  componentDidMount = () => {
    const url = `/api/v1/reports/index`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((result) => {
        this.setState({
          reports: result,
          done: true,
        });
      })
      .catch(() => this.props.history.push("/"));
  };

  render = () => {
    const { reports } = this.state;

    const allInterests = reports.map((report) => (
      <div className="list-group">
        <a className="list-group-item list-group-item-action">
          <div>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{report.event_id}</h5>
              <small className="text-muted">by {report.user_id}</small>
            </div>
            <Link to={`/report/${report.id}`} className="btn custom-button">
              View Report
            </Link>
          </div>
        </a>
      </div>
    ));

    const noInterests = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>No reports yet.</h4>
      </div>
    );

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">Reports</h1>
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

export default Reports;
