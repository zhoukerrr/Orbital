import * as React from "react";
import { Link, Redirect } from "react-router-dom";
import EventEdit from "./commons/EventEdit";

type Props = {
  history: any;
  user_id: number;
  role: string;
};

type State = {
  name: string;
  tag: string;
  summary: string;
  venue: string;
  startDate: Date;
  endDate: Date;
  details: string;
  skills: string;
  link: string;
  contact: string;
  poster: string;
  user_id: number;
  isLoading: boolean;
};

class NewEvent extends React.Component<Props, State> {
  private newDate: Date;

  constructor(props: any) {
    super(props);

    this.newDate = new Date();

    this.state = {
      name: "",
      tag: "",
      summary: "",
      venue: "",
      startDate: new Date(
        this.newDate.getFullYear(),
        this.newDate.getMonth(),
        this.newDate.getDate(),
        23,
        59,
        59
      ),
      endDate: new Date(
        this.newDate.getFullYear(),
        this.newDate.getMonth(),
        this.newDate.getDate(),
        23,
        59,
        59
      ),
      details: "",
      skills: "",
      link: "",
      contact: "",
      poster: "",
      user_id: this.props.user_id,
      isLoading: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  stripHtmlEntities(str: string): string {
    return String(str).replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  onChangeHandler = (key: string, value: any) => {
    if (Object.keys(this.state).includes(key)) {
      this.setState({
        [key]: value,
      } as Pick<State, keyof State>);
    }
  };

  onSubmit(event: any) {
    event.preventDefault();
    this.setState({ isLoading: true });
    const url = "/api/v1/events/create";
    const submission = this.state;

    const body = {
      ...submission,
      start_date: submission.startDate,
      end_date: submission.endDate,
      details: this.stripHtmlEntities(submission.details),
    };
    delete body.startDate;
    delete body.endDate;

    const token = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content");
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((response) => this.props.history.push(`/event/${response.id}`))
      .catch((error) => console.log(error.message));
  }

  TermsAndConditions = () => {
    return (
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="invalidCheck"
          required
        ></input>
        <label className="form-check-label">
          I agree to{" "}
          <a href={window.location.origin + "/homepage/about"} target="_blank">
            Terms and Conditions
          </a>
        </label>
      </div>
    );
  };

  Spinner = () => {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  };

  render() {
    const canCreate =
      this.props.role == "admin" || this.props.role == "organiser";
    const event = {
      ...this.state,
      start_date: this.state.startDate,
      end_date: this.state.endDate,
      status: "",
      remarks: "",
    };
    delete event.isLoading;
    delete event.startDate;
    delete event.endDate;

    if (canCreate) {
      return (
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <h1 className="font-weight-normal mb-5">Add a new event.</h1>
              <form onSubmit={this.onSubmit}>
                <EventEdit
                  event={event}
                  onChangeHandler={this.onChangeHandler}
                />
                <this.TermsAndConditions />
                {this.state.isLoading ? (
                  <>
                    <br />
                    <this.Spinner />
                  </>
                ) : (
                  <button type="submit" className="btn custom-button mt-3">
                    Create Event
                  </button>
                )}
                <br />
                <Link to="/events" className="btn btn-link mt-3">
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect push to="/events" />;
    }
  }
}

export default NewEvent;
