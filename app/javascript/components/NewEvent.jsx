import React from "react";
import { Link, withRouter } from "react-router-dom";

class NewEvent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      details: "",
      instructions: "",
      user_id: this.props.user_id,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  stripHtmlEntities(str) {
    return String(str).replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = "/api/v1/events/create";
    const { name, details, instructions, user_id } = this.state;

    if (
      name.length == 0 ||
      details.length == 0 ||
      instructions.length == 0 ||
      user_id.length == 0
    )
      return;

    const body = {
      name,
      details: details.replace(/\n/g, "<br> <br>"),
      instructions: instructions.replace(/\n/g, "<br> <br>"),
      user_id,
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
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

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">Add a new event.</h1>
            <form onSubmit={this.onSubmit}>
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
              <div className="form-group">
                <label htmlFor="eventDetails">Details</label>
                <input
                  type="text"
                  name="details"
                  id="eventDetails"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
                <small id="detailsHelp" className="form-text text-muted">
                  Separate each detail with a comma.
                </small>
              </div>
              <label htmlFor="instructions">Instructions</label>
              <textarea
                className="form-control"
                id="instructions"
                name="instructions"
                rows="5"
                required
                onChange={this.onChange}
              />
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
