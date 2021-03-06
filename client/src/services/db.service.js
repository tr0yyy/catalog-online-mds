import axios from "axios";
import authHeader from "./auth-header";
const API_URL = 'http://localhost:5000/api/db/';
class DbService {
    getCatalog(email) {
    return axios
      .get(API_URL + "get-catalog", { params: {"email" : email }})
      .then((response) => {
        return response.data;
      });
  }
    loadData(filename, collection, school) {
        return axios
            .post(API_URL + 'load-data', {headers: authHeader(), filename, collection, school})
            .then(response => {
                return response.data.message
            })
    }
    getAllSchools() {
        return axios
            .get(API_URL + "get-all-schools")
            .then(response => {
                return response.data
            })
    }
    sendGrade(nume, prenume, numeMaterie, data, nota) {
        return axios
            .post(API_URL+ "setgrade", {headers: authHeader(), nume, prenume, numeMaterie, data, nota})
            .then(response => {
                return response.data
            })
    }
    getStudentsFromClass(clasa, numeMaterie) {
        return axios
            .get(API_URL + "get-students-from-class", {headers: authHeader(),params:{"numeClasa": clasa, "numeMaterie": numeMaterie}})
            .then(response => {
                return response.data
            })
    }

    getMaterie(email) {
        return axios
            .get(API_URL + "get-materie", {headers: authHeader(),params: {"email": email}})
            .then(response => {
                return response.data
            })
    }
    getClase(email) {
        return axios
            .get(API_URL + "get-all-students-from-professor", {headers: authHeader(), params: {"email" : email}})
            .then(response => {
            return response.data;
        });
    }

}

export default new DbService();
