import * as React from "react";

export type TypeButtonGroupProps = {
  /** Currently selected value. */
  currentValue: string;
  /**
   * Called when one of its buttons is clicked. Takes in the value of the
   * clicked button.
   */
  onClickHandler: (value: string) => void;
};

/**
 * Encapsulates a button group for which the values are distinct and
 * single-word, and one value is selected at any point in time. The class will
 * capitalize the word for display but uses the lowercase strings for event
 * handlers.
 */
export default abstract class TypeButtonGroup extends React.Component<TypeButtonGroupProps> {
  private values: string[];

  constructor(props: TypeButtonGroupProps, values: string[]) {
    super(props);
    this.values = values;
  }

  private onClickHandler: (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
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
      key={value}
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
        {this.values.map(this.typeButton)}
      </div>
    );
  }
}
