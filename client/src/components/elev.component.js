import React, { Component } from "react";
import AuthService from "../services/auth.service";
import Loader from "react-js-loader";

export default class Elev extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: AuthService.getCurrentUser(),
      coursesNames: [],
    };
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
            <h5>Selecteaza materia:</h5>
            <select>
              {this.state.coursesNames.map((course) => (
                <option value={course.index}>{course.nume}</option>
              ))}
            </select>
          </div>
        </header>
      </div>
    );
  }
}
