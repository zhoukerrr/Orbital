import * as React from "react";

export default class SlideShow extends React.Component {
  private getSlide: (
    link: string,
    header: string,
    subheader: string
  ) => JSX.Element = (link, header, subheader) => {
    return (
      <div className="carousel-item active">
        <img src={link} className="d-block w-100" height="300px" />
        <div className="carousel-caption d-none d-md-block">
          <h5>{header}</h5>
          <p>{subheader}</p>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          {this.getSlide(
            "https://i.imgur.com/eVy0j10.jpg",
            "List of events",
            "Learning web development again"
          )}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    );
  }
}
