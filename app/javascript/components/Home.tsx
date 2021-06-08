import * as React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">Test</h1>
        <p className="lead">A table for testing.</p>
        <hr className="my-4" />
        <Link to="/events/1" className="btn btn-lg custom-button" role="button">
          Let's get started!
        </Link>
      </div>
    </div>
  </div>
);
