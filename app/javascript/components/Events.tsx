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
};

type State = {
  queryString: string;
  tags: string[];
};

export default class Events extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    if (this.props.location.search !== "") {
      const params: any = qs.parse(this.props.location.search, {
        ignoreQueryPrefix: true,
      });
      this.state = {
        queryString: this.props.location.search + "&status=approved&user=all",
        tags: Object.keys(params).includes("tags") ? params.tags : [],
      };
    } else {
      this.state = {
        queryString: "?status=approved&user=all",
        tags: [],
      };
    }
  }

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
    if (selected.length === 0) {
      this.props.history.push("/events?page=1");
    } else {
      const link =
        "/events?page=1&" + qs.stringify({ tags: selected }, { encode: false });
      this.props.history.push(link);
    }
  };

  render = () => {
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
              <div style={{ width: "80%" }}>
                <EventCatalog
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
