import * as React from "react";
import { Link, Redirect } from "react-router-dom";

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
    skills: string;
    link: string;
    contact: string;
    status: string;
  };
};

class Event extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      event: {
        name: "",
        details: "",
        user_id: undefined, // Not very sure if this affects anything
        venue: "",
        skills: "",
        link: "",
        contact: "",
        status: "",
      },
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
      .then((response) => this.setState({ event: response }))
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
    if (window.confirm("Are you sure you want to APPROVE this entry?")) {
      const {
        match: {
          params: { id },
        },
      } = this.props;
      const url = `/api/v1/approve/${id}`;
      const token = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

      fetch(url, {
        method: "PATCH",
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
  };

  rejectEvent = () => {
    if (window.confirm("Are you sure you want to REJECT this entry?")) {
      const {
        match: {
          params: { id },
        },
      } = this.props;
      const url = `/api/v1/reject/${id}`;
      const token = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

      fetch(url, {
        method: "PATCH",
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
  };

  Venue = () => (
    <>
      <h5 className="mb-2">Venue</h5>
      {this.state.event.venue}
      <br />
    </>
  );

  Details = () => (
    <>
      <h5 className="mb-2">Details</h5>
      <div
        dangerouslySetInnerHTML={{
          __html: `${this.state.event.details}`,
        }}
      />
      <br />
    </>
  );

  Skills = () => (
    <>
      <h5 className="mb-2">Skills Needed</h5>
      {this.state.event.skills}
      <br />
    </>
  );

  Link = () => (
    <>
      <h5 className="mb-2">Sign Up Link</h5>
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
      <h5 className="mb-2">Contact Details</h5>
      {this.state.event.contact}
      <br />
    </>
  );

  Status = () => (
    <>
      <h5 className="mb-2">Status</h5>
      {this.state.event.status}
    </>
  );

  Delete = () => (
    <>
      <button
        type="button"
        className="btn btn-danger"
        onClick={this.deleteEvent}
      >
        Delete Event
      </button>
      <br />
      <br />
    </>
  );

  Decision = () => (
    <>
      <button
        type="button"
        className="btn btn-success"
        onClick={this.approveEvent}
      >
        Approve
      </button>
      <br />
      <br />
      <button
        type="button"
        className="btn btn-warning"
        onClick={this.rejectEvent}
      >
        Reject
      </button>
    </>
  );

  render() {
    const { event } = this.state;

    const can_delete =
      this.props.role == "admin" || this.props.user_id == event.user_id;

    const can_decide = this.props.role == "admin";
    if (can_decide || can_delete || this.state.event.status == "Approved") {
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
                  <this.Venue />
                  <br />
                  <this.Contact />
                  <br />
                  {can_delete ? <this.Status /> : null}
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
                <Link to="/events" className="btn btn-primary">
                  Back to Events
                </Link>
                <br />
                <br />
                {can_delete ? <this.Delete /> : null}
                {can_decide ? <this.Decision /> : null}
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
