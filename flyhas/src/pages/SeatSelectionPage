import React, { useState, useEffect } from "react";
import {
    Container, Grid, Button, Typography, Box, MenuItem, Select
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import seat1 from '../assets/seat1.png';
import seat2 from '../assets/seat2.png';
import seat3 from '../assets/seat3.png';

const SeatSelectionPage = () => {
    const rows = 6;
    const cols = 6;
    const rowLabels = ["1", "2", "3", "4", "5", "6"];
    const columnLabels = ["A", "B", "C", "D", "E", "F"];
    const bookedSeats = ["1A", "1B"];

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [confirmedSeats, setConfirmedSeats] = useState([]);
    const [timeLeft, setTimeLeft] = useState(600);
    const [passengerCount, setPassengerCount] = useState(1);
    const navigate = useNavigate();

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

        if (selectedSeats.includes(seatLabel)) {
            setSelectedSeats(selectedSeats.filter((s) => s !== seatLabel));
        } else if (selectedSeats.length < passengerCount) {
            setSelectedSeats([...selectedSeats, seatLabel]);
        }
    };

    const confirmSelection = () => {
        setConfirmedSeats([...selectedSeats]);
        navigate("/PersonalInfo");
    };

    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const calculateTotalCost = () => {
        const flightCost = 65;
        const businessSeatCost = 25;
        const economySeatCost = 11;

        const businessSeats = selectedSeats.filter((s) => s.startsWith("1"));
        const economySeats = selectedSeats.filter((s) => !s.startsWith("1"));

        return flightCost + businessSeats.length * businessSeatCost + economySeats.length * economySeatCost;
    };

    return (
        <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", py: 4 }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <Box sx={{ backgroundColor: "white", borderRadius: 4, border: 1, borderColor: "gray", p: 3 }}>
                            <Typography variant="h5" align="center" gutterBottom>
                                Select Your Seat
                            </Typography>

                            <Select
                                value={passengerCount}
                                onChange={(e) => setPassengerCount(e.target.value)}
                                sx={{ mb: 2, width: "100%" }}
                            >
                                {[...Array(5)].map((_, i) => (
                                    <MenuItem key={i + 1} value={i + 1}>
                                        {i + 1} Passenger{i > 0 ? "s" : ""}
                                    </MenuItem>
                                ))}
                            </Select>

                            <Grid container spacing={1} justifyContent="center">
                                {rowLabels.map((row, rowIdx) => (
                                    <Grid container item key={row} spacing={2} alignItems="center" justifyContent="center">
                                        <Grid item>
                                            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                                {row}
                                            </Typography>
                                        </Grid>
                                        {[...Array(cols)].map((_, colIdx) => {
                                            const seatLabel = `${row}${columnLabels[colIdx]}`;
                                            const isBooked = bookedSeats.includes(seatLabel);
                                            const isSelected = selectedSeats.includes(seatLabel);

                                            const seatImage = isBooked
                                                ? seat3
                                                : isSelected
                                                    ? seat2
                                                    : seat1;

                                            return (
                                                <Grid item key={seatLabel}>
                                                    <Button
                                                        onClick={() => handleSeatClick(seatLabel)}
                                                        disabled={isBooked}
                                                        sx={{
                                                            minWidth: 50,
                                                            minHeight: 50,
                                                            p: 0,
                                                            background: "transparent",
                                                            "&:hover": { background: "transparent" },
                                                        }}
                                                    >
                                                        <img src={seatImage} alt={seatLabel} width="40" />
                                                    </Button>
                                                </Grid>
                                            );
                                        })}
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Box sx={{ backgroundColor: "white", borderRadius: 4, border: 1, borderColor: "gray", p: 3 }}>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                                    IGGY POP
                                </Typography>
                                <Typography>📍 Istanbul → London LHR</Typography>
                                <Typography>📅 25th April 2025</Typography>
                            </Box>

                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Flight Cost: £65
                            </Typography>

                            <Box>
                                <Typography variant="h6">Selected Seats:</Typography>
                                {selectedSeats.length ? (
                                    selectedSeats.map((seat) => (
                                        <Typography key={seat}>
                                            {seat} - {seat.startsWith("1") ? "Business (£25)" : "Economy (£11)"}
                                        </Typography>
                                    ))
                                ) : (
                                    <Typography>None</Typography>
                                )}
                            </Box>

                            <Box mt={2}>
                                <Typography variant="h6">Total Cost:</Typography>
                                <Typography variant="h5" fontWeight="bold">
                                    £{calculateTotalCost()}
                                </Typography>
                            </Box>

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={confirmSelection}
                                disabled={!selectedSeats.length}
                                fullWidth
                                sx={{ mt: 3 }}
                            >
                                Confirm Seat Selection
                            </Button>

                            <Box mt={3}>
                                <Typography variant="h6">Confirmed Seats:</Typography>
                                <Typography>{confirmedSeats.length ? confirmedSeats.join(", ") : "None"}</Typography>
                            </Box>
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
                    px: 3,
                    py: 1,
                    boxShadow: 3,
                    zIndex: 1000,
                }}
            >
                <Typography fontWeight="bold" color="black">
                    Booking Time Out In: {formatTime()}
                </Typography>
            </Box>
        </Box>
    );
};

export default SeatSelectionPage;
