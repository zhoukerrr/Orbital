import { createBrowserHistory } from "history";
import * as React from "react";

type Props = {
  noOfPages: number;
  currentPage: number;
  onClickHandler: (page: number) => void;
};

type State = {};

export default class PageGroup extends React.Component<Props, State> {
  // Make this an odd number for now until I get the logic straight
  private noOfButtonsRendered: number = 5;

  constructor(props: Props) {
    super(props);
  }

  onClickHandler: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void = (evt) => {
    const page: number = parseInt(evt.currentTarget.value);
    this.props.onClickHandler(page);
  };

  pageButton = (value: number) => (
    <button
      type="button"
      className={
        value == this.props.currentPage
          ? "btn btn-secondary"
          : "btn btn-outline-secondary"
      }
      value={value}
      onClick={this.onClickHandler}
    >
      {value}
    </button>
  );

  render() {
    const firstButton = Math.max(
      this.props.currentPage - Math.floor(this.noOfButtonsRendered / 2),
      1
    );
    const lastButton = Math.min(
      this.props.currentPage + Math.floor(this.noOfButtonsRendered / 2),
      this.props.noOfPages
    );
    const pages = [];
    for (let i = firstButton; i <= lastButton; i++) {
      pages.push(i);
    }
    const pagesButtons: JSX.Element[] = pages.map((pageNumber: number) =>
      this.pageButton(pageNumber)
    );
    const needLeftEllipsis = firstButton > 1;
    const needRightEllipsis = lastButton < this.props.noOfPages;

    return (
      <div className="btn-group" role="group">
        <button
          type="button"
          className="btn btn-outline-secondary"
          value={1}
          onClick={this.onClickHandler}
        >
          {"<<"}
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          value={Math.max(this.props.currentPage - 1, 1)}
          onClick={this.onClickHandler}
        >
          {"<"}
        </button>
        {needLeftEllipsis ? (
          <button type="button" className="btn btn-outline-secondary" disabled>
            {"..."}
          </button>
        ) : null}
        {pagesButtons}
        {needRightEllipsis ? (
          <button type="button" className="btn btn-outline-secondary" disabled>
            {"..."}
          </button>
        ) : null}
        <button
          type="button"
          className="btn btn-outline-secondary"
          value={Math.min(this.props.currentPage + 1, this.props.noOfPages)}
          onClick={this.onClickHandler}
        >
          {">"}
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          value={this.props.noOfPages}
          onClick={this.onClickHandler}
        >
          {">>"}
        </button>
      </div>
    );
  }
}
