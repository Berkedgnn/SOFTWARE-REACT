import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/payment";

const PaymentService = {
    makePayment: async (paymentData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/checkout`, paymentData);
            return response.data;
        } catch (error) {
            console.error("Payment error:", error);
            throw error;
        }
    },
};

export default PaymentService;