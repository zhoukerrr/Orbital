import * as React from "react";
import { Link } from "react-router-dom";

type Props = {
  numberOfEvents: number;
  currentPage: number;
  numberOfEventsPerPage: number;
  history: any;
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
      this.props.numberOfEvents / this.props.numberOfEventsPerPage
    );
    const firstButton: number = Math.max(
      this.props.currentPage - Math.floor(this.noOfButtonsRendered / 2),
      1
    );
    const lastButton: number = Math.min(
      this.props.currentPage + Math.floor(this.noOfButtonsRendered / 2),
      noOfPages
    );

    const pages: number[] = [];
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

  UNSAFE_componentWillReceiveProps = (nextProps: Props) => {
    const noOfPages = Math.ceil(
      nextProps.numberOfEvents / nextProps.numberOfEventsPerPage
    );
    const firstButton: number = Math.max(
      nextProps.currentPage - Math.floor(this.noOfButtonsRendered / 2),
      1
    );
    const lastButton: number = Math.min(
      nextProps.currentPage + Math.floor(this.noOfButtonsRendered / 2),
      noOfPages
    );

    const pages: number[] = [];
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
    this.props.history.push(`/events/${page}`);
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
