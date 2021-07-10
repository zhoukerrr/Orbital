import * as React from "react";
import { Link, Redirect } from "react-router-dom";
import { Event } from "./types";
import EventPreview from "./commons/EventPreview";

type Props = {
  match: {
    params: any;
  };
  history: any;
  user_id: number;
  role: string;
};

type State = {
  event: Event;
  isLoading: boolean;
  interest: boolean;
  interest_id: number;
  organiser: string;
};

export default class EventView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      event: {
        id: 0,
        name: "",
        details: "",
        tag: "",
        summary: "",
        user_id: undefined,
        venue: "",
        start_date: null,
        end_date: null,
        skills: "",
        link: "",
        poster: "",
        contact: "",
        status: "",
        remarks: "",
      },
      isLoading: false,
      interest: false,
      interest_id: 0,
      organiser: "",
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
      .then((response) => {
        this.setState({
          event: {
            ...response.event,
            start_date: new Date(response.event.start_date.replace(/-/g, "/")),
            end_date: new Date(response.event.end_date.replace(/-/g, "/")),
          },
          organiser: response.organiser.name,
        });
        console.log(response);
      })
      .catch(() => this.props.history.push("/events"));

    fetch(`/api/v1/interests/my_interests`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) =>
        response.map((interest: any) =>
          interest.event_id == this.props.match.params.id
            ? this.setState({ interest_id: interest.id, interest: true })
            : null
        )
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

  signUp = (interest: any) => {
    interest.preventDefault();
    const url = "/api/v1/interests/create";

    const token = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content");
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_id: this.props.match.params.id,
        user_id: this.props.user_id,
      }),
    })
      .then((response) => response.json())
      .then(() => fetch(`/api/v1/interests/my_interests`))
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) =>
        response.map((interest: any) =>
          interest.event_id == this.props.match.params.id
            ? this.setState({ interest_id: interest.id, interest: true })
            : null
        )
      )
      .catch(() => this.props.history.push("/events"));
  };

  signDown = () => {
    if (window.confirm("Are you sure you are no longer interested?")) {
      const url = `/api/v1/interests/destroy/${this.state.interest_id}`;
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
        .then(() => this.setState({ interest: false, interest_id: 0 }))
        .catch((error) => console.log(error.message));
    }
  };

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

  IndicateInterest = () => {
    return (
      <button type="button" className="btn btn-primary" onClick={this.signUp}>
        Sign up
      </button>
    );
  };

  WithdrawInterest = () => {
    return (
      <button type="button" className="btn btn-danger" onClick={this.signDown}>
        I am no longer interested
      </button>
    );
  };

  render() {
    const { event } = this.state;
    const id = this.props.match.params.id;
    const url = "/interest/" + id;

    const can_delete =
      this.props.role == "admin" || this.props.user_id == event.user_id;

    const can_decide = this.props.role == "admin";
    if (can_decide || can_delete || this.state.event.status == "approved") {
      return (
        <div className="">
          <div className="hero position-relative d-flex align-items-center justify-content-center">
            <div className="overlay bg-dark position-absolute" />
            <div>
              <h1 className="display-4 position-relative text-white">
                {event.name}
              </h1>
              <br />
              <h4 className="display-4 position-relative text-white">
                by {this.state.organiser}
              </h4>
            </div>
          </div>
          <div className="container py-5">
            <div className="row">
              <EventPreview event={this.state.event} ownerView={can_delete} />
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
              <br />
              {can_delete ? (
                <Link to={url} className="btn btn-primary">
                  View Event Signups
                </Link>
              ) : this.state.interest ? (
                <this.WithdrawInterest />
              ) : (
                <this.IndicateInterest />
              )}
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
