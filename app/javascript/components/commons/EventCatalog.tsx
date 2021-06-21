import * as React from "react";
import { EventType, UserType } from "../types";

type Props = {
  eventType: EventType;
  /**
   * A value of -1 represents fetching events from all users.
   */
  user_id: number;
};

type State = {};

export default class EventCatalog extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  //   componentDidMount = () => {
  //     const url = "/api/v1/events?status=submitted";
  //     fetch(url)
  //       .then((response) => {
  //         if (response.ok) {
  //           return response.json();
  //         }
  //         throw new Error("Network response was not ok.");
  //       })
  //       .then((response) => {
  //         const begin = 0;
  //         const end = Math.min(
  //           begin + this.noOfEventsPerPage,
  //           response.event.length
  //         );

  //         this.setState({
  //           events: response.event.slice(begin, end),
  //           usernames: response.usernames,
  //           noOfPages: Math.ceil(response.event.length / this.noOfEventsPerPage),
  //         });
  //         console.log(response);
  //       })
  //       .then(() => this.setState({ done: true }))
  //       .catch(() => this.props.history.push("/"));
  //   }

  //   render = () => {return ();};
}
