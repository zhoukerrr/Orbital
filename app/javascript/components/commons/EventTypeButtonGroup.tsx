import * as React from "react";
import { EventType } from "../types";

type Props = {
  currentType: EventType;
  /**
   * The component uses this to handle click events, by applying it on the value
   * of the button clicked. Possible values include `submitted`, `approved` and `rejected`.
   */
  onClickHandler: (type: EventType) => void;
};

type State = {};

/**
 * A button group consisting of 3 buttons - `Submitted`, `Approved` and `Rejected`,
 * each with its corresponding value in lowercase.
 */
export default class EventTypeButtonGroup extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
  }

  private onClickHandler: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void = (evt) => {
    this.props.onClickHandler(evt.currentTarget.value as EventType);
  };

  /**
   * A single button component in the button group.
   *
   * @param value text shown on the button in lowercase
   * @returns resulting button component
   */
  private typeButton: (value: string) => JSX.Element = (value) => (
    <button
      type="button"
      className={
        value.toLowerCase() === this.props.currentType
          ? "btn btn-secondary"
          : "btn btn-outline-secondary"
      }
      style={{
        boxShadow: "none",
      }}
      value={value.toLowerCase()}
      onClick={this.onClickHandler}
    >
      {value}
    </button>
  );

  render() {
    return (
      <div className="btn-group" role="group">
        {this.typeButton("Approved")}
        {this.typeButton("Rejected")}
        {this.typeButton("Submitted")}
      </div>
    );
  }
}
