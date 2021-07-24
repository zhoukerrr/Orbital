import * as React from "react";
import { eventStatus } from "../types";
import TypeButtonGroup from "./TypeButtonGroup";

type Props = {
  currentType: typeof eventStatus[number];
  /**
   * The component uses this to handle click events, by applying it on the value
   * of the button clicked. Possible values include `submitted`, `approved` and `rejected`.
   */
  onClickHandler: (type: typeof eventStatus[number]) => void;
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

  render() {
    const values = ["submitted", "approved", "rejected"];
    return (
      <TypeButtonGroup
        values={values}
        currentValue={this.props.currentType}
        onClickHandler={this.props.onClickHandler}
      />
    );
  }
}
