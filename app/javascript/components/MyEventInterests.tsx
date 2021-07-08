import * as React from "react";

type Props = {
  match: {
    params: any;
  };
  history: any;
  user_id: number;
  role: string;
};

type State = {
  students: any[];
  isLoading: boolean;
};

export default class MyEventInterests extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      students: [],
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
        this.setState({ students: response, isLoading: false });
        console.log(response);
      })
      .catch(() => this.props.history.push("/event/" + id));
  }

  render() {
    const { students } = this.state;

    const allstudents = students.map((student, index) => (
      <tr>
        <td>{index + 1}</td>
        <td>{student.name}</td>
        <td>{student.email}</td>
      </tr>
    ));

    const noStudents = (
      <tr>
        <td>No Students yet.</td>
      </tr>
    );

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
            <div className="row" style={{ flexWrap: "nowrap" }}>
              <div
                className="row"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                }}
              >
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
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
  }
}
