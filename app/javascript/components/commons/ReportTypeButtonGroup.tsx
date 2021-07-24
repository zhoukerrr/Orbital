import * as React from "react";
import { ReportStatus } from "../types";
import TypeButtonGroup from "./TypeButtonGroup";

type Props = {
  currentType: typeof ReportStatus[number];
  /**
   * The component uses this to handle click events, by applying it on the value
   * of the button clicked. Possible values include `submitted`, `approved` and `rejected`.
   */
  onClickHandler: (type: typeof ReportStatus[number]) => void;
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
        values={ReportStatus}
        currentValue={this.props.currentType}
        onClickHandler={this.props.onClickHandler}
      />
    );
  }
}
