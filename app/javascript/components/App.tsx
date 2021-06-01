import * as React from "react";
import Routes from "../routes/Index";

export default (props: { user_id: number }) => (
  <Routes user_id={props.user_id} />
);
