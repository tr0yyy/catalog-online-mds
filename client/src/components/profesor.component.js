import React, { Component, createRef } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import DbService from "../services/db.service";


// nume: String,
// prenume: String,
// email: String,
// password: String,
// isAdmin: Number,
// clase: [
//     {
//         idClasa: ObjectId
//     }
// ],
// scoala: ObjectId,
// materii: [
//     {
//         idMaterie: ObjectId
//     }
// ]

const makeMockCatalog = (nota) => ([
  {
    idMaterie: "Mate",
    note: [
      {
        data: new Date(),
        nota: nota
      }
    ]
  }
])

const MOCK_CLASE_PROFESOR = [
  { idClasa: "1A" },
  { idClasa: "1B" },
]

const MOCK_CLASE = [
  { idClasa: "1A" },
  { idClasa: "1B" },
]

const MOCK_ELEVI = [
  { 
    nume: "Ionescu", 
    prenume: "Ion" , 
    idClasa: "1A", 
    catalog: makeMockCatalog(7), 
  },
  { 
    nume: "Popescu", 
    prenume: "Pop" , 
    idClasa: "1A", 
    catalog: [], 
  },
  { 
    nume: "Cionescu", 
    prenume: "CLion" , 
    idClasa: "1B", 
    catalog: makeMockCatalog(9), 
  },
  { 
    nume: "Tocescu", 
    prenume: "Toc", 
    idClasa: "1B", 
    catalog: [], 
  }
]

const MOCK_PROFESOR = {
    nume: "Bambucha",
    prenume: "Kalashnikov",
    isAdmin: 2,
    clase: MOCK_CLASE,
    scoala: "idScoala",
    materie: "Mate"
}

export default class Profesor extends Component {
  constructor(props) {
    super(props);

    this.inputRef = createRef();
    this.state = {
      currentUser: AuthService.getCurrentUser(),
      profesor: null,
      elevi: [],

      clasaSelectata: null,
      elevSelectat: null
    };
  }

  getProfesor() {
    // NOTE: Inlocuieste cu un call la API pentru profesor
    return MOCK_PROFESOR
  }

  getElevi(clasa) {    
    // NOTE: Inlocuieste cu un call la API pentru elevi
    // (paseaza idClasa ca parametru la call)
    this.setState({ elevi: MOCK_ELEVI.filter(
      elev => elev.idClasa === clasa) });
  }
  
  getElev() {
    if (this.state.elevSelectat === null) return null;
    if (this.state.elevi.length === 0) return null;
    return this.state.elevi[this.state.elevSelectat]
  }

  selecteazaElev(idx) {
    this.setState({ elevSelectat: idx });
  }

  selecteazaClasa(idx) {
    const clasaSelectata = idx - 1;
    
    this.getElevi(this.state.profesor.clase[clasaSelectata].idClasa)
    this.setState({ clasaSelectata })
  }

  evalueazaElev(elev, nota) {
    // NOTE: In loc de mizeria asta, faceti un POST request la API
    // trimitand elevul ce trebuie updatat si nota sa.
    // Dupa apel, faceti iar apel la getElevi:
    // 
    //        this.getElevi(this.state.clasaSelectata)
    const elevIdx = this
      .state
      .elevi
      .findIndex(
        iterElev => (
          iterElev.nume === elev.nume && 
          iterElev.prenume === elev.prenume
        )
      )
    if (elevIdx === -1) return;

    this.setState({ 
      elevi: this
        .state
        .elevi
        .map((elev, idx) => {
          if (idx === elevIdx) return {
            ...elev,
            catalog: [{
              idMaterie: this.state.profesor.materie,
              note: [
                ...elev.catalog.map(materie => materie.note),
                {
                  nota,
                  data: new Date()
                }
              ]
            }]
          };
          return elev;
        })
    })
  }

  componentDidMount() {
    this.setState({ profesor: this.getProfesor() });
  }

  render() {
    if (!this.state.profesor) return <></>;
    if (this.state.currentUser.isAdmin !== 2) {
      window.location.href = "/";
      return <></>;
    }

    return <div>
      <div className="container">
          <header className="jumbotron">
        <h2>Clasa</h2>
        <select onChange={(e) => {
          const idx = Number(e.target.value);
          if (idx === 0) return;
          this.selecteazaClasa(idx);
        }}>
          <option>Selectati o clasa</option>
          {this.state.profesor.clase.map((clasa, idx) => (
            <option key={idx + 1} value={idx + 1}>{clasa.idClasa}</option>
          ))}
        </select>

        {
          this.state.clasaSelectata !== null &&
          <div>
            <div>
              <h3>Elevi</h3>
              <div>
                <select onChange={(e) => {
                  const idx = Number(e.target.value);
                  this.selecteazaElev(idx)
                }}>
                  {this.state.elevi.map((elev, elevIdx) => (
                    <option key={`${elev.nume}${elev.prenume}${elevIdx}`} value={elevIdx}>{elev.nume} {elev.prenume}</option>
                  ))}
                </select>
                <div>
                  <label htmlFor="input-nota">Inserati o nota</label>
                  <input
                    ref={component => {
                      this.inputRef.current = component
                    }} 
                    id="input-nota" 
                    type="range" 
                    min={1} 
                    max={10}
                    defaultValue={1}
                  />
                  <button onClick={() => {
                    const nota = Number(this.inputRef.current.value);
                    const elev = this.getElev();
                    if (!elev) return;
                    this.evalueazaElev(elev, nota)
                  }}>{this.inputRef.current && this.inputRef.current.value ? `Da-i nota ${this.inputRef.current.value}` : "Alege o nota din slider"}</button>
                </div>
                {
                  this.getElev() !== null && 
                  <div>
                    {
                      this.getElev().catalog.length === 0 
                        ? <h3>Nu are note</h3>
                        : this
                            .getElev()
                            .catalog
                            .filter(materieDinCatalog => (
                              materieDinCatalog.idMaterie === this.state.profesor.materie
                            ))
                            .map((materie) => (
                          <table key={materie.idMaterie} style={{ margin: "10px 0" }}>
                            <thead>
                              <tr>
                                <th>Data</th>
                                <th>Nota</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                materie.note.map((notaObj, notaIdx) => ( 
                                  <tr key={notaIdx}>
                                    <td>{notaObj.data.toLocaleDateString("en-UK")}</td>
                                    <td>{notaObj.nota}</td>
                                  </tr>                                
                                ))
                              }
                            </tbody>
                          </table>
                    ))}
                  </div>
                }
              </div>
            </div>
          </div>
        }
      </header>
      </div>
    </div>
  }
}
