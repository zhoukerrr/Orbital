import * as React from "react";

export default class Sponsors extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          Supporters
        </div>
        <div className="card-body">
          <a href="https://www.gic.com.sg/">
            <img src="https://i.imgur.com/COwLs2N.png" width="200px" />
          </a>
        </div>
      </div>
    );
  }
}
