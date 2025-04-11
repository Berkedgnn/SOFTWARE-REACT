import axios from "axios";
import authHeader from "./auth-header";

const RESERVATION_API = "http://localhost:8080/api/reservations";
const PAYMENT_API = "http://localhost:8080/api/payment";

const submitReservation = (reservationDataArray) => {
    return axios.post(`${RESERVATION_API}`, reservationDataArray);
};

const completePayment = (reservationId, cardDetails) => {
    const paymentPayload = {
        reservationId,
        ...cardDetails
    };
    return axios.post(`${PAYMENT_API}/checkout`, paymentPayload);
};

const getMyReservations = (email) => {
    return axios.get(`${RESERVATION_API}/my`, {
        params: { email },
        headers: authHeader()
    });
};

export default {
    submitReservation,
    completePayment,
    getMyReservations,
};