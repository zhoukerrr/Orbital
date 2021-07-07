import * as qs from "qs";
import * as React from "react";
import { Link } from "react-router-dom";
import { tags } from "./types";
import FilterBar from "./commons/FilterBar";
import EventCatalog from "./commons/EventCatalog";

type Props = {
  key: number;
  history: any;
  location: any;
  user_id: number;
  role: string;
};

type State = {
  queryString: string;
  tags: string[];
};

class Events extends React.Component<Props, State> {
  private noOfEventsPerPage: number = 5;

  constructor(props: Props) {
    super(props);
    this.state = {
      queryString: "?status=approved&user=all",
      tags: [],
    };
  }

  componentDidMount = () => {
    if (this.props.location.search !== "") {
      const params: any = qs.parse(this.props.location.search, {
        ignoreQueryPrefix: true,
      });
      if (Object.keys(params).includes("tags")) {
        this.setState({ tags: params.tags });
      }
      this.setState({
        queryString: this.props.location.search + "&status=approved&user=all",
      });
    }
  };

  CreateButton = () => (
    <Link to="/event" className="btn custom-button">
      Create New Event
    </Link>
  );

  pageButtonGroupOnClickHandler = (value: number) => {
    var link = "/events?page=" + value;
    if (this.state.tags.length !== 0) {
      link = link.concat(
        "&" + qs.stringify({ tags: this.state.tags }, { encode: false })
      );
    }
    this.props.history.push(link);
  };

  tagButtonOnClickHandler = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const link =
      "/events?page=1&" +
      qs.stringify({ tags: [evt.currentTarget.value] }, { encode: false });
    this.props.history.push(link);
  };

  filterBarOnClickHandler = (selected: string[]) => {
    const link =
      "/events?page=1&" + qs.stringify({ tags: selected }, { encode: false });
    this.props.history.push(link);
  };

  render = () => {
    const canCreate =
      this.props.role == "admin" || this.props.role == "organiser";

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">List of events</h1>
            <p className="lead text-muted">Learning web development again</p>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="row" style={{ flexWrap: "nowrap" }}>
              <div className="column" style={{ width: "80%" }}>
                {canCreate ? <this.CreateButton /> : null}
                <EventCatalog
                  key={Math.random()}
                  queryString={this.state.queryString}
                  pageButtonGroupOnClickHandler={
                    this.pageButtonGroupOnClickHandler
                  }
                  tagButtonOnClickHandler={this.tagButtonOnClickHandler}
                />
              </div>
              <div className="column">
                <FilterBar
                  values={tags}
                  currentlySelected={this.state.tags}
                  onSelectHandler={this.filterBarOnClickHandler}
                />
              </div>
            </div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>
      </>
    );
  };
}

export default Events;
