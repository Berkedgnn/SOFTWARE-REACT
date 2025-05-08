import axios from "axios";

const API_URL = "http://localhost:8080/api/banners";

const bannerService = {
    getAll: () =>
        axios.get(`${API_URL}/all`),

    upload: (formData) =>
        axios.post(API_URL, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }),

    deleteById: (id) =>
        axios.delete(`${API_URL}/${id}`),

    toggleHome: (id) =>
        axios.put(`${API_URL}/${id}/toggle-home`),

    getVisible: () =>
        axios.get(`${API_URL}/visible`),
};

export default bannerService;