import axios from 'axios';

const registerBaseUrl = 'http://127.0.0.1:8000/';
const axiosInstance = axios.create({
    baseURL:registerBaseUrl,
});
//Post Request for creating a new user
export const createUser = (userData) => {
    return axiosInstance.post("useradmin/addAdminUser/",userData);
}; 

// Post Request for login in
export const loginUser = (loginData) => {
    axiosInstance.post("",loginData)
}