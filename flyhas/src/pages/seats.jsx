import React, { useState, useEffect } from "react";
import { Container, Grid, Button, Typography, Box } from "@mui/material";

const SeatSelectionPage = () => {
    const rows = 6;
    const cols = 3;
    const totalSeats = rows * cols * 2;
    const bookedSeats = [3, 4, 11];
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [timeLeft, setTimeLeft] = useState(600);
    const [timerRunning, setTimerRunning] = useState(true);

    useEffect(() => {
        if (!timerRunning) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setSelectedSeats([]);
                    setTimerRunning(false);
                    return 600;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [timerRunning]);

    const handleSeatClick = (seatNumber) => {
        if (bookedSeats.includes(seatNumber)) return;
        setSelectedSeats((prev) =>
            prev.includes(seatNumber)
                ? prev.filter((seat) => seat !== seatNumber)
                : [...prev, seatNumber]
        );
    };

    const restartTimer = () => {
        setSelectedSeats([]);
        setTimeLeft(600);
        setTimerRunning(true);
    };

    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <Container
            maxWidth="md"
            sx={{
                textAlign: "center",
                mt: 5,
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                zIndex: 2,
            }}
        >
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url('https://ba.scene7.com/is/image/ba/boeing-787-10-flying-side-angle:4-3?ts=1740805398027&dpr=off')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.3,
                    zIndex: -1,
                }}
            />

            <Typography
                variant="h2"
                sx={{
                    
                    fontFamily: "Verdana, sans-serif",
                    fontWeight: "bold",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                }}
            >
                <span style={{ color: "black" }}>Fly</span>
                <span style={{ color: "#40B5AD" }}>Has</span>
            </Typography>

            <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                Kindly Select Your Seat
            </Typography>

            <Grid container spacing={1} justifyContent="center">
                {[...Array(rows)].map((_, row) => (
                    <Grid container item key={row} spacing={2} justifyContent="center">
                        {[...Array(cols)].map((_, col) => {
                            const seatNumber = row * cols * 2 + col + 1;
                            return (
                                <Grid item key={seatNumber}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            width: 50,
                                            height: 50,
                                            backgroundColor: bookedSeats.includes(seatNumber)
                                                ? "#A9A9A9"
                                                : selectedSeats.includes(seatNumber)
                                                ? "#AF69ED"
                                                : "#6495ED",
                                            "&:hover": {
                                                backgroundColor: bookedSeats.includes(seatNumber)
                                                    ? "#A9A9A9"
                                                    : selectedSeats.includes(seatNumber)
                                                    ? "#AF69ED"
                                                    : "#62B1E8",
                                            },
                                        }}
                                        onClick={() => handleSeatClick(seatNumber)}
                                        disabled={bookedSeats.includes(seatNumber)}
                                    >
                                        {seatNumber}
                                    </Button>
                                </Grid>
                            );
                        })}

                        <Grid item sx={{ width: 30 }}></Grid>

                        {[...Array(cols)].map((_, col) => {
                            const seatNumber = row * cols * 2 + col + cols + 1;
                            return (
                                <Grid item key={seatNumber}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            width: 50,
                                            height: 50,
                                            backgroundColor: bookedSeats.includes(seatNumber)
                                                ? "#A9A9A9"
                                                : selectedSeats.includes(seatNumber)
                                                ? "#AF69ED"
                                                : "#6495ED",
                                            "&:hover": {
                                                backgroundColor: bookedSeats.includes(seatNumber)
                                                    ? "#A9A9A9"
                                                    : selectedSeats.includes(seatNumber)
                                                    ? "#AF69ED"
                                                    : "#62B1E8",
                                            },
                                        }}
                                        onClick={() => handleSeatClick(seatNumber)}
                                        disabled={bookedSeats.includes(seatNumber)}
                                    >
                                        {seatNumber}
                                    </Button>
                                </Grid>
                            );
                        })}
                    </Grid>
                ))}
            </Grid>

            <Box mt={3}>
                <Typography variant="h6">Selected Seats:</Typography>
                <Typography>
                    {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
                </Typography>
            </Box>

            <Box mt={2}>
                <Typography variant="h6" sx={{ color: "black", fontWeight: "bold" }}>
                    Booking Time Out In: {formatTime()}
                </Typography>
                {!timerRunning && (
                    <Button variant="contained" onClick={restartTimer} sx={{ mt: 2 }}>
                        Please Restart Selection
                    </Button>
                )}
            </Box>
        </Container>
    );
};

export default SeatSelectionPage;
