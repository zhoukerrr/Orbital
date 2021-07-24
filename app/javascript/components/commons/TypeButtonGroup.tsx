import * as React from "react";

type Props = {
  values: string[];
  currentValue: string;
  onClickHandler: (type: string) => void;
};

type State = {};

export default class TypeButtonGroup extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  private onClickHandler: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void = (evt) => {
    this.props.onClickHandler(evt.currentTarget.value);
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
        value === this.props.currentValue
          ? "btn btn-secondary"
          : "btn btn-outline-secondary"
      }
      style={{
        boxShadow: "none",
      }}
      value={value}
      onClick={this.onClickHandler}
    >
      {value[0].toUpperCase() + value.substring(1)}
    </button>
  );

  render() {
    return (
      <div className="btn-group" role="group">
        {this.props.values.map(this.typeButton)}
      </div>
    );
  }
}
