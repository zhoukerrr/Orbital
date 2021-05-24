import React from "react";
import { Link } from "react-router-dom";

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
    const eventInstruction = this.addHtmlEntities(event.details);

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
            <div className="col-sm-12 col-lg-3">
              <ul className="list-group">
                <h5 className="mb-2">Details</h5>
                {detailList}
              </ul>
            </div>
            <div className="col-sm-12 col-lg-7">
              <h5 className="mb-2">Instructions</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${eventInstruction}`,
                }}
              />
            </div>
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
  }
}

export default Event;
