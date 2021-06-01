import * as React from "react";
import { Link, withRouter } from "react-router-dom";

type Props = {
  history: any;
  user_id: number;
};

type State = {
  name: string;
  summary: string;
  venue: string;
  details: string;
  skills: string;
  link: string;
  contact: string;
  user_id: number;
};

class NewEvent extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      name: "",
      summary: "",
      venue: "",
      details: "",
      skills: "",
      link: "",
      contact: "",
      user_id: this.props.user_id,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  stripHtmlEntities(str: string): string {
    return String(str).replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  onChange(event: React.ChangeEvent) {
    const key: string = event.target.nodeName;
    const value: any = event.target.nodeValue;
    if (Object.keys(this.state).includes(key)) {
      this.setState({
        [key]: value,
      } as Pick<State, keyof State>);
    }
  }

  onSubmit(event: any) {
    event.preventDefault();
    const url = "/api/v1/events/create";
    const { name, summary, venue, details, skills, link, contact, user_id } =
      this.state;

    const body = {
      name,
      summary,
      venue,
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
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => this.props.history.push(`/event/${response.id}`))
      .catch((error) => console.log(error.message));
  }

  EventName = () => (
    <div className="form-group">
      <label htmlFor="eventName">Event name</label>
      <input
        type="text"
        name="name"
        id="eventName"
        className="form-control"
        required
        onChange={this.onChange}
      />
    </div>
  );

  Summary = () => (
    <React.Fragment>
      <label htmlFor="summary">Short-Summary</label>
      <textarea
        className="form-control"
        id="summary"
        name="summary"
        rows={5}
        required
        onChange={this.onChange}
      />
    </React.Fragment>
  );

  Venue = () => (
    <div className="form-group">
      <label htmlFor="eventDetails">Venue</label>
      <input
        type="text"
        name="venue"
        id="venue"
        className="form-control"
        required
        onChange={this.onChange}
      />
    </div>
  );

  Details = () => (
    <React.Fragment>
      <label htmlFor="contact">Details</label>
      <textarea
        className="form-control"
        id="details"
        name="details"
        rows={5}
        required
        onChange={this.onChange}
      />
    </React.Fragment>
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
        onChange={this.onChange}
      />
      <small id="detailsHelp" className="form-text text-muted">
        Separate each detail with a comma.
      </small>
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
        onChange={this.onChange}
      />
    </div>
  );

  Contact = () => (
    <React.Fragment>
      <label htmlFor="contact">
        Contact Information (name of contact, telephone number, mobile, number,
        email)
      </label>
      <textarea
        className="form-control"
        id="contact"
        name="contact"
        rows={5}
        required
        onChange={this.onChange}
      />
    </React.Fragment>
  );

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">Add a new event.</h1>
            <form onSubmit={this.onSubmit}>
              <this.EventName />
              <this.Summary />
              <this.Venue />
              <this.Details />
              <this.Skills />
              <this.Link />
              <this.Contact />
              <button type="submit" className="btn custom-button mt-3">
                Create Event
              </button>
              <Link to="/events" className="btn btn-link mt-3">
                Back to events
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewEvent;
