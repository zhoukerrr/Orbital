import * as React from "react";
import { Link, Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.min.css";
import "react-datepicker/src/stylesheets/datepicker.scss";
import { tags } from "./types";

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
  user_id: number;
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
      user_id: this.props.user_id,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onSelectionChange = this.onSelectionChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  stripHtmlEntities(str: string): string {
    return String(str).replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  onTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const key: string = event.target.id;
    const value: any = event.target.value;
    if (Object.keys(this.state).includes(key)) {
      this.setState({
        [key]: value,
      } as Pick<State, keyof State>);
    }
  }

  onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const key: string = event.target.id;
    const value: any = event.target.value;
    if (Object.keys(this.state).includes(key)) {
      this.setState({
        [key]: value,
      } as Pick<State, keyof State>);
    }
  }

  onSelectionChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const key: string = event.target.id;
    const value: any = event.target.value;
    if (Object.keys(this.state).includes(key)) {
      this.setState({
        [key]: value,
      } as Pick<State, keyof State>);
    }
  }

  onSubmit(event: any) {
    event.preventDefault();
    const url = "/api/v1/events/create";
    const {
      name,
      tag,
      summary,
      venue,
      startDate,
      endDate,
      details,
      skills,
      link,
      contact,
      user_id,
    } = this.state;

    const body = {
      name,
      tag,
      summary,
      venue,
      start_date: startDate,
      end_date: endDate,
      details: this.stripHtmlEntities(details),
      skills,
      link,
      contact,
      user_id,
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

  EventName = () => (
    <div className="form-group">
      <label htmlFor="eventName">Event name</label>
      <input
        type="text"
        name="name"
        id="name"
        className="form-control"
        required
        onChange={this.onInputChange}
      />
    </div>
  );

  Summary = () => (
    <>
      <label htmlFor="summary">Short-Summary</label>
      <input
        className="form-control"
        id="summary"
        name="summary"
        required
        onChange={this.onInputChange}
      />
    </>
  );

  Venue = () => (
    <>
      <label htmlFor="venue">Venue</label>
      <textarea
        className="form-control"
        id="venue"
        name="venue"
        rows={4}
        required
        onChange={this.onTextChange}
      />
    </>
  );

  Details = () => (
    <>
      <label htmlFor="contact">Details</label>
      <textarea
        className="form-control"
        id="details"
        name="details"
        rows={5}
        required
        onChange={this.onTextChange}
      />
    </>
  );

  Skills = () => (
    <div className="form-group">
      <label htmlFor="eventDetails">Skills Needed</label>
      <input
        type="text"
        name="skills"
        id="skills"
        className="form-control"
        required
        onChange={this.onInputChange}
      />
    </div>
  );

  Link = () => (
    <div className="form-group">
      <label htmlFor="eventDetails">Sign Up Link</label>
      <input
        type="text"
        name="link"
        id="link"
        className="form-control"
        required
        onChange={this.onInputChange}
      />
    </div>
  );

  Contact = () => (
    <>
      <label htmlFor="contact">
        Contact Information (name, phone number, mobile number, email)
      </label>
      <textarea
        className="form-control"
        id="contact"
        name="contact"
        rows={3}
        required
        onChange={this.onTextChange}
      />
    </>
  );

  Tag = () => {
    const options: JSX.Element[] = tags.map((tag) => <option>{tag}</option>);
    return (
      <>
        <select
          className="form-control"
          id="tag"
          defaultValue=""
          onChange={this.onSelectionChange}
          required
        >
          <option value="">--Select a Tag--</option>
          {options}
        </select>
      </>
    );
  };

  StartDate = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label htmlFor="start-date">Start Date</label>
        <DatePicker
          selected={this.state.startDate}
          onChange={(newDate) =>
            this.setState((prevState) => ({
              endDate:
                prevState.endDate > (newDate as Date)
                  ? prevState.endDate
                  : (newDate as Date),
              startDate: newDate as Date,
            }))
          }
          minDate={this.newDate}
        />
      </div>
    );
  };

  EndDate = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label htmlFor="end-date">End Date</label>
        <DatePicker
          selected={this.state.endDate}
          onChange={(newDate) => this.setState({ endDate: newDate as Date })}
          minDate={this.state.startDate}
        />
      </div>
    );
  };

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
                <this.EventName />
                <br />
                <this.Tag />
                <this.Summary />
                <this.Venue />
                <this.StartDate />
                <this.EndDate />
                <this.Details />
                <this.Skills />
                <this.Link />
                <this.Contact />
                <this.TermsAndConditions />
                <button type="submit" className="btn custom-button mt-3">
                  Create Event
                </button>
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
