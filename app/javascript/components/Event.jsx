import React from "react";
import { Link, Redirect } from "react-router-dom";

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = { event: { details: "" } };

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
      .then((response) => this.setState({ event: response }))
      .then(() => this.setState((prevState) => ({ event: {...prevState.event,
        details: this.addHtmlEntities(prevState.event.details)
      }})))
      .catch(() => this.props.history.push("/events"));

  }

  addHtmlEntities(str) {
    return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  }

  deleteEvent() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const url = `/api/v1/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

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

  Venue = () => (
    <div className="col-sm-12 col-lg-3">
      <ul className="list-group">
        <h5 className="mb-2">Venue</h5>
        {this.state.event.venue}
      </ul>
    </div>
  );

  Details = () => (
    <div className="col-sm-12 col-lg-3">
      <ul className="list-group">
        <h5 className="mb-2">Details</h5>
          <div
            dangerouslySetInnerHTML={{
              __html: `${this.state.event.details}`,
            }}
          />
      </ul>
    </div>
  );

  Skills = () => (
    <div className="col-sm-12 col-lg-3">
      <ul className="list-group">
        <h5 className="mb-2">Skills Needed</h5>
        {this.state.event.skills}
      </ul>
    </div>
  );

  Link = () => (
    <div className="col-sm-12 col-lg-3">
      <ul className="list-group">
        <h5 className="mb-2">Sign Up Link</h5>
        {this.state.event.link}
      </ul>
    </div>
  );

  Contact = () => (
    <div className="col-sm-12 col-lg-3">
      <ul className="list-group">
        <h5 className="mb-2">Contact Details</h5>
        {this.state.event.contact}
      </ul>
    </div>
  );

  render() {
    const { event } = this.state;
    let detailList = "No details available";

    if (event.details.length > 0) {
      detailList = event.details.split(",").map((detail, index) => (
        <li key={index} className="list-group-item">
          {detail}
        </li>
      ));
    }
    const id_match =
      this.props.user_id == 1 || this.props.user_id == event.user_id;

    if (id_match) {
      return (
        <div className="">
          <div className="hero position-relative d-flex align-items-center justify-content-center">
            <img
              src={event.image}
              alt={`${event.name} image`}
              className="img-fluid position-absolute"
            />
            <div className="overlay bg-dark position-absolute" />
            <h1 className="display-4 position-relative text-white">
              {event.name}
            </h1>
          </div>
          <div className="container py-5">
            <div className="row">
              <this.Details/>
              <this.Venue/>
              <this.Skills/>
              <this.Link/>
              <this.Contact/>
              <div className="col-sm-12 col-lg-2">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.deleteEvent}
                >
                  Delete Event
                </button>
              </div>
            </div>
            <Link to="/events" className="btn btn-link">
              Back to Events
            </Link>
          </div>
        </div>
      );
    } else if (event.user_id != undefined) {
      return (
        <Redirect push to="/events" />
      );
    } else {
      return null;
    }
  }
}

export default Event;
