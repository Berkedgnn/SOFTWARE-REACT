import React, { useState } from "react";
import {
    Container, Grid, Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions,
    CircularProgress, IconButton, InputAdornment, TextField, Button
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ReservationService from "../services/ReservationService";
import PaymentService from "../services/PaymentService";
import { getUserFromToken } from "../services/decodeToken";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const CheckoutPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const passengers = location.state?.passengers || [];
    const selectedSeats = location.state?.selectedSeats || [];

    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });
    const [showCvv, setShowCvv] = useState(false);
    const [showBack, setShowBack] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [reservationCode, setReservationCode] = useState(""); // 🆕 kodu burada tutuyoruz

    const totalCost =
        65 +
        selectedSeats.reduce(
            (acc, seat) => acc + (seat.seatNumber?.startsWith("1") ? 25 : 11),
            0
        );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCardDetails({ ...cardDetails, [name]: value });
    };

    const handleConfirmPayment = async () => {
        if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv) return;

        setIsLoading(true);

        try {
            const user = getUserFromToken();
            const reservedBy = user?.sub || "";

            const reservationData = selectedSeats.map((seat, index) => ({
                seatId: seat.id,
                firstName: passengers[index].firstName,
                lastName: passengers[index].lastName,
                email: passengers[index].email,
                birthDate: passengers[index].birthDate,
                nationalId: passengers[index].nationalId,
                reservedBy: reservedBy,
            }));

            const reservationResponse = await ReservationService.submitReservation(reservationData);

            const reservationId = reservationResponse?.data?.[0]?.id;
            const reservationCodeFromBackend = reservationResponse?.data?.[0]?.reservationCode;
            setReservationCode(reservationCodeFromBackend || "UNKNOWN");

            await PaymentService.makePayment({
                cardNumber: cardDetails.cardNumber,
                expiryDate: cardDetails.expiryDate,
                cvv: cardDetails.cvv,
                reservationId: reservationId,
            });

            setIsLoading(false);
            setOpenConfirmation(true);
        } catch (error) {
            console.error("Reservation or Payment Error:", error);
            setIsLoading(false);
            alert("Something went wrong. Please try again.");
        }
    };

    const handleCloseConfirmation = () => {
        setOpenConfirmation(false);
        navigate("/UserProfile/Reservations");
    };

    return (
        <Box sx={{ minHeight: "100vh", padding: 0 }}>
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={8}>
                        <Box sx={{ backgroundColor: "white", borderRadius: 4, padding: 3 }}>
                            <Typography variant="h4" gutterBottom fontWeight="bold">
                                Reservation Summary
                            </Typography>

                            {passengers.map((p, index) => (
                                <Box key={index} mt={2}>
                                    <Typography><strong>Seat:</strong> {selectedSeats[index].seatNumber}</Typography>
                                    <Typography><strong>Name:</strong> {p.firstName} {p.lastName}</Typography>
                                    <Typography><strong>Email:</strong> {p.email}</Typography>
                                    <Typography><strong>Birth Date:</strong> {p.birthDate}</Typography>
                                    <Typography><strong>National ID:</strong> {p.nationalId}</Typography>
                                </Box>
                            ))}

                            <Box mt={3}>
                                <Typography variant="h6">Total Cost: <strong>£{totalCost}</strong></Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={4}>
                        <Box sx={{ perspective: "1000px", width: "100%" }}>
                            <Box sx={{
                                position: "relative",
                                width: "100%",
                                height: "210px",
                                transformStyle: "preserve-3d",
                                transform: showBack ? "rotateY(180deg)" : "rotateY(0)",
                                transition: "transform 0.6s",
                            }}>
                                {/* Kart Ön */}
                                <Box sx={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    backfaceVisibility: "hidden",
                                    backgroundColor: "white",
                                    borderRadius: 2,
                                    padding: 2,
                                    boxShadow: 3,
                                }}>
                                    <Typography>Card Number</Typography>
                                    <TextField
                                        fullWidth name="cardNumber"
                                        value={cardDetails.cardNumber}
                                        onChange={handleInputChange}
                                        sx={{ mb: 2 }}
                                    />
                                    <Typography>Expiry Date (MM/YY)</Typography>
                                    <TextField
                                        fullWidth name="expiryDate"
                                        value={cardDetails.expiryDate}
                                        onChange={handleInputChange}
                                    />
                                    <Button variant="contained" onClick={() => setShowBack(true)} sx={{ mt: 2 }}>
                                        Enter CVV
                                    </Button>
                                </Box>

                                {/* Kart Arka */}
                                <Box sx={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    backfaceVisibility: "hidden",
                                    transform: "rotateY(180deg)",
                                    backgroundColor: "white",
                                    borderRadius: 2,
                                    padding: 2,
                                    boxShadow: 3,
                                }}>
                                    <Typography>CVV</Typography>
                                    <TextField
                                        fullWidth name="cvv"
                                        type={showCvv ? "text" : "password"}
                                        value={cardDetails.cvv}
                                        onChange={handleInputChange}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowCvv(!showCvv)}>
                                                        {showCvv ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <Button variant="outlined" onClick={() => setShowBack(false)} sx={{ mt: 2 }}>
                                        Back
                                    </Button>
                                    <Button variant="contained" onClick={handleConfirmPayment} sx={{ mt: 2 }} fullWidth>
                                        Confirm Payment
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {isLoading && (
                <Box sx={{
                    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    display: "flex", justifyContent: "center", alignItems: "center", zIndex: 5
                }}>
                    <CircularProgress />
                </Box>
            )}

            <Dialog open={openConfirmation} onClose={handleCloseConfirmation}>
                <DialogTitle>Reservation Completed</DialogTitle>
                <DialogContent>
                    <Typography>Thank you! Your booking has been confirmed.</Typography>
                    <Typography><strong>Total Paid:</strong> £{totalCost}</Typography>
                    <Typography sx={{ mt: 2, color: "primary.main" }}>
                        <strong>Your Reservation Code:</strong> {reservationCode}
                    </Typography>
                    <Typography fontStyle="italic" fontSize="small">
                        Please note this code for your flight check-in.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmation} autoFocus>
                        Go to Reservations
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CheckoutPage;