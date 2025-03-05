import React, { useState, useEffect } from "react";
import {
    Container, Grid, Typography, Box,Dialog,DialogTitle,DialogContent,DialogActions,CircularProgress,IconButton,InputAdornment,TextField,Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const CheckoutPage = () => {
    const selectedSeats = ["1A", "1B"];
    const passengerInfo = [
        {
            seat: "2A",
            name: "iggy pop",
            email: "iggypop@yahoo.com",
            passport: "123456",
        },
        {
            seat: "3B",
            name: "moneypenny",
            email: "moneypenny@yahoo.com",
            passport: "78910",
        },
    ];

    const reservationNumber = "ISTLDN25";

    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });

    const [showCvv, setShowCvv] = useState(false);
    const [showBack, setShowBack] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCardDetails({ ...cardDetails, [name]: value });
    };

    useEffect(() => {
        if (cardDetails.cvv.length === 3) {
            const timeout = setTimeout(() => {
                handleConfirmPayment();
            }, 1000); 
            return () => clearTimeout(timeout);
        }
    }, [cardDetails.cvv]);

    const handleConfirmPayment = () => {
        if (cardDetails.cardNumber && cardDetails.expiryDate && cardDetails.cvv) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setOpenConfirmation(true);
            }, 2000);
        }
    };

    const handleCloseConfirmation = () => {
        setOpenConfirmation(false);
    };

    const flightCost = 65;
    const economySeatCost = 11;
    const businessSeatCost = 25;

    const calculateTotalCost = () => {
        const businessSeats = selectedSeats.filter((seat) => seat.startsWith("1"));
        const economySeats = selectedSeats.filter((seat) => !seat.startsWith("1"));
        return (
            flightCost +
            businessSeats.length * businessSeatCost +
            economySeats.length * economySeatCost
        );
    };

    return (
        <Box
            sx={{
                backgroundImage: `url(https://wallsneedlove.com/cdn/shop/products/w0518_1s_art-deco-arches-wallpaper-for-walls-all-that-jazz_Repeating-Pattern-Sample-1.jpg?v=1734717276)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                padding: 0,
                overflow: "hidden",
                position: "relative",
            }}
        >
            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, mt: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={8}>
                        <Box
                            sx={{
                                backgroundColor: "rgba(255, 255, 255, 1)",
                                borderRadius: 4,
                                padding: 3,
                            }}
                        >
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
                                Reservation Summary
                            </Typography>

                            <Typography variant="h6" sx={{ mb: 3 }}>
                                Flight: <strong>Istanbul - London LHR</strong>
                            </Typography>

                            <Typography variant="h6" sx={{ mb: 3 }}>
                                Reservation Number: <strong>{reservationNumber}</strong>
                            </Typography>

                            {passengerInfo.map((passenger, index) => (
                                <Box key={index} sx={{ mb: 4 }}>
                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                        Seat: {passenger.seat}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Name:</strong> {passenger.name}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Email:</strong> {passenger.email}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Passport:</strong> {passenger.passport}
                                    </Typography>
                                </Box>
                            ))}

                            <Typography variant="h6" sx={{ mt: 3 }}>
                                Booking Cost:
                            </Typography>
                            <Box sx={{ ml: 2 }}>
                                <Typography variant="body1">
                                    Flight Cost: <strong>£{flightCost}</strong>
                                </Typography>
                                {selectedSeats.map((seat) => (
                                    <Typography key={seat} variant="body1">
                                        Seat {seat}:{" "}
                                        <strong>
                                            £{seat.startsWith("1") ? businessSeatCost : economySeatCost}
                                        </strong>
                                    </Typography>
                                ))}
                                <Typography variant="body1" sx={{ mt: 1 }}>
                                    Total Cost: <strong>£{calculateTotalCost()}</strong>
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={4}>
                        <Box
                            sx={{
                                perspective: "1000px",
                                marginLeft: "auto", 
                                width: "90%", 
                            }}
                        >
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
                                <Box
                                    sx={{
                                        position: "absolute",
                                        width: "100%",
                                        height: "100%",
                                        backfaceVisibility: "hidden",
                                        backgroundColor: "white",
                                        borderRadius: "8px",
                                        padding: "16px",
                                        color: "black",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography variant="h6">Card Number</Typography>
                                    <TextField
                                        fullWidth
                                        name="cardNumber"
                                        value={cardDetails.cardNumber}
                                        onChange={handleInputChange}
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Expiry Date (MM/YY)"
                                        name="expiryDate"
                                        value={cardDetails.expiryDate}
                                        onChange={handleInputChange}
                                        sx={{ mb: 2, display: showBack ? "none" : "block" }} 
                                    />
                                    <Button
                                        variant="contained"
                                        onClick={() => setShowBack(true)}
                                    >
                                        Enter CVV
                                    </Button>
                                </Box>

                                <Box
                                    sx={{
                                        position: "absolute",
                                        width: "100%",
                                        height: "100%",
                                        backfaceVisibility: "hidden",
                                        backgroundColor: "white",
                                        borderRadius: "8px",
                                        padding: "16px",
                                        color: "black",
                                        transform: "rotateY(180deg)",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography variant="h6">CVV</Typography>
                                    <TextField
                                        fullWidth
                                        name="cvv"
                                        type={showCvv ? "text" : "password"}
                                        value={cardDetails.cvv}
                                        onChange={handleInputChange}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowCvv(!showCvv)}
                                                        edge="end"
                                                    >
                                                        {showCvv ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        onClick={() => setShowBack(false)}
                                    >
                                        Back to Front
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
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 3,
                    }}
                >
                    <CircularProgress size={60} />
                </Box>
            )}

            <Dialog open={openConfirmation} onClose={handleCloseConfirmation}>
                <DialogTitle>Booking Confirmed</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Enjoy the flight!
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        <strong>Reservation Number:</strong> {reservationNumber}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        <strong>Flight:</strong> Istanbul - London LHR
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        <strong>Date:</strong> 25th April 2025
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        <strong>Total Cost:</strong> £{calculateTotalCost()}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmation} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CheckoutPage;
