import React, { useState, useEffect } from "react";
import { Container, Grid, Button, Typography, Box, MenuItem, Select } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import seat1 from '../assets/seat1.png';
import seat2 from '../assets/seat2.png';
import seat3 from '../assets/seat3.png';

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
        navigate("/PersonalInfo", { state: { selectedSeats } });
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
        <Box sx={{ backgroundSize: "cover", backgroundPosition: "center", minHeight: "100vh", padding: 0, overflow: "hidden", position: "relative" }}>
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={8}>
                        <Box sx={{ backgroundColor: "white", borderRadius: 4, padding: 3, boxShadow: 2 }}>
                            <Typography variant="h5" gutterBottom sx={{ textAlign: "center", mb: 3 }}>
                                Select Your Seat for {flight.origin} → {flight.destination}
                            </Typography>
                            <Select
                                value={passengerCount}
                                onChange={(e) => setPassengerCount(e.target.value)}
                                sx={{ mb: 2, width: "100%" }}
                            >
                                {[...Array(5).keys()].map((num) => (
                                    <MenuItem key={num + 1} value={num + 1}>
                                        {num + 1} Passenger{num > 0 ? "s" : ""}
                                    </MenuItem>
                                ))}
                            </Select>
                            <Grid container spacing={1} justifyContent="center">
                                {rowLabels.map((rowLabel) => (
                                    <Grid container item key={rowLabel} spacing={2} justifyContent="center">
                                        {columnLabels.map((colLabel) => {
                                            const seatLabel = `${rowLabel}${colLabel}`;
                                            const isBooked = bookedSeats.includes(seatLabel);
                                            const isSelected = selectedSeats.some((s) => s.seatNumber === seatLabel);
                                            let seatImage = seat1;
                                            if (isBooked) seatImage = seat3;
                                            else if (isSelected) seatImage = seat2;
                                            return (
                                                <Grid item key={seatLabel}>
                                                    <Button
                                                        onClick={() => handleSeatClick(seatLabel)}
                                                        disabled={isBooked}
                                                        sx={{
                                                            minWidth: 50,
                                                            minHeight: 50,
                                                            padding: 0,
                                                            background: "transparent",
                                                            "&:hover": { background: "transparent" }
                                                        }}
                                                    >
                                                        <img src={seatImage} alt={`Seat ${seatLabel}`} width="40" />
                                                    </Button>
                                                </Grid>
                                            );
                                        })}
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box sx={{ backgroundColor: "white", borderRadius: 4, padding: 3, boxShadow: 2 }}>
                            <Typography variant="h6" gutterBottom>Selected Seats:</Typography>
                            {selectedSeats.length > 0 ? (
                                selectedSeats.map((seat) => (
                                    <Typography key={seat.seatNumber}>
                                        {seat.seatNumber} - {seat.seatNumber.startsWith("1") ? "Business " : "Economy "}
                                    </Typography>
                                ))
                            ) : (
                                <Typography>No seat selected</Typography>
                            )}
                            <Typography variant="h6" sx={{ mt: 3 }}>Total Cost:</Typography>
                            <Typography variant="h5" sx={{ fontWeight: "bold" }}>£{calculateTotalCost()}</Typography>
                            <Button
                                variant="contained"
                                onClick={confirmSelection}
                                disabled={selectedSeats.length === 0}
                                fullWidth
                                sx={{ mt: 2 }}
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
                <Typography variant="subtitle1" sx={{ color: "black", fontWeight: "bold" }}>
                    Booking Time Out In: {formatTime()}
                </Typography>
            </Box>
        </Box>
    );
};

export default SeatSelectionPage;