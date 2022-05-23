import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:5000/api/helper/';
class UserService {
    getFullName(email) {
        return axios
            .get(API_URL + 'get-full-name', {headers: authHeader(), data: {email: email}})
            .then(response => {
                return response.data
            })
    }

    changePassword(email, oldPassword, newPassword) {
        return axios
            .get(API_URL + "change-password", {headers: authHeader(), params: {
                email: email,
                oldPassword: oldPassword,
                newPassword: newPassword}
            })
            .then(response => {
                return response.data
            })
    }

}
export default new UserService();
