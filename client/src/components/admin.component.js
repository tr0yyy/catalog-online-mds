import React, { Component } from "react";
import AuthService from "../services/auth.service";
import CsvService from "../services/csv.service";
import DbService from "../services/db.service"
import Loader from "react-js-loader";
import selectorEngine from "bootstrap/js/src/dom/selector-engine";
export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: AuthService.getCurrentUser(),
            file: undefined,
            schoolNames: [],
            selectedSchool: 0
        };
    }

    async componentDidMount() {
        let array = []
        await DbService.getAllSchools()
            .then(response => {
                array = response
            });
        console.log(array)
        for(let i = 0 ; i < array.length ; i++) {
            array[i]['index'] = i
        }
        this.setState({schoolNames: array})
    }

    onFileSelect = event => {
        this.state.file = event.target.files[0]
    }

    onSchoolSelect = event => {
        this.setState({
            selectedSchool: event.target.value,
        });

    }

    onSchoolUpload =  async () => {
        const formData = new FormData();
        formData.append("file", this.state.file, this.state.file.name);
        console.log(this.state.file)
        CsvService.uploadFile(formData)
            .then(response => {
                console.log(response.filename)
                DbService.loadData(response.filename, 'school', '')
                    .then(response => {
                        console.log(response);
                    })
            })
    }

    onStudentsUpload =  async () => {
        const formData = new FormData();
        formData.append("file", this.state.file, this.state.file.name);
        console.log(this.state.file)
        CsvService.uploadFile(formData)
            .then(response => {
                console.log(response.filename)
                DbService.loadData(response.filename, 'users', this.state.schoolNames[this.state.selectedSchool])
                    .then(response => {
                        console.log(response);
                        window.location.href = '/';
                    })
            })
    }

    onClassUpload =  async () => {
        const formData = new FormData();
        formData.append("file", this.state.file, this.state.file.name);
        console.log(this.state.file)
        CsvService.uploadFile(formData)
            .then(response => {
                console.log(response.filename)
                DbService.loadData(response.filename, 'materii', '')
                    .then(response => {
                        console.log(response);
                    })
            })
    }



    render() {

        if(this.state.currentUser.isAdmin !== 3) {
            window.location.href = '/';
            return <></>
        }

        console.log(this.state.schoolNames.length)
        if(this.state.schoolNames.length === 0) return <Loader />
        console.log(this.state.schoolNames.length)
        return (
            (
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <strong>Admin Control Panel</strong>
                    </h3>
                    <br/>
                    <h3>
                        <strong>Incarca baza de date</strong>
                    </h3>
                    <hr/>
                    <p>Uploadeaza un fisier CSV pentru a incarca o scoala (Header CSV - nume_scoala, oras_scoala,
                        adresa_scoala, telefon)</p>
                    <div>
                        <input type="file" name="file" onChange={this.onFileSelect}/>
                        <div>
                            <button onClick={this.onSchoolUpload}>Submit</button>
                        </div>
                    </div>
                    <hr/>
                    <p>Uploadeaza un fisier CSV pentru a incarca materiile (Header CSV - nume_materie)</p>
                    <div>
                        <input type="file" name="file" onChange={this.onFileSelect}/>
                        <div>
                            <button onClick={this.onClassUpload}>Submit</button>
                        </div>
                    </div>
                    <hr/>
                    <div>
                        <select onChange={this.onSchoolSelect}>
                            {
                                this.state.schoolNames.map((school) => (
                                    <option value={school.index}>{school.nume}</option>
                                ))
                            }
                        </select>
                    </div>
                    <p>Uploadeaza un fisier CSV pentru a incarca elevii scolii (Header CSV - clasa, nume, prenume,
                        email, parola_default)</p>
                    <div>
                        <input type="file" name="file" onChange={this.onFileSelect}/>
                        <div>
                            <button onClick={this.onStudentsUpload}>Submit</button>
                        </div>
                    </div>
                    <p>Uploadeaza un fisier CSV pentru a incarca profesorii scolii (Header CSV - nume, prenume, email,
                        parola_default, clase_predate, materii_predate)</p>
                    <div>
                        <input type="file" name="file" onChange={this.onFileSelect}/>
                        <div>
                            <button onClick={this.onStudentsUpload}>Submit</button>
                        </div>
                    </div>
                    <hr/>
                </header>
            </div>
        ));
    }
}
