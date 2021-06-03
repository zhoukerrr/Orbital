import * as React from "react";
import Routes from "../routes/Index";

export default (props: { user_id: number; admin: boolean; name: string }) => (
  <Routes user_id={props.user_id} admin={props.admin} name={props.name} />
);
