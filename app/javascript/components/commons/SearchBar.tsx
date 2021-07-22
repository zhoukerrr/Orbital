import * as React from "react";

type Props = {
  onButtonClickHandler: (value: string) => void;
};

type State = {
  searchString: string;
};

export default class SearchBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      searchString: "",
    };
  }

  onInputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchString: evt.currentTarget.value });
  };

  onSearchHandler = (evt: React.MouseEvent<HTMLFormElement>) => {
    evt.preventDefault();
    this.props.onButtonClickHandler(this.state.searchString);
  };

  render() {
    return (
      <form className="d-flex" onSubmit={this.onSearchHandler}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
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
