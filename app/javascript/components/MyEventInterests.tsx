import * as React from "react";
import { Redirect } from "react-router-dom";
import Index from "../routes/Index";
import CsvDownloader from "react-csv-downloader";

type Props = {
  match: {
    params: any;
  };
  history: any;
  user_id: number;
  role: string;
};

type State = {
  students: {
    student: any;
    attendance: boolean;
    interest_id: number;
  }[];
  user_id: number;
  isLoading: boolean;
};

export default class MyEventInterests extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      students: [],
      user_id: 0,
      isLoading: true,
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const url = `/api/v1/interested_in/${id}`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        this.setState({
          students: response.students,
          user_id: response.user,
          isLoading: false,
        });
        console.log(response);
      })
      .catch(() => this.props.history.push("/event/" + id));
  }

  markAttend = (interest_id: number, position: number) => {
    const url = `/api/v1/attend/${interest_id}`;
    const token = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content");

    fetch(url, {
      method: "PATCH",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => {
        const temp = this.state.students;
        temp[position].attendance
          ? (temp[position].attendance = false)
          : (temp[position].attendance = true);
        this.setState({ students: temp });
      })
      .catch(() =>
        this.props.history.push("/event/" + this.props.match.params.id)
      );
  };

  render() {
    const { students } = this.state;

    const allstudents = students.map((student, index) => (
      <tr>
        <td>{index + 1}</td>
        <td>{student.student.name}</td>
        <td>{student.student.email}</td>
        <td>
          {student.attendance ? (
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id={Index.toString()}
              onClick={() => this.markAttend(student.interest_id, index)}
              defaultChecked
            ></input>
          ) : (
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              onClick={() => this.markAttend(student.interest_id, index)}
              id={Index.toString()}
            ></input>
          )}
        </td>
      </tr>
    ));

    const noStudents = (
      <tr>
        <td>No Students yet.</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
      </tr>
    );

    const data = students.map((x) => ({
      name: x.student.name,
      email: x.student.email,
      attendace: x.attendance.toString(),
    }));

    if (
      this.props.role == "admin" ||
      this.props.user_id == this.state.user_id
    ) {
      return (
        <>
          <section className="jumbotron jumbotron-fluid text-center">
            <div className="container py-5">
              <h1 className="display-4">List of students</h1>
              <p className="lead text-muted">
                {allstudents.length} students have signed up so far!
              </p>
            </div>
          </section>
          <div className="py-5">
            <main className="container">
              <CsvDownloader
                filename="Students"
                datas={data}
                text="Download the data"
              />
              <br />
              <br />
              <div className="row" style={{ flexWrap: "nowrap" }}>
                <div
                  className="row"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                  }}
                >
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Attendance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allstudents.length > 0
                        ? allstudents
                        : this.state.isLoading
                        ? null
                        : noStudents}
                    </tbody>
                  </table>
                </div>
              </div>
            </main>
          </div>
        </>
      );
    } else if (this.state.isLoading) {
      return null;
    } else {
      return <Redirect push to={"/event/" + this.props.match.params.id} />;
    }
  }
}
