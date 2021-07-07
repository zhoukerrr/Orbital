import * as qs from "qs";
import * as React from "react";
import { Link, Redirect } from "react-router-dom";
import EventCatalog from "./commons/EventCatalog";

type Props = {
  key: number;
  history: any;
  location: any;
  role: string;
};

type State = {
  queryString: string;
  tags: string[];
};

class Events extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      queryString: "?status=submitted&user=all",
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
        queryString: this.props.location.search + "&status=submitted&user=all",
      });
    }
  };

  pageButtonGroupOnClickHandler = (value: number) => {
    var link = "/all_submitted?page=" + value;
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
      "/all_submitted?page=1&" +
      qs.stringify({ tags: [evt.currentTarget.value] }, { encode: false });
    this.props.history.push(link);
  };

  render = () => {
    if (this.props.role == "admin") {
      return (
        <>
          <section className="jumbotron jumbotron-fluid text-center">
            <div className="container py-5">
              <h1 className="display-4">List of Submitted events</h1>
              <p className="lead text-muted">Learning web development again</p>
            </div>
          </section>
          <div className="py-5">
            <main className="container">
              <EventCatalog
                key={Math.random()}
                queryString={this.state.queryString}
                pageButtonGroupOnClickHandler={
                  this.pageButtonGroupOnClickHandler
                }
                tagButtonOnClickHandler={this.tagButtonOnClickHandler}
              />
              <Link to="/" className="btn btn-link">
                Home
              </Link>
            </main>
          </div>
        </>
      );
    } else {
      return <Redirect push to="/events" />;
    }
  };
}

export default Events;
