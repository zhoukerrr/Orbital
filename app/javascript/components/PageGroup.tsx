import * as React from "react";

type Props = {
  numberOfEvents: number;
  currentPage: number;
};

type State = {
  firstButton: number;
  lastButton: number;
  needLeftEllipsis: boolean;
  needRightEllipsis: boolean;
  pages: number[];
  noOfPages: number;
};

export default class PageGroup extends React.Component<Props, State> {
  private noOfEventsPerPage: number = 3;
  // Make this an odd number for now until I get the logic straight
  private noOfButtonsRendered: number = 5;

  constructor(props: Props) {
    super(props);

    this.state = {
      pages: [],
      firstButton: 0,
      lastButton: 0,
      needLeftEllipsis: false,
      needRightEllipsis: false,
      noOfPages: 0,
    };
  }

  componentDidMount = () => {
    const noOfPages = Math.ceil(
      this.props.numberOfEvents / this.noOfEventsPerPage
    );
    const firstButton: number = Math.max(
      this.props.currentPage - Math.floor(this.noOfButtonsRendered / 2),
      1
    );
    const lastButton: number = Math.min(
      this.props.currentPage + Math.floor(this.noOfButtonsRendered / 2),
      noOfPages
    );

    const pages: number[] = this.state.pages;
    for (let i = firstButton; i <= lastButton; i++) {
      pages.push(i);
    }
    this.setState({
      pages: pages,
      firstButton: firstButton,
      lastButton: lastButton,
      needLeftEllipsis: firstButton > 1,
      needRightEllipsis: lastButton < noOfPages,
      noOfPages: noOfPages,
    });
  };

  onClickHandler: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void = (evt) => {
    const page: number = parseInt(evt.currentTarget.value);
  };

  render() {
    const { needLeftEllipsis, needRightEllipsis, pages, noOfPages } =
      this.state;
    const pagesButtons: JSX.Element[] = pages.map((pageNumber: number) => (
      <button
        type="button"
        className="btn btn-secondary"
        value={pageNumber}
        onClick={this.onClickHandler}
      >
        {pageNumber}
      </button>
    ));

    return (
      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          className="btn btn-secondary"
          value={1}
          onClick={this.onClickHandler}
        >
          {"<<"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          value={Math.max(this.props.currentPage - 1, 1)}
          onClick={this.onClickHandler}
        >
          {"<"}
        </button>
        {needLeftEllipsis ? (
          <button type="button" className="btn btn-secondary">
            {"..."}
          </button>
        ) : null}
        {pagesButtons}
        {needRightEllipsis ? (
          <button type="button" className="btn btn-secondary">
            {"..."}
          </button>
        ) : null}
        <button
          type="button"
          className="btn btn-secondary"
          value={Math.min(this.props.currentPage + 1, noOfPages)}
          onClick={this.onClickHandler}
        >
          {">"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          value={noOfPages}
          onClick={this.onClickHandler}
        >
          {">>"}
        </button>
      </div>
    );
  }
}
