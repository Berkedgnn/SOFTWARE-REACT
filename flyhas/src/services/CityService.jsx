
import axios from "axios";

const API_URL = "http://localhost:8080/api/cities";

const getAllCities = () =>
    axios.get(API_URL);

const addCity = formData =>
    axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });

const deleteCity = id =>
    axios.delete(`${API_URL}/${id}`);

export default {
    getAllCities,
    addCity,
    deleteCity
};