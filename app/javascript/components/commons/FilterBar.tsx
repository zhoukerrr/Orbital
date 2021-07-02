import * as React from "react";

type Props = {
  values: string[];
  currentlySelected: string[];
  onSelectHandler: (selectedValues: string[]) => void;
};
type State = {};
export default class FilterBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  getInputs: (values: string[], selected: string[]) => JSX.Element[] = (
    values,
    selected
  ) => {
    return values.map((value) => (
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value={value}
          checked={selected.includes(value)}
          onChange={this.onChangeHandler}
        />
        <label className="form-check-label" htmlFor="flexCheckChecked">
          {value}
        </label>
      </div>
    ));
  };

  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    event
  ) => {
    const prevSelected: string[] = this.props.currentlySelected.slice();
    prevSelected.push(event.currentTarget.value);
    this.props.onSelectHandler(
      prevSelected.filter(
        (value) =>
          value !== event.currentTarget.value || event.currentTarget.checked
      )
    );
  };

  render() {
    return (
      <>{this.getInputs(this.props.values, this.props.currentlySelected)}</>
    );
  }
}
