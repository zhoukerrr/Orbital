import * as React from "react";
import { reportStatus } from "../types";
import TypeButtonGroup from "./TypeButtonGroup";

type Props = {
  currentType: typeof reportStatus[number];
  /**
   * The component uses this to handle click events, by applying it on the value
   * of the button clicked. Possible values include `submitted`, `approved` and `rejected`.
   */
  onClickHandler: (type: typeof reportStatus[number]) => void;
};

type State = {};

export default class ReportTypeButtonGroup extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <TypeButtonGroup
        values={reportStatus.concat()}
        currentValue={this.props.currentType}
        onClickHandler={this.props.onClickHandler}
      />
    );
  }
}
