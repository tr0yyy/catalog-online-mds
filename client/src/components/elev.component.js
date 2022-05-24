import React, { Component, useEffect } from "react";
import {Redirect} from "react-router-dom";
import AuthService from "../services/auth.service";
import Loader from "react-js-loader";
import DbService from "../services/db.service";



// const TABLE_DATA = currentUser.email;

const column = ['data', 'nota'];
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

// const mappedTableData = () => TABLE_DATA.catalog.reduce(reduceMaterie, []);

const TdData = (props) => {
  return reduceMaterie([], props.materie).map((row) => {
    console.log("sa", row);
    return (
      <tr>
        {row.map((column) => {
          return <td>{column.toString().split('T')[0]}</td>;
        })}
      </tr>
    );
  });
};

export default class Elev extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: AuthService.getCurrentUser(),
      materiaSelectata: undefined,
      catalog: [],
      nota: undefined,
    };
  }

  async componentDidMount() {
    let array = []
    await DbService.getCatalog(this.state.currentUser.email)
        .then(response => {
          array = response
        });
    console.log(array)
    this.setState({catalog: array})
    console.log("dupa set state")
  }

  render() {
    if(this.state.currentUser.isAdmin !== 0) {
      window.location.href = '/';
      return <></>
    }

    if (this.state.catalog.length === 0) {
      console.log("IN EGAL CU 0 RETURN---" + this.state.catalog.length)
      return (
          <div className="container">
            <h3>
              <strong>Panou elev</strong>
            </h3>
            <br/>
            <h5>Momentan nu aveti nicio nota.</h5>
          </div>
      );
    } else {
      console.log("SUB RETURN---" + this.state.catalog.length)
      return (
          <div className="container">
            <header className="jumbotron">
              <h3>
                <strong>Panou {this.state.currentUser.email}</strong>
              </h3>
              <br/>
              <div>
                {this.state.catalog.map((materie) => (
                  <table key={materie.idMaterie} style={{ margin: "10px 0" }}>
                    <thead>
                      <h4>
                        Nume materie: <b>{materie.nume}</b>
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
}
