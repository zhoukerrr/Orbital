import React from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import $, { data } from "jquery";
//import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import App from "../components/App";
//import Routes from "../routes/Index";

document.addEventListener("DOMContentLoaded", () => {
  const data = document.getElementById("helper");
  const user_id = data.getAttribute("userid");
  render(
    <App user_id={user_id} />,
    document.body.appendChild(document.createElement("div"))
  );
});
