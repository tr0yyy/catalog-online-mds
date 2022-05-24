import React, { Component } from "react";
import AuthService from "../services/auth.service";
import Loader from "react-js-loader";

const MOCK_COURSES = [{ nume: "Mate" }, { nume: "Romana" }, { nume: "Info" }];

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
    this.setState({ nota: Math.floor(Math.random() * 10) + 1 });
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
            <form>
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
                  value={this.state.nota}
                />
              </label>
            </form>
          </div>
        </header>
      </div>
    );
  }
}
