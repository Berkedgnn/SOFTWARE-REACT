import React, { useState } from "react";
import {
    Container,
    Grid,
    Typography,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
    IconButton,
    InputAdornment,
    TextField,
    Button,
    Divider,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import ReservationService from "../services/ReservationService";
import PaymentService from "../services/PaymentService";
import { getUserFromToken } from "../services/decodeToken";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const CheckoutPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log("🔍 CheckoutPage location.state:", location.state);

    const {
        passengers = [],
        selectedSeats = [],
        flight = {},
    } = location.state || {};

    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });
    const [cardErrors, setCardErrors] = useState({});
    const [showCvv, setShowCvv] = useState(false);
    const [showBack, setShowBack] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [reservationCode, setReservationCode] = useState("");

    const totalCost =
        65 +
        selectedSeats.reduce(
            (acc, seat) => acc + (seat.seatNumber?.startsWith("1") ? 25 : 11),
            0
        );

    const flightDate = flight.departureTime
        ? new Date(flight.departureTime).toLocaleDateString()
        : "";
    const flightTime = flight.departureTime
        ? new Date(flight.departureTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })
        : "";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCardDetails((prev) => ({ ...prev, [name]: value }));
    };

    const validateCardDetails = () => {
        const errors = {};
        if (!/^\d{16}$/.test(cardDetails.cardNumber))
            errors.cardNumber = "Must be 16 digits";
        if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiryDate))
            errors.expiryDate = "MM/YY format required";
        else {
            const [mm, yy] = cardDetails.expiryDate.split("/").map(Number);
            const now = new Date(),
                cy = now.getFullYear() % 100,
                cm = now.getMonth() + 1;
            if (mm < 1 || mm > 12) errors.expiryDate = "Invalid month";
            else if (yy < cy || (yy === cy && mm < cm))
                errors.expiryDate = "Card expired";
        }
        if (!/^\d{3}$/.test(cardDetails.cvv)) errors.cvv = "Must be 3 digits";
        return errors;
    };

    const handleConfirmPayment = async () => {
        const errs = validateCardDetails();
        setCardErrors(errs);
        if (Object.keys(errs).length) return;

        setIsLoading(true);
        try {
            const user = getUserFromToken();
            const reservedBy = user?.sub || "";

            const reservationData = selectedSeats.map((seat, i) => ({
                seatId: seat.id,
                firstName: passengers[i].firstName,
                lastName: passengers[i].lastName,
                email: passengers[i].email,
                birthDate: passengers[i].birthDate,
                nationalId: passengers[i].nationalId,
                reservedBy,
            }));

            const res = await ReservationService.submitReservation(
                reservationData
            );
            const created = res.data?.[0];
            setReservationCode(created?.reservationCode || "UNKNOWN");

            await PaymentService.makePayment({
                reservationId: created.id,
                cardNumber: cardDetails.cardNumber,
                expiryDate: cardDetails.expiryDate,
                cvv: cardDetails.cvv,
            });

            setIsLoading(false);
            setOpenConfirmation(true);
        } catch (err) {
            console.error(err);
            setIsLoading(false);
            alert("Something went wrong");
        }
    };

    const handleCloseConfirmation = () => {
        setOpenConfirmation(false);
        navigate("/UserProfile/Reservations");
    };

    const downloadTicketPdf = async () => {
        const input = document.getElementById("ticket-content");
        if (!input) return;
        const canvas = await html2canvas(input, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "pt", "a4");
        const w = pdf.internal.pageSize.getWidth();
        const h = (canvas.height * w) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, w, h);

        pdf.save(`Ticket_${reservationCode}.pdf`);
    };

    return (
        <Box sx={{ minHeight: "100vh" }}>
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={8}>
                        <Box sx={{ bgcolor: "white", borderRadius: 4, p: 3 }}>
                            <Typography variant="h4" gutterBottom fontWeight="bold">
                                Reservation Summary
                            </Typography>
                            <Typography>
                                <strong>Origin:</strong> {flight.origin}&nbsp;&nbsp;
                                <strong>Destination:</strong> {flight.destination}
                            </Typography>
                            <Typography>
                                <strong>Date:</strong> {flightDate}&nbsp;&nbsp;
                                <strong>Time:</strong> {flightTime}
                            </Typography>
                            <Divider sx={{ my: 2 }} />

                            {passengers.map((p, i) => (
                                <Box key={i} mt={1}>
                                    <Typography>
                                        <strong>Seat:</strong> {selectedSeats[i].seatNumber}
                                    </Typography>
                                    <Typography>
                                        <strong>Name:</strong> {p.firstName} {p.lastName}
                                    </Typography>
                                </Box>
                            ))}

                            <Box mt={3}>
                                <Typography variant="h6">
                                    Total Cost: <strong>£{totalCost}</strong>
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={4}>
                        <Box sx={{ perspective: "1000px", width: "100%" }}>
                            <Box
                                sx={{
                                    position: "relative",
                                    width: "100%",
                                    height: "210px",
                                    transformStyle: "preserve-3d",
                                    transform: showBack ? "rotateY(180deg)" : "rotateY(0)",
                                    transition: "transform 0.6s",
                                }}
                            >
                                {/* Front */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        width: "100%",
                                        height: "100%",
                                        backfaceVisibility: "hidden",
                                        bgcolor: "#fff",
                                        borderRadius: 2,
                                        p: 2,
                                        boxShadow: 3,
                                    }}
                                >
                                    <Typography>Card Number</Typography>
                                    <TextField
                                        fullWidth
                                        name="cardNumber"
                                        value={cardDetails.cardNumber}
                                        onChange={handleInputChange}
                                        error={!!cardErrors.cardNumber}
                                        helperText={cardErrors.cardNumber}
                                        sx={{ mb: 2 }}
                                    />
                                    <Typography>Expiry Date (MM/YY)</Typography>
                                    <TextField
                                        fullWidth
                                        name="expiryDate"
                                        value={cardDetails.expiryDate}
                                        onChange={handleInputChange}
                                        error={!!cardErrors.expiryDate}
                                        helperText={cardErrors.expiryDate}
                                    />
                                    <Button
                                        variant="contained"
                                        onClick={() => setShowBack(true)}
                                        sx={{ mt: 2 }}
                                    >
                                        Enter CVV
                                    </Button>
                                </Box>

                                {/* Back */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        width: "100%",
                                        height: "100%",
                                        backfaceVisibility: "hidden",
                                        transform: "rotateY(180deg)",
                                        bgcolor: "#fff",
                                        borderRadius: 2,
                                        p: 2,
                                        boxShadow: 3,
                                    }}
                                >
                                    <Typography>CVV</Typography>
                                    <TextField
                                        fullWidth
                                        name="cvv"
                                        type={showCvv ? "text" : "password"}
                                        value={cardDetails.cvv}
                                        onChange={handleInputChange}
                                        error={!!cardErrors.cvv}
                                        helperText={cardErrors.cvv}
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
                                    <Button
                                        variant="outlined"
                                        onClick={() => setShowBack(false)}
                                        sx={{ mt: 2, mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleConfirmPayment}
                                        sx={{ mt: 2 }}
                                    >
                                        Confirm Payment
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {isLoading && (
                <Box
                    sx={{
                        position: "fixed",
                        inset: 0,
                        bgcolor: "rgba(255,255,255,0.7)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1300,
                    }}
                >
                    <CircularProgress />
                </Box>
            )}

            <Dialog
                open={openConfirmation}
                onClose={handleCloseConfirmation}
                maxWidth="sm"
            >
                <DialogTitle>Reservation Completed</DialogTitle>
                <DialogContent>
                    <Box
                        id="ticket-content"
                        sx={{
                            p: 2,
                            bgcolor: "#004a72",
                            color: "white",
                            borderRadius: 2,
                            fontFamily: "monospace",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 1,
                            }}
                        >
                            <Typography variant="h6">FLYHAS</Typography>
                            <FlightTakeoffIcon fontSize="large" />
                        </Box>
                        <Divider sx={{ bgcolor: "white", mb: 1 }} />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 1,
                            }}
                        >
                            <Box>
                                <Typography variant="caption">FROM</Typography>
                                <Typography variant="subtitle1">{flight.origin}</Typography>
                            </Box>
                            <FlightLandIcon />
                            <Box sx={{ textAlign: "right" }}>
                                <Typography variant="caption">TO</Typography>
                                <Typography variant="subtitle1">
                                    {flight.destination}
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 1,
                            }}
                        >
                            <Box>
                                <Typography variant="caption">DATE</Typography>
                                <Typography variant="body2">{flightDate}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption">TIME</Typography>
                                <Typography variant="body2">{flightTime}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption">SEAT</Typography>
                                <Typography variant="body2">
                                    {selectedSeats[0]?.seatNumber}
                                </Typography>
                            </Box>
                        </Box>
                        <Divider sx={{ bgcolor: "white", mb: 1 }} />
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                            Passenger: {passengers[0]?.firstName} {passengers[0]?.lastName}
                        </Typography>
                        <Typography variant="body2">
                            Reservation Code: {reservationCode}
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={downloadTicketPdf}>Download Ticket</Button>
                    <Button onClick={handleCloseConfirmation}>Go to Reservations</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CheckoutPage;