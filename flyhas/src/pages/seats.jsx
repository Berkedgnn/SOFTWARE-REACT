import React, { useState, useEffect } from "react";
import { Container, Grid, Button, Typography, Box, MenuItem, Select } from "@mui/material";

const SeatSelectionPage = () => {
    const rows = 6;
    const cols = 3;
    const bookedSeats = ["1A", "1B", "5C"];
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [timeLeft, setTimeLeft] = useState(600);
    const [passengerCount, setPassengerCount] = useState(1);
    const [confirmedSeats, setConfirmedSeats] = useState([]);

    const rowLabels = ["1", "2", "3", "4", "5", "6"];
    const columnLabels = ["A", "B", "C", "D", "E", "F"];

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
            setSelectedSeats(selectedSeats.filter((seat) => seat !== seatLabel));
        } else if (selectedSeats.length < passengerCount) {
            setSelectedSeats([...selectedSeats, seatLabel]);
        }
    };

    const confirmSelection = () => {
        setConfirmedSeats([...selectedSeats]);
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
        const businessSeats = selectedSeats.filter((seat) => seat.startsWith("1"));
        const economySeats = selectedSeats.filter((seat) => !seat.startsWith("1"));
        return flightCost + businessSeats.length * businessSeatCost + economySeats.length * economySeatCost;
    };

    return (
        <Box
            sx={{
                backgroundImage: `url(https://sapa-tourism.com/wp-content/uploads/2023/12/z4962448732308_a9cee1ba14eb157b7882834e4019fdc1.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                padding: 0,
                overflow: "hidden",
                position: "relative",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backdropFilter: "blur(4px)",
                    zIndex: 0,
                },
            }}
        >
            {/* blurred top bar */}
            <Box
                sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                    padding: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
                }}
            >
                {/* flyhas logo */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                        component="img"
                        src="/flyhas.png"
                        alt="FlyHas Logo"
                        sx={{ height: 60, width: "auto" }}
                    />
                    <Typography
                        variant="h5"
                        sx={{
                            fontFamily: "Helvetica, sans-serif",
                            fontWeight: "bold",
                            color: "#245d67",
                        }}
                    >
                        Seat Selection
                    </Typography>
                </Box>

                {/* time out */}
                <Typography variant="subtitle1" sx={{ color: "black", fontWeight: "bold" }}>
                    Booking Time Out In: {formatTime()}
                </Typography>
            </Box>

            {/* seats */}
            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, mt: 4 }}>
                <Grid container spacing={4}>
                    {/* seat grid */}
                    <Grid item xs={8}>
                        <Box
                            sx={{
                                backgroundColor: "rgba(255, 255, 255, 0.7)",
                                backdropFilter: "blur(10px)",
                                borderRadius: 4,
                                padding: 3,
                            }}
                        >
                            <Typography variant="h5" gutterBottom sx={{ textAlign: "center", mb: 3 }}>
                                Select Your Seat
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
                                {rowLabels.map((rowLabel, row) => (
                                    <Grid container item key={row} spacing={3} justifyContent="center" alignItems="center">
                                        {/* rows */}
                                        <Grid item sx={{ width: 30, textAlign: "center" }}>
                                            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                                {rowLabel}
                                            </Typography>
                                        </Grid>

                                        {/* left */}
                                        {[...Array(cols)].map((_, col) => {
                                            const seatLabel = `${rowLabel}${columnLabels[col]}`;
                                            const isBooked = bookedSeats.includes(seatLabel);
                                            const isSelected = selectedSeats.includes(seatLabel);

                                            let seatImage;
                                            if (isBooked) {
                                                seatImage = "/seat3.png"; 
                                            } else if (isSelected) {
                                                seatImage = row === 0 ? "/bseat2.png" : "/seat2.png"; 
                                            } else {
                                                seatImage = row === 0 ? "/bseat1.png" : "/seat1.png"; 
                                            }

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
                                                            "&:hover": { background: "transparent" },
                                                        }}
                                                    >
                                                        <img src={seatImage} alt={`Seat ${seatLabel}`} width="40" />
                                                    </Button>
                                                </Grid>
                                            );
                                        })}

                                        {/* spcae */}
                                        <Grid item sx={{ width: 30 }}></Grid>

                                        {/* right seats */}
                                        {[...Array(cols)].map((_, col) => {
                                            const seatLabel = `${rowLabel}${columnLabels[col + 3]}`;
                                            const isBooked = bookedSeats.includes(seatLabel);
                                            const isSelected = selectedSeats.includes(seatLabel);

                                            let seatImage;
                                            if (isBooked) {
                                                seatImage = "/seat3.png"; 
                                            } else if (isSelected) {
                                                seatImage = row === 0 ? "/bseat2.png" : "/seat2.png"; 
                                            } else {
                                                seatImage = row === 0 ? "/bseat1.png" : "/seat1.png"; 
                                            }

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
                                                            "&:hover": { background: "transparent" },
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

                    {/* blurred side bar */}
                    <Grid item xs={4}>
                        <Box
                            sx={{
                                backgroundColor: "rgba(255, 255, 255, 0.7)",
                                backdropFilter: "blur(10px)",
                                borderRadius: 4,
                                padding: 3,
                            }}
                        >
                            {/* passenger  */}
                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                <Box
                                    component="img"
                                    src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                                    alt="User Icon"
                                    sx={{ height: 40, width: 40, mr: 2 }}
                                />
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                                        IGGY POP
                                    </Typography>
                                    <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                        <span>Istanbul - London LHR</span>
                                    </Typography>
                                    <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                        📅 25th April 2025
                                    </Typography>
                                </Box>
                            </Box>

                            {/* flight */}
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Flight Cost: £65
                            </Typography>

                            {/* selection */}
                            <Box mt={3}>
                                <Typography variant="h6">Selected Seats:</Typography>
                                {selectedSeats.map((seat) => (
                                    <Typography key={seat}>
                                        {seat} - {seat.startsWith("1") ? "Business Class (£25)" : "Economy (£11)"}
                                    </Typography>
                                ))}
                                {selectedSeats.length === 0 && <Typography>None</Typography>}
                            </Box>

                            {/* cost */}
                            <Box mt={3}>
                                <Typography variant="h6">Total Cost:</Typography>
                                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                    £{calculateTotalCost()}
                                </Typography>
                            </Box>

                            {/* button */}
                            <Box mt={2}>
                                <Button
                                    variant="contained"
                                    onClick={confirmSelection}
                                    disabled={selectedSeats.length === 0}
                                    fullWidth
                                >
                                    Confirm Seat Selection
                                </Button>
                            </Box>

                            {/* confimed seats */}
                            <Box mt={3}>
                                <Typography variant="h6">Confirmed Seats:</Typography>
                                <Typography>{confirmedSeats.length > 0 ? confirmedSeats.join(", ") : "None"}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default SeatSelectionPage;