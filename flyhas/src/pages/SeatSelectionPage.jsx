import React, { useState, useEffect } from "react";
import {
    Container,
    Grid,
    Button,
    Typography,
    Box,
    MenuItem,
    Select,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import seat1 from "../assets/seat1.png";
import seat2 from "../assets/seat2.png";
import seat3 from "../assets/seat3.png";

const SeatSelectionPage = () => {
    const { flightId } = useParams();
    const navigate = useNavigate();

    const [flight, setFlight] = useState(null);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [availableSeats, setAvailableSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [passengerCount, setPassengerCount] = useState(1);
    const [timeLeft, setTimeLeft] = useState(600);

    const rowLabels = ["1", "2", "3", "4", "5", "6"];
    const columnLabels = ["A", "B", "C", "D", "E", "F"];

    useEffect(() => {
        const fetchFlight = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/flights/${flightId}`);
                setFlight(response.data);

                if (response.data.seats) {
                    const reserved = response.data.seats
                        .filter((seat) => seat.reserved)
                        .map((seat) => seat.seatNumber);
                    setBookedSeats(reserved);
                    setAvailableSeats(response.data.seats);
                }
            } catch (error) {
                console.error("Error fetching flight data:", error);
            }
        };
        fetchFlight();
    }, [flightId]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setSelectedSeats([]);
                    return 600;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        setSelectedSeats([]);
    }, [passengerCount]);

    const handleSeatClick = (seatLabel) => {
        if (bookedSeats.includes(seatLabel)) return;
        const seatObj = availableSeats.find((s) => s.seatNumber === seatLabel);
        if (!seatObj) return;
        const alreadySelected = selectedSeats.find((s) => s.seatNumber === seatLabel);
        if (alreadySelected) {
            setSelectedSeats(selectedSeats.filter((s) => s.seatNumber !== seatLabel));
        } else if (selectedSeats.length < passengerCount) {
            setSelectedSeats([...selectedSeats, seatObj]);
        }
    };

    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const flightCost = 65;
    const economySeatCost = 11;
    const businessSeatCost = 25;

    const calculateTotalCost = () => {
        const businessSeats = selectedSeats.filter((seat) => seat.seatNumber.startsWith("1"));
        const economySeats = selectedSeats.filter((seat) => !seat.seatNumber.startsWith("1"));
        return flightCost + businessSeats.length * businessSeatCost + economySeats.length * economySeatCost;
    };

    const confirmSelection = () => {
        navigate("/PersonalInfo", {
            state: {
                flight,
                selectedSeats,
            },
        });
    };

    if (!flight) {
        return (
            <Container>
                <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                    Loading flight...
                </Typography>
            </Container>
        );
    }

    return (
        <Box sx={{ py: 4 }}>
            <Container maxWidth="xl">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <Box sx={{ p: 3, bgcolor: "white", borderRadius: 3, boxShadow: 2 }}>
                            <Typography variant="h5" align="center" gutterBottom>
                                Select Your Seat for {flight.origin} → {flight.destination}
                            </Typography>
                            <Select
                                value={passengerCount}
                                onChange={(e) => setPassengerCount(e.target.value)}
                                fullWidth
                                sx={{ mb: 2 }}
                            >
                                {[...Array(5).keys()].map((num) => (
                                    <MenuItem key={num + 1} value={num + 1}>
                                        {num + 1} Passenger{num > 0 ? "s" : ""}
                                    </MenuItem>
                                ))}
                            </Select>

                            <Box sx={{ width: "100%", overflowX: "auto" }}>
                                <Box sx={{ display: "inline-block", minWidth: "100%" }}>
                                    <Grid container justifyContent="center" spacing={1} alignItems="center" wrap="nowrap" sx={{ mb: 1 }}>
                                        <Grid item sx={{ width: 50 }} />
                                        {columnLabels.map((label, idx) => (
                                            <React.Fragment key={`header-${label}`}>
                                                {idx === 3 && <Box sx={{ width: 20 }} />}
                                                <Box
                                                    sx={{
                                                        width: { xs: 36, sm: 44, md: 52 },
                                                        textAlign: "center",
                                                        mt: 1.5,
                                                    }}
                                                >
                                                    <Typography
                                                        variant="body2"
                                                        fontWeight="bold"
                                                        sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.875rem" } }}
                                                    >
                                                        {label}
                                                    </Typography>
                                                </Box>
                                            </React.Fragment>
                                        ))}
                                    </Grid>

                                    {rowLabels.map((rowLabel) => (
                                        <Grid
                                            container
                                            key={rowLabel}
                                            justifyContent="center"
                                            alignItems="center"
                                            wrap="nowrap"
                                            sx={{ mt: 1 }}
                                        >
                                            <Box sx={{ width: 50, textAlign: "center" }}>
                                                <Typography variant="body2" fontWeight="bold">
                                                    {rowLabel}
                                                </Typography>
                                            </Box>

                                            {columnLabels.map((colLabel, idx) => {
                                                const seatLabel = `${rowLabel}${colLabel}`;
                                                const isBooked = bookedSeats.includes(seatLabel);
                                                const isSelected = selectedSeats.some((s) => s.seatNumber === seatLabel);
                                                let seatImage = seat1;
                                                if (isBooked) seatImage = seat3;
                                                else if (isSelected) seatImage = seat2;

                                                return (
                                                    <React.Fragment key={seatLabel}>
                                                        {idx === 3 && (
                                                            <Box
                                                                sx={{
                                                                    width: 20,
                                                                    height: 55,
                                                                    borderLeft: "2px solid gray",
                                                                    borderRight: "2px solid gray",
                                                                    mx: 0.5,
                                                                }}
                                                            />
                                                        )}
                                                        <Box
                                                            sx={{
                                                                width: { xs: 36, sm: 44, md: 52 },
                                                                height: { xs: 42, sm: 48, md: 55 },
                                                                textAlign: "center",
                                                                flexShrink: 0,
                                                            }}
                                                        >
                                                            <Button
                                                                onClick={() => handleSeatClick(seatLabel)}
                                                                disabled={isBooked}
                                                                sx={{
                                                                    minWidth: 36,
                                                                    minHeight: 36,
                                                                    padding: 0,
                                                                    background: "transparent",
                                                                }}
                                                            >
                                                                <img
                                                                    src={seatImage}
                                                                    alt={`Seat ${seatLabel}`}
                                                                    style={{ width: "100%", maxWidth: 36 }}
                                                                />
                                                            </Button>
                                                        </Box>
                                                    </React.Fragment>
                                                );
                                            })}
                                        </Grid>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Box sx={{ p: 3, bgcolor: "white", borderRadius: 3, boxShadow: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Selected Seats:
                            </Typography>
                            {selectedSeats.length > 0 ? (
                                selectedSeats.map((seat) => (
                                    <Typography key={seat.seatNumber}>
                                        {seat.seatNumber} - {seat.seatNumber.startsWith("1") ? "Business" : "Economy"}
                                    </Typography>
                                ))
                            ) : (
                                <Typography>No seat selected</Typography>
                            )}

                            <Typography variant="h6" sx={{ mt: 3 }}>
                                Total Cost:
                            </Typography>
                            <Typography variant="h5" fontWeight="bold">
                                £{calculateTotalCost()}
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={confirmSelection}
                                fullWidth
                                sx={{ mt: 2 }}
                                disabled={selectedSeats.length === 0}
                            >
                                Confirm Seat Selection
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            <Box
                sx={{
                    position: "fixed",
                    bottom: 16,
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "white",
                    borderRadius: 2,
                    padding: 2,
                    zIndex: 2,
                    boxShadow: 3,
                }}
            >
                <Typography variant="subtitle1" fontWeight="bold" color="black">
                    Booking Time Out In: {formatTime()}
                </Typography>
            </Box>
        </Box>
    );
};

export default SeatSelectionPage;