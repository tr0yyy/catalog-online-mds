import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:5000/api/test/';
class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }
    getUserBoard() {
        return axios.get(API_URL + 'elev', { headers: authHeader() });
    }
    getModeratorBoard() {
        return axios.get(API_URL + 'profesor', { headers: authHeader() });
    }
    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }
}
export default new UserService();
