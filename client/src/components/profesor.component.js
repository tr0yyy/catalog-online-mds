import React, { Component, createRef } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import DbService from "../services/db.service";


export default class Profesor extends Component {
  constructor(props) {
    super(props);

    this.inputRef = createRef();
    this.state = {
      currentUser: AuthService.getCurrentUser(),
      clase: [],
      elevi: [],
      clasaSelectata: null,
      elevSelectat: null,
      notaSelectata: 0
    };
  }


  async componentDidMount() {
    let classes = []
    await DbService.getCatalog(this.state.currentUser.email)
        .then(async response => {
          for (let item of response) {
            classes.push(item.numeClasa)

          }
          console.log(classes)
          this.setState({clase: classes})
        })
  }

  async getMaterie(email) {
    let materie = await DbService.getMaterie(email)
    return materie.materie
  }

  setNota(e) {
    this.setState({
      notaSelectata: e.target.value
    });
  }

  setElev(e) {
    this.setState({
      elevSelectat: e.target.value
    });
  }

  async onClassSelected() {
    let materie = await DbService.getMaterie(this.state.currentUser.email)
    console.log(materie)
    let studentii = await DbService.getStudentsFromClass(this.state.clasaSelectata, materie.materie)
    console.log(studentii)
    this.setState({elevi: studentii})
  }

  async setGrade() {
    DbService.sendGrade()
  }

  render() {
    if (this.state.currentUser.isAdmin !== 2) {
      window.location.href = "/";
      return <></>;
    }

    return <div>
      <div className="container">
          <header className="jumbotron">
        <h2>Clasa</h2>
        <select onChange={async (e) => {
          this.setState({clasaSelectata: e.target.value})
          await this.onClassSelected()
        }}>
          <option>Selectati o clasa</option>
          {this.state.clase.map((clasa) => (
            <option value={clasa}>{clasa}</option>
          ))}
        </select>

        {
          this.state.clasaSelectata !== null &&
          <div>
            <div>
              <h3>Elevi</h3>
              <div>
                <select onChange={this.setElev.bind(this)}>
                  {this.state.elevi.map((elev) => (
                    <option value={`${elev.nume} ${elev.prenume}`}>{elev.nume} {elev.prenume}</option>
                  ))}
                </select>
                <div>
                  <label htmlFor="input-nota">Inserati o nota</label>
                  <input
                    id="input-nota" 
                    type="range" 
                    min={1} 
                    max={10}
                    value={this.state.notaSelectata}
                    onChange={this.setNota.bind(this)}
                  />
                  <button onClick={async () => {
                      console.log(this.state.elevSelectat.split(" ")[0] + this.state.elevSelectat.split(" ")[1])
                      console.log(this.state.notaSelectata)
                      let materie = await this.getMaterie(this.state.currentUser.email)
                      let response = await DbService.sendGrade(this.state.elevSelectat.split(" ")[0], this.state.elevSelectat.split(" ")[1],
                      materie, undefined, this.state.notaSelectata)
                        window.alert("Nota adaugata cu succes")

                  }}>{this.state.notaSelectata !== 0 ? `Da-i nota ${this.state.notaSelectata}` : "Alege o nota din slider"}</button>
                </div>
              </div>
            </div>
          </div>
        }
      </header>
      </div>
    </div>
  }
}
