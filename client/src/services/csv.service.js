import axios from "axios";
import authHeader from "./auth-header";
const API_URL = 'http://localhost:5000/api/helper/';
class CsvService {
    uploadFile(formData) {
        console.log(formData)
        return axios
            .post(API_URL + 'upload-csv-file', formData)
            .then(response => {
                return response.data.message
            })
    }
}

export default new CsvService()