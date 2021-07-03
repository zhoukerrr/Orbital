import { repeat } from "lodash";
import * as React from "react";
import { Link, Redirect } from "react-router-dom";
import { isThisTypeNode } from "typescript";

type Props = {
  match: {
    params: any;
  };
  history: any;
  user_id: number;
  role: string;
};

type State = {
  event: {
    name: string;
    details: string;
    user_id: number;
    venue: string;
    // TODO: the type is not entirely Date, may have to do some convertion here
    start_date: any;
    end_date: any;
    skills: string;
    link: string;
    contact: string;
    status: string;
    remarks: string;
  };
  start_date: string;
  end_date: string;
  isLoading: boolean;
};

class Event extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      event: {
        name: "",
        details: "",
        user_id: undefined,
        venue: "",
        start_date: "",
        end_date: "",
        skills: "",
        link: "",
        contact: "",
        status: "",
        remarks: "",
      },
      start_date: "",
      end_date: "",
      isLoading: false,
    };

    this.addHtmlEntities = this.addHtmlEntities.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const url = `/api/v1/show/${id}`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) =>
        this.setState({
          event: response.event,
          start_date: response.start_date,
          end_date: response.end_date,
        })
      )
      .then(() =>
        this.setState((prevState) => ({
          event: {
            ...prevState.event,
            details:
              prevState.event.details.length == 0
                ? "No details available"
                : this.addHtmlEntities(prevState.event.details),
          },
        }))
      )
      .catch(() => this.props.history.push("/events"));
  }

  addHtmlEntities(str: string): string {
    return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  }

  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key: string = event.target.id;
    const value: any = event.target.value;

    this.setState((prevState) => ({
      event: {
        ...prevState.event,
        remarks: value,
      },
    }));
  };

  deleteEvent(): void {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      const {
        match: {
          params: { id },
        },
      } = this.props;
      const url = `/api/v1/destroy/${id}`;
      const token = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

      fetch(url, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(() => this.props.history.push("/events"))
        .catch((error) => console.log(error.message));
    }
  }

  approveEvent = () => {
    let current = this.state.event.status;
    if (window.confirm("Are you sure you want to APPROVE this entry?")) {
      this.setState({ isLoading: true });
      const {
        match: {
          params: { id },
        },
      } = this.props;
      const url = `/api/v1/approve/${id}`;
      const token = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

      fetch(`/api/v1/show/${id}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((response) =>
          response.event.status == current
            ? fetch(url, {
                method: "PATCH",
                headers: {
                  "X-CSRF-Token": token,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ remarks: this.state.event.remarks }),
              })
                .then((response) => {
                  if (response.ok) {
                    return response.json();
                  }
                  throw new Error("Network response was not ok.");
                })

                .catch((error) => console.log(error.message))
            : alert(
                "This entry was already " +
                  response.event.status.toUpperCase() +
                  " by another admin. Remarks: " +
                  response.event.remarks
              )
        )
        .then(() => this.props.history.push("/all_submitted"));
    }
  };

  rejectEvent = () => {
    let current = this.state.event.status;
    if (window.confirm("Are you sure you want to REJECT this entry?")) {
      this.setState({ isLoading: true });
      const {
        match: {
          params: { id },
        },
      } = this.props;
      const url = `/api/v1/reject/${id}`;
      const token = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

      fetch(`/api/v1/show/${id}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((response) =>
          response.event.status == current
            ? fetch(url, {
                method: "PATCH",
                headers: {
                  "X-CSRF-Token": token,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ remarks: this.state.event.remarks }),
              })
                .then((response) => {
                  if (response.ok) {
                    return response.json();
                  }
                  throw new Error("Network response was not ok.");
                })

                .catch((error) => console.log(error.message))
            : alert(
                "This entry was already " +
                  response.event.status.toUpperCase() +
                  " by another admin. Remarks: " +
                  response.event.remarks
              )
        )
        .then(() => this.props.history.push("/all_submitted"));
    }
  };

  Venue = () => (
    <>
      <h4 className="mb-2">Venue</h4>
      <div style={{ whiteSpace: "pre-line" }}>{this.state.event.venue}</div>
      <br />
    </>
  );

  Details = () => (
    <>
      <h4 className="mb-2">Details</h4>
      <div style={{ whiteSpace: "pre-line" }}>{this.state.event.details}</div>
    </>
  );

  Skills = () => (
    <>
      <h4 className="mb-2">Skills Needed</h4>
      {this.state.event.skills}
      <br />
    </>
  );

  Link = () => (
    <>
      <h4 className="mb-2">Sign Up Link</h4>
      <a
        href={"//" + this.state.event.link}
        type="button"
        className="btn btn-link"
      >
        {this.state.event.link}
      </a>
      <br />
    </>
  );

  Contact = () => (
    <>
      <h4 className="mb-2">Contact Details</h4>
      <div style={{ whiteSpace: "pre-line" }}>{this.state.event.contact}</div>
      <br />
    </>
  );

  Status = () => (
    <>
      <h4 className="mb-2">Status</h4>
      {this.state.event.status}
    </>
  );

  Remarks = () => (
    <>
      <h4 className="mb-2">Remarks</h4>
      {this.state.event.remarks == null ? "NIL" : this.state.event.remarks}
    </>
  );

  StartDate = () => (
    <>
      <h4 className="mb-2">Start Date</h4>
      {this.state.start_date}
      <br />
    </>
  );

  EndDate = () => (
    <>
      <h4 className="mb-2">End Date</h4>
      {this.state.end_date}
      <br />
    </>
  );

  Delete = () => (
    <>
      <button
        type="button"
        className="btn btn-warning"
        onClick={this.deleteEvent}
      >
        Delete Event
      </button>
      <br />
      <br />
    </>
  );

  Decision = () =>
    this.state.event.status == "approved" ? (
      <>
        <button
          type="button"
          className="btn btn-danger"
          onClick={this.rejectEvent}
        >
          Reject
        </button>
      </>
    ) : this.state.event.status == "rejected" ? (
      <>
        <button
          type="button"
          className="btn btn-success"
          onClick={this.approveEvent}
        >
          Approve
        </button>
      </>
    ) : this.state.event.status == "submitted" ? (
      <>
        <div className="btn-group" role="group">
          <button
            type="button"
            className="btn btn-success"
            onClick={this.approveEvent}
          >
            Approve
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.rejectEvent}
          >
            Reject
          </button>
        </div>
      </>
    ) : null;

  Spinner = () => {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  };

  render() {
    const { event } = this.state;

    const can_delete =
      this.props.role == "admin" || this.props.user_id == event.user_id;

    const can_decide = this.props.role == "admin";
    if (can_decide || can_delete || this.state.event.status == "approved") {
      return (
        <div className="">
          <div className="hero position-relative d-flex align-items-center justify-content-center">
            <div className="overlay bg-dark position-absolute" />
            <h1 className="display-4 position-relative text-white">
              {event.name}
            </h1>
          </div>
          <div className="container py-5">
            <div className="row">
              <div className="col-sm-12 col-lg-3">
                <ul className="list-group">
                  <this.StartDate />
                  <br />
                  <this.EndDate />
                  <br />
                  <this.Venue />
                  <br />
                  <this.Contact />
                  <br />
                  {can_delete ? <this.Status /> : null}
                  <br />
                  <br />
                  {can_delete ? <this.Remarks /> : null}
                </ul>
              </div>
              <div className="col-sm-12 col-lg-7">
                <this.Details />
                <br />
                <this.Skills />
                <br />
                <this.Link />
              </div>

              <div className="col-sm-12 col-lg-2">
                {can_delete ? <this.Delete /> : null}
                {can_decide ? (
                  <div className="form-group">
                    <label htmlFor="eventRemarks">Your Remarks</label>
                    <input
                      type="text"
                      name="remarks"
                      id="remarks"
                      className="form-control"
                      onChange={this.onInputChange}
                    />
                  </div>
                ) : null}
                <br />
                {!can_decide ? null : this.state.isLoading ? (
                  <this.Spinner />
                ) : (
                  <this.Decision />
                )}
              </div>
            </div>
          </div>
        </div>
      );
    } else if (event.user_id != undefined) {
      return <Redirect push to="/events" />;
    } else {
      return null;
    }
  }
}

export default Event;
