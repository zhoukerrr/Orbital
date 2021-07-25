import * as React from "react";
import { Event } from "../types";

type Props = {
  event: Event;
  /**
   * Whether the remarks component should render.
   */
  ownerView: boolean;
};

type State = {};

/** Preview of an event, where information regarding the event cannot be changed.
 * This is used prior to a submission of a new event and viewing of any event thereafter. */
export default class EventPreview extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  Venue = () => (
    <>
      <h4 className="mb-2">Venue</h4>
      <div style={{ whiteSpace: "pre-line" }}>{this.props.event.venue}</div>
      <br />
    </>
  );

  Poster = () => {
    return this.props.event.poster === "" || !this.props.event.poster ? null : (
      <>
        <img src={this.props.event.poster} title="event poster" />
        <br />
      </>
    );
  };

  Details = () => (
    <>
      <h4 className="mb-2">Details</h4>
      <div style={{ whiteSpace: "pre-line" }}>{this.props.event.details}</div>
    </>
  );

  Skills = () => (
    <>
      <h4 className="mb-2">Skills Needed</h4>
      {this.props.event.skills}
      <br />
    </>
  );

  Link = () => (
    <>
      <h4 className="mb-2">Sign Up Link</h4>
      <a
        href={"//" + this.props.event.link}
        type="button"
        className="btn btn-link"
      >
        {this.props.event.link}
      </a>
      <br />
    </>
  );

  Contact = () => (
    <>
      <h4 className="mb-2">Contact Details</h4>
      <div style={{ whiteSpace: "pre-line" }}>{this.props.event.contact}</div>
      <br />
    </>
  );

  Status = () => (
    <>
      <h4 className="mb-2">Status</h4>
      {this.props.event.status}
    </>
  );

  Remarks = () => (
    <>
      <h4 className="mb-2">Remarks</h4>
      {this.props.event.remarks == null ? (
        "NIL"
      ) : (
        <div style={{ whiteSpace: "pre-line" }}>{this.props.event.remarks}</div>
      )}
    </>
  );

  StartDate = () => (
    <>
      <h4 className="mb-2">Start Date</h4>
      {this.props.event.start_date
        ? this.props.event.start_date.toDateString()
        : null}
      <br />
    </>
  );

  EndDate = () => (
    <>
      <h4 className="mb-2">End Date</h4>
      {this.props.event.end_date
        ? this.props.event.end_date.toDateString()
        : null}
      <br />
    </>
  );

  render() {
    return (
      <>
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
            {this.props.ownerView ? <this.Status /> : null}
            <br />
            <br />
            {this.props.ownerView ? <this.Remarks /> : null}
          </ul>
        </div>
        <div className="col-sm-12 col-lg-7">
          <this.Poster />
          <this.Details />
          <br />
          <this.Skills />
          <br />
          <this.Link />
        </div>
      </>
    );
  }
}
