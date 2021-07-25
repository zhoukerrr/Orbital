import * as qs from "qs";
import * as React from "react";
import { Link } from "react-router-dom";
import { tags } from "./types";
import FilterBar from "./commons/FilterBar";
import EventCatalog from "./commons/EventCatalog";
import SearchBar from "./commons/SearchBar";

type Props = {
  history: any;
  location: any;
};

export default class Events extends React.Component<Props> {
  private queryString: string;
  private tags: string[];

  constructor(props: Props) {
    super(props);

    if (this.props.location.search !== "") {
      const params: any = qs.parse(this.props.location.search, {
        ignoreQueryPrefix: true,
      });
      this.queryString =
        this.props.location.search + "&status=approved&user=all";
      this.tags = params.tags ? params.tags : [];
    } else {
      this.queryString = "?status=approved&user=all";
      this.tags = [];
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
      delete params.page;
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
            <div
              className="navbar navbar-expand-md navbar-light"
              style={{ marginBottom: "20px" }}
            >
              <SearchBar
                onButtonClickHandler={this.searchButtonOnClickHandler}
              />
              <button
                type="button"
                className="btn btn-outline-secondary navbar-toggle d-md-none"
                data-toggle="collapse"
                data-target="#filterCollapse"
              >
                Filters
              </button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap-reverse" }}>
              <div style={{ flexGrow: 7 }}>
                {this.getSearchTarget()}
                <EventCatalog
                  queryString={this.queryString}
                  pageButtonGroupOnClickHandler={
                    this.pageButtonGroupOnClickHandler
                  }
                  tagButtonOnClickHandler={this.tagButtonOnClickHandler}
                />
              </div>
              <div
                className="sidebar-nav collapse collapse-navbar d-md-block"
                id="filterCollapse"
                style={{
                  flexGrow: 1,
                  marginLeft: "50px",
                  marginBottom: "20px",
                }}
              >
                <FilterBar
                  values={tags}
                  currentlySelected={this.tags}
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
