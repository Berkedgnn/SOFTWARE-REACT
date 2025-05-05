import axios from "axios";

const API_URL = "http://localhost:8080/api/support";

const getMySupportRequests = () => {
    return axios.get(`${API_URL}/my`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
    });
};

const createSupportRequest = (formData) => {
    return axios.post(API_URL, formData, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken"),
            "Content-Type": "multipart/form-data",
        },
    });
};

const deleteSupportRequest = (id) => {
    return axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
    });
};

const getAllSupportRequests = () => {
    return axios.get(`${API_URL}/all`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
    });
};

const respondToSupportRequest = (id, response) => {
    return axios.put(`${API_URL}/${id}/response`, response, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken"),
            "Content-Type": "text/plain",
        },
    });
};

export default {
    getMySupportRequests,
    createSupportRequest,
    deleteSupportRequest,
    getAllSupportRequests,
    respondToSupportRequest,
};