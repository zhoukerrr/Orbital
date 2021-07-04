import * as React from "react";
import { Event, tags } from "../types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.min.css";
import "react-datepicker/src/stylesheets/datepicker.scss";

type Props = {
  event: Event;
  onChangeHandler: (attribute: string, newValue: any) => void;
};

type State = {};

export default class EventEdit extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
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
          selected={this.props.event.start_date}
          onChange={(newDate) => {
            this.props.onChangeHandler("startDate", newDate as Date);
            if (this.props.event.end_date <= (newDate as Date)) {
              this.props.onChangeHandler("endDate", newDate as Date);
            }
          }}
          minDate={new Date()}
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
          selected={this.props.event.end_date}
          onChange={(newDate) =>
            this.props.onChangeHandler("endDate", newDate as Date)
          }
          minDate={this.props.event.start_date}
        />
      </div>
    );
  };

  Poster = () => {
    return (
      <div className="form-group">
        <label htmlFor="posterLink">(Optional) Poster Link</label>
        <input
          type="text"
          name="poster"
          id="poster"
          className="form-control"
          onChange={this.onInputChange}
        />
      </div>
    );
  };

  onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const key: string = event.target.id;
    const value: any = event.target.value;
    this.props.onChangeHandler(key, value);
  };

  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key: string = event.target.id;
    const value: any = event.target.value;
    this.props.onChangeHandler(key, value);
  };

  onSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const key: string = event.target.id;
    const value: any = event.target.value;
    this.props.onChangeHandler(key, value);
  };

  render() {
    return (
      <>
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
        <this.Poster />
        <this.Contact />
      </>
    );
  }
}
