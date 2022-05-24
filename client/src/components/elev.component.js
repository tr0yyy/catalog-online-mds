import React, { Component, useEffect } from "react";
import AuthService from "../services/auth.service";
import Loader from "react-js-loader";

const MOCK_COURSES = [{ nume: "Mate" }, { nume: "Romana" }, { nume: "Info" }];
const TABLE_DATA = [
  {
    idMaterie: 1,
    note: [
      {
        data: 1,
        nota: 1,
      },
      {
        data: 2,
        nota: 2,
      },
    ],
  },
  {
    idMaterie: 2,
    note: [
      {
        data: 3,
        nota: 3,
      },
      {
        data: 4,
        nota: 4,
      },
    ],
  },
];

const column = (
  Object.keys(TABLE_DATA[0])[0] +
  "," +
  Object.keys(TABLE_DATA[0]["note"][0])
).split(",");
console.log("coloana", column);
const ThData = () => {
  return column.map((data) => {
    return <th key={data}>{data}</th>;
  });
};
console.log(ThData());
const tdData = () => {
  return TABLE_DATA.map((data) => {
    console.log("sa", data);
    return (
      <tr>
        {column.map((row) => {
          return <td>{data[row]}</td>;
        })}
      </tr>
    );
  });
};
console.log(tdData());

function randomNota() {
  return Math.floor(Math.random() * 10) + 1;
}

export default class Elev extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      currentUser: AuthService.getCurrentUser(),
      coursesNames: [...MOCK_COURSES],
      materiaSelectata: undefined,
      nota: undefined,
    };
  }
  changeNota = () => {
    this.setState({ nota: [randomNota(), randomNota(), randomNota()] });
  };
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.nota !== nextState.nota;
  }
  render() {
    // if (this.state.coursesNames.length === 0)
    //   return (
    //     <div className="container">
    //       <h3>
    //         <strong>Panou elev</strong>
    //       </h3>
    //       <br />
    //       <h5>Momentan nu aveti nicio nota.</h5>
    //     </div>
    //   );

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>Panou elev</strong>
          </h3>
          <br />

          <div>
            <h5>Selecteaza materia:</h5>
            {/* <form>
              <select
                onChange={(e) => {
                  const indexMaterie = Number(e.target.value);
                  if (indexMaterie === 0) return;
                  this.changeNota();
                }}
              >
                {!this.state.nota && <option>Selectati o materie</option>}
                {this.state.coursesNames.map((course, idx) => (
                  <option value={idx + 1}>{course.nume}</option>
                ))}
              </select>
              <label>
                Nota dvs:
                <br />
                <input
                  type="text"
                  name="name"
                  readOnly={true}
                  value={this.state.nota ? this.state.nota.join(", ") : ""}
                />
              </label>
            </form> */}
            <table className="table">
              <thead>
                <tr>{<ThData></ThData>}</tr>
              </thead>
              <tbody>{<tdData />}</tbody>
            </table>
          </div>
        </header>
      </div>
    );
  }
}
