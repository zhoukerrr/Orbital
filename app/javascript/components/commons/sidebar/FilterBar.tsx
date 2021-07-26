import * as React from "react";

type Props = {
  values: string[];
  currentlySelected: string[];
  onSelectHandler: (selectedValues: string[]) => void;
};
type State = {};
export default class FilterBar extends React.Component<Props, State> {
  getInputs: (values: string[], selected: string[]) => JSX.Element[] = (
    values,
    selected
  ) => {
    return values.map((value) => (
      <div className="form-check" key={value}>
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

  onReset: (event: React.MouseEvent<HTMLButtonElement>) => void = () => {
    this.props.onSelectHandler([]);
  };

  render() {
    return (
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          Filters
          <button
            className="btn btn-link p-0"
            type="button"
            onClick={this.onReset}
            hidden={this.props.currentlySelected.length === 0}
          >
            Clear
          </button>
        </div>
        <div className="card-body">
          {this.getInputs(this.props.values, this.props.currentlySelected)}
        </div>
      </div>
    );
  }
}
