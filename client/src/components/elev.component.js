import React, { Component, useEffect } from "react";
import AuthService from "../services/auth.service";
import Loader from "react-js-loader";

const MOCK_COURSES = [{ nume: "Mate" }, { nume: "Romana" }, { nume: "Info" }];
const TABLE_DATA = {
  catalog: [
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
  ],
};

// const TABLE_DATA = currentUser.email;

const column = Object.keys(TABLE_DATA.catalog[0]["note"][0]);
console.log("coloana", column);
const ThData = () => {
  return column.map((data) => {
    return <th key={data}>{data}</th>;
  });
};
console.log(ThData());

const reduceMaterie = (mappedArr, materie) => {
  const { note, idMaterie } = materie;
  note.forEach((notaObj) => {
    const { data, nota } = notaObj;
    mappedArr.push([data, nota]);
  });
  return mappedArr;
};

const mappedTableData = () => TABLE_DATA.catalog.reduce(reduceMaterie, []);

const TdData = (props) => {
  return reduceMaterie([], props.materie).map((row) => {
    console.log("sa", row);
    return (
      <tr>
        {row.map((column) => {
          return <td>{column}</td>;
        })}
      </tr>
    );
  });
};

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
    if (this.state.coursesNames.length === 0)
      return (
        <div className="container">
          <h3>
            <strong>Panou elev</strong>
          </h3>
          <br />
          <h5>Momentan nu aveti nicio nota.</h5>
        </div>
      );

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>Panou elev</strong>
          </h3>
          <br />
          <div>
            {TABLE_DATA.catalog.map((materie) => (
              <table key={materie.idMaterie} style={{ margin: "10px 0" }}>
                <thead>
                  <h4>
                    ID Materie: <b>{materie.idMaterie}</b>
                  </h4>
                  <tr>
                    <ThData />
                  </tr>
                </thead>
                <tbody>
                  <TdData materie={materie} />
                </tbody>
              </table>
            ))}
          </div>
        </header>
      </div>
    );
  }
}
