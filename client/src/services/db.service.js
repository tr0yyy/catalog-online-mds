import axios from "axios";
import authHeader from "./auth-header";
const API_URL = 'http://localhost:5000/api/db/';
class DbService {
    getCatalog(email) {
    return axios
      .get(API_URL + "get-catalog", { headers: authHeader(), params: {"email" : email }})
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

}

export default new DbService();
