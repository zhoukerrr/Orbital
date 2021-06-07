import * as React from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import App from "../components/App";
import * as _ from "lodash";

document.addEventListener("DOMContentLoaded", () => {
  const data = document.getElementById("helper");
  const user_id: number = parseInt(data.getAttribute("userid"));
  const role: string = data.getAttribute("role");

  render(
    <App user_id={user_id} role={role} />,
    document.body.appendChild(document.createElement("div"))
  );
});
