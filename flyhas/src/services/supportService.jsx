
import axios from "axios";

const API_URL = "http://localhost:8080/api/support";

const getMySupportRequests = () =>
    axios.get(`${API_URL}/my`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("userToken") }
    });

const createSupportRequest = formData =>
    axios.post(API_URL, formData, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken"),
            "Content-Type": "multipart/form-data"
        }
    });

const deleteSupportRequest = id =>
    axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("userToken") }
    });

const getAllSupportRequests = () =>
    axios.get(`${API_URL}/all`);

const respondToSupportRequest = (id, response) =>
    axios.put(`${API_URL}/${id}/response`, response, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken"),
            "Content-Type": "text/plain"
        }
    });


const updateSupportRequest = (id, formData) =>
    axios.put(`${API_URL}/${id}`, formData, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken"),
            "Content-Type": "multipart/form-data"
        }
    });


export default {
    getMySupportRequests,
    createSupportRequest,
    deleteSupportRequest,
    getAllSupportRequests,
    respondToSupportRequest,
    updateSupportRequest
};