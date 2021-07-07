import * as React from "react";
import { Link, Redirect } from "react-router-dom";
import EventEdit from "./commons/EventEdit";
import EventPreview from "./commons/EventPreview";
import { Event } from "./types";

type Props = {
  history: any;
  user_id: number;
  role: string;
};

type State = {
  event: Event;
  isLoading: boolean;
  preview: boolean;
};

class NewEvent extends React.Component<Props, State> {
  private newDate: Date;

  constructor(props: any) {
    super(props);

    this.newDate = new Date();

    this.state = {
      event: {
        name: "",
        tag: "",
        summary: "",
        venue: "",
        start_date: new Date(
          this.newDate.getFullYear(),
          this.newDate.getMonth(),
          this.newDate.getDate(),
          23,
          59,
          59
        ),
        end_date: new Date(
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
        status: "submitted",
        remarks: "",
      },
      isLoading: false,
      preview: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  stripHtmlEntities(str: string): string {
    return String(str).replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  onChangeHandler = (key: string, value: any) => {
    if (Object.keys(this.state.event).includes(key)) {
      this.setState((prevState) => ({
        event: { ...prevState.event, [key]: value as Pick<State, keyof State> },
      }));
    }
  };

  onSubmit(event: any) {
    event.preventDefault();
    if (!this.state.preview) {
      this.setState({ preview: true });
      return;
    }
    this.setState({ isLoading: true });
    const url = "/api/v1/events/create";
    const submission = this.state.event;

    const body = {
      ...submission,
      details: this.stripHtmlEntities(submission.details),
    };

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

    if (canCreate) {
      return (
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <h1 className="font-weight-normal mb-5">Add a new event.</h1>
              <form onSubmit={this.onSubmit}>
                {!this.state.preview ? (
                  <>
                    <EventEdit
                      event={this.state.event}
                      onChangeHandler={this.onChangeHandler}
                    />
                    <this.TermsAndConditions />
                    <button type="submit" className="btn custom-button mt-3">
                      Submit
                    </button>
                  </>
                ) : (
                  <>
                    <EventPreview event={this.state.event} ownerView={false} />
                    {this.state.isLoading ? (
                      <>
                        <br />
                        <this.Spinner />
                      </>
                    ) : (
                      <button type="submit" className="btn custom-button mt-3">
                        Confirm Submission
                      </button>
                    )}
                    <button
                      type="button"
                      className="btn custom-button mt-3"
                      disabled={this.state.isLoading}
                      onClick={() => {
                        this.setState({ preview: false });
                      }}
                    >
                      Back to Editing
                    </button>
                  </>
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
