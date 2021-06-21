import * as React from "react";

type Props = {
  currentType: "approved" | "rejected" | "submitted";
  onClickHandler: (type: string) => void;
};

type State = {};

export default class EventTypeButtonGroup extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
  }

  onClickHandler: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void = (evt) => {
    this.props.onClickHandler(evt.currentTarget.value);
  };

  typeButton: (value: string) => JSX.Element = (value) => (
    <button
      type="button"
      className={
        value === this.props.currentType.toLowerCase()
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
