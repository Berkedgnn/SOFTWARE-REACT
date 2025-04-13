import axios from "axios";
import authHeader from "./auth-header";

const BASE_URL = "http://localhost:8080/api/profile/manager";

const getProfile = () => {
    return axios.get(BASE_URL, { headers: authHeader() });
};

const updateProfile = (data) => {
    return axios.put(BASE_URL, data, { headers: authHeader() });
};

const changePassword = (data) => {
    return axios.put(`${BASE_URL}/password`, data, { headers: authHeader() });
};

export default {
    getProfile,
    updateProfile,
    changePassword,
};