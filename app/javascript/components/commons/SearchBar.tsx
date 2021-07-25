import * as React from "react";

type Props = {
  /**
   * Called when the search button is clicked. Takes in the search input value
   * as an argument.
   */
  onButtonClickHandler: (value: string) => void;
  /**
   * Hint that is shown when there are no existing input.
   */
  placeholder?: string;
};

type State = {};

/**
 * Encapsulates a search bar for which an input is required.
 */
export default class SearchBar extends React.Component<Props, State> {
  private searchString: string;

  private onInputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.searchString = evt.currentTarget.value;
  };

  private onSearchHandler = (evt: React.MouseEvent<HTMLFormElement>) => {
    evt.preventDefault();
    this.props.onButtonClickHandler(this.searchString);
  };

  render() {
    return (
      <form className="d-flex" onSubmit={this.onSearchHandler}>
        <input
          className="form-control me-2"
          type="search"
          placeholder={this.props.placeholder || "Search"}
          onChange={this.onInputChangeHandler}
          required
        />
        <button className="btn btn-outline-secondary" type="submit">
          Search
        </button>
      </form>
    );
  }
}
