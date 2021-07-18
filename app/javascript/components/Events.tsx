import * as qs from "qs";
import * as React from "react";
import { Link } from "react-router-dom";
import { tags } from "./types";
import FilterBar from "./commons/FilterBar";
import EventCatalog from "./commons/EventCatalog";
import SearchBar from "./commons/SearchBar";

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
    if (this.props.location.search !== "") {
      const params: any = qs.parse(this.props.location.search, {
        ignoreQueryPrefix: true,
      });
      params.page = value;
      this.props.history.push(
        "/events?" + qs.stringify(params, { encode: false })
      );
    } else {
      this.props.history.push("/events?page=" + value);
    }
    // var link = "/events?page=" + value;
    // if (this.state.tags.length !== 0) {
    //   link = link.concat(
    //     "&" + qs.stringify({ tags: this.state.tags }, { encode: false })
    //   );
    // }
    // this.props.history.push(link);
  };

  tagButtonOnClickHandler = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const link =
      "/events?" +
      qs.stringify({ tags: [evt.currentTarget.value] }, { encode: false });
    this.props.history.push(link);
  };

  filterBarOnClickHandler = (selected: string[]) => {
    if (this.props.location.search !== "") {
      const params: any = qs.parse(this.props.location.search, {
        ignoreQueryPrefix: true,
      });
      if (params.tags && selected.length === 0) {
        delete params.tags;
      } else {
        params.tags = selected;
      }
      this.props.history.push(
        "/events?" + qs.stringify(params, { encode: false })
      );
    } else if (selected.length === 0) {
      this.props.history.push("/events");
    } else {
      const link =
        "/events?" + qs.stringify({ tags: selected }, { encode: false });
      this.props.history.push(link);
    }
  };

  searchButtonOnClickHandler = (value: string) => {
    this.props.history.push("/events?" + qs.stringify({ search: value }));
  };

  getSearchTarget: () => JSX.Element = () => {
    const params: any = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    return params.search ? <>Showing Results for "{params.search}"</> : null;
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
            <div className="row">
              <SearchBar
                onButtonClickHandler={this.searchButtonOnClickHandler}
              />
            </div>
            <br />
            {this.getSearchTarget()}
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
