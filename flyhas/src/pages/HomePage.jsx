import React, { useEffect, useState, useRef } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import {
    TextField,
    Button,
    MenuItem,
    ToggleButton,
    ToggleButtonGroup,
    Box,
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Snackbar,
    Alert,
    Slide,
    IconButton
} from "@mui/material";
import {
    FlightTakeoff,
    Person,
    ConfirmationNumber,
    Close,
    AirplaneTicket,
    Email
} from "@mui/icons-material";
import {
    MdOutlineChair,
    MdLuggage,
    MdOutlineSportsTennis,
    MdAirlineSeatReclineExtra
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const PANEL_WIDTH = 320;
const BOTTOM_OFFSET = 24;

const HomePage = () => {

    const [tripType, setTripType] = useState("oneway");
    const [departureDate, setDepartureDate] = useState(dayjs());
    const [passengers, setPassengers] = useState(1);
    const [cityList, setCityList] = useState([]);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [flashTo, setFlashTo] = useState(false);


    const [destCities, setDestCities] = useState([]);


    const [checkinOpen, setCheckinOpen] = useState(false);
    const [checkinCode, setCheckinCode] = useState("");
    const [checkinLastName, setCheckinLastName] = useState("");
    const [checkinError, setCheckinError] = useState("");
    const [checkinSuccess, setCheckinSuccess] = useState(false);

    const navigate = useNavigate();
    const searchRef = useRef(null);

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/cities")
            .then(res => {
                const allCities = res.data;
                setCityList(allCities);
                setDestCities(allCities.slice(-4));
                if (allCities.length >= 2) {
                    setFrom(allCities[0].name);
                    setTo(allCities[1].name);
                }
            })
            .catch(err => console.error("Failed to load cities:", err));
    }, []);

    const handleTripTypeChange = (_, newType) => {
        setTripType(newType);
    };

    const handleSearch = () => {
        navigate("/FlightList", {
            state: { from, to, date: departureDate.format("YYYY-MM-DD"), passengers }
        });
    };

    const openCheckin = () => {
        setCheckinError("");
        setCheckinCode("");
        setCheckinLastName("");
        setCheckinOpen(true);
    };
    const closeCheckin = () => {
        setCheckinOpen(false);
    };

    const handleCheckinSubmit = async () => {
        setCheckinError("");
        try {
            const { data: reservation } = await axios.post(
                "http://localhost:8080/api/reservations/checkin/validate",
                { reservationCode: checkinCode, lastName: checkinLastName }
            );
            if (reservation.checkedIn) {
                setCheckinError("This reservation is already checked in.");
                return;
            }
            await axios.patch(
                `http://localhost:8080/api/reservations/checkin/${reservation.id}`
            );
            setCheckinSuccess(true);
            closeCheckin();
        } catch {
            setCheckinError("Invalid reservation code or last name.");
        }
    };

    const handleBookCity = cityName => {
        setTo(cityName);

        searchRef.current?.scrollIntoView({ behavior: "smooth" });

        setFlashTo(true);
        setTimeout(() => setFlashTo(false), 2000);
    };

    return (
        <Box sx={{ backgroundColor: "white", minHeight: "100vh", p: 2, m: "-16px" }}>
            <div className="bg-blue-50 min-h-screen">
                <Container maxWidth="md" className="pt-8" ref={searchRef}>

                    <Carousel autoPlay infiniteLoop showThumbs={false} className="mb-6 max-w-3xl mx-auto">
                        <div><img src="images/slider1.png" alt="Slide 1" /></div>
                        <div><img src="images/slider2.png" alt="Slide 2" /></div>
                        <div><img src="images/slider3.png" alt="Slide 3" /></div>
                    </Carousel>

                    <Box sx={{ width: "100%", my: 2 }}>
                        <hr style={{ border: "1px solid #ddd", width: "100%" }} />
                    </Box>

                    {/* Search Form */}
                    <Box className="bg-white rounded-2xl shadow-md p-6 max-w-3xl mx-auto mb-12">
                        <ToggleButtonGroup
                            value={tripType}
                            exclusive
                            onChange={handleTripTypeChange}
                            fullWidth
                            className="mb-4"
                        >
                            <ToggleButton value="oneway">One Way</ToggleButton>
                            <ToggleButton value="round" disabled>Round Trip</ToggleButton>
                        </ToggleButtonGroup>

                        <Box sx={{ width: "100%", my: 2 }}>
                            <hr style={{ border: "1px solid #ddd", width: "100%" }} />
                        </Box>

                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="From"
                                    value={from}
                                    onChange={e => setFrom(e.target.value)}
                                >
                                    {cityList.map(city => (
                                        <MenuItem key={city.id} value={city.name}>
                                            {city.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="To"
                                    value={to}
                                    onChange={e => setTo(e.target.value)}
                                    sx={flashTo ? { backgroundColor: "rgba(173,216,230,0.5)" } : {}}
                                >
                                    {cityList.filter(c => c.name !== from).map(city => (
                                        <MenuItem key={city.id} value={city.name}>
                                            {city.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Departure Date"
                                        value={departureDate}
                                        onChange={setDepartureDate}
                                        minDate={dayjs()}
                                        renderInput={params => <TextField {...params} fullWidth />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Passengers"
                                    value={passengers}
                                    onChange={e => setPassengers(Number(e.target.value))}
                                    InputProps={{ startAdornment: <Person className="mr-2" /> }}
                                >
                                    {[...Array(10).keys()].map(i => (
                                        <MenuItem key={i + 1} value={i + 1}>
                                            {i + 1} Passenger
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} className="text-center" sx={{ mb: 8 }}>
                                <Button
                                    variant="contained"
                                    onClick={handleSearch}
                                    sx={{
                                        backgroundColor: "#003366",
                                        "&:hover": { backgroundColor: "#00264d" }
                                    }}
                                >
                                    Search Flight
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Flight Destinations */}
                    <div className="mb-12">
                        <Typography
                            variant="h4"
                            component="h2"
                            sx={{
                                color: "#1c3d5a",
                                fontWeight: "bold",
                                display: "flex",
                                alignItems: "center",
                                gap: 1
                            }}
                        >
                            <FlightTakeoff sx={{ fontSize: 36, color: "#1c3d5a" }} />
                            Flight Destinations
                        </Typography>
                        <Box component="hr" sx={{ borderColor: "#ddd", width: "100%", my: 4 }} />
                        <Grid container spacing={4} justifyContent="center">
                            {destCities.map(city => (
                                <Grid item xs={12} sm={6} md={3} key={city.id}>
                                    <Card className="rounded-2xl shadow-md">
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={
                                                city.imagePath
                                                    ? `http://localhost:8080${city.imagePath}`
                                                    : "/images/default-city.png"
                                            }
                                            alt={city.name}
                                            className="rounded-t-2xl"
                                        />
                                        <CardContent className="text-center">
                                            <Typography
                                                variant="h4"
                                                component="h3"
                                                sx={{
                                                    color: "#1c3d5a",
                                                    fontWeight: "bold",
                                                    fontSize: "1.5rem"
                                                }}
                                            >
                                                {city.name}
                                            </Typography>

                                            <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 1, mb: 0 }}>
                                                <Button
                                                    startIcon={<AirplaneTicket />}
                                                    variant="contained"
                                                    onClick={() => handleBookCity(city.name)}
                                                    sx={{
                                                        backgroundColor: "#ad1a1a",
                                                        color: "white",
                                                        "&:hover": { backgroundColor: "#00264d" }
                                                    }}
                                                >
                                                    Book
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </div>


                    <Box component="hr" sx={{ borderColor: "transparent", width: "100%", my: 4 }} />

                    {/* Additional Services */}
                    <Box className="bg-white rounded-2xl shadow-md p-6 max-w-5xl mx-auto mb-12">
                        <Typography
                            variant="h4"
                            component="h2"
                            sx={{
                                color: "#1c3d5a",
                                fontWeight: "bold",
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mb: 2
                            }}
                        >
                            <FlightTakeoff sx={{ fontSize: 36, color: "#1c3d5a" }} />
                            Additional Services
                        </Typography>
                        <Box component="hr" sx={{ borderColor: "#ddd", color: "#518234", width: "100%", my: 4 }} />
                        <Grid container spacing={2} justifyContent="center" >
                            {[
                                { name: "Seat Selection", icon: <MdOutlineChair size={40} /> },
                                { name: "Excess Baggage", icon: <MdLuggage size={40} /> },
                                { name: "Sports Equipment", icon: <MdOutlineSportsTennis size={40} /> },
                                { name: "CIP Lounge", icon: <MdAirlineSeatReclineExtra size={40} /> }
                            ].map((service, idx) => (
                                <Grid item xs={12} sm={6} md={3} key={idx} >
                                    <Card className="rounded-2xl shadow-md p-6 text-center" >
                                        <div className="text-5xl text-blue-600">{service.icon}</div>
                                        <Typography variant="h6" className="font-semibold mt-2">
                                            {service.name}
                                        </Typography>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    <Box component="hr" sx={{ borderColor: "transparent", width: "100%", my: 4 }} />
                </Container>
            </div>

            {!checkinOpen && (
                <Button
                    startIcon={<Email />}
                    variant="contained"
                    onClick={() => window.location.href = "mailto:support@flyhas.com"}
                    sx={{
                        position: "fixed",
                        bottom: BOTTOM_OFFSET + 56,
                        right: 0,
                        borderTopLeftRadius: 30,
                        borderBottomLeftRadius: 30,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        backgroundColor: "#ff9800",
                        "&:hover": { backgroundColor: "#fb8c00" },
                        p: "12px 16px",
                        minWidth: 120,
                        textTransform: "none"
                    }}
                >
                    Contact
                </Button>
            )}


            {!checkinOpen && (
                <Button
                    startIcon={<ConfirmationNumber />}
                    variant="contained"
                    onClick={openCheckin}
                    sx={{
                        position: "fixed",
                        bottom: BOTTOM_OFFSET,
                        right: 0,
                        borderTopLeftRadius: 30,
                        borderBottomLeftRadius: 30,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        backgroundColor: "#003366",
                        "&:hover": { backgroundColor: "#00264d" },
                        p: "12px 16px",
                        minWidth: 120,
                        textTransform: "none"
                    }}
                >
                    Check-in
                </Button>
            )}


            <Slide direction="left" in={checkinOpen} mountOnEnter unmountOnExit>
                <Box
                    sx={{
                        position: "fixed",
                        bottom: BOTTOM_OFFSET,
                        right: 0,
                        width: PANEL_WIDTH,
                        minHeight: 400,
                        backgroundColor: "white",
                        boxShadow: 3,
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 20,
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        transition: "right 0.3s ease-out"
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h6">Online Check-in</Typography>
                        <IconButton size="small" onClick={closeCheckin}>
                            <Close />
                        </IconButton>
                    </Box>

                    <Box sx={{ flexGrow: 1, mt: 1 }}>
                        <TextField
                            fullWidth
                            label="Reservation Code"
                            margin="dense"
                            value={checkinCode}
                            onChange={e => setCheckinCode(e.target.value)}
                            InputProps={{ startAdornment: <Box sx={{ pr: 1 }}>🎫</Box> }}
                        />
                        <TextField
                            fullWidth
                            label="Last Name"
                            margin="dense"
                            value={checkinLastName}
                            onChange={e => setCheckinLastName(e.target.value)}
                            InputProps={{ startAdornment: <Box sx={{ pr: 1 }}>👤</Box> }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleCheckinSubmit}
                            sx={{ mb: 2 }}
                        >
                            Confirm Check-in
                        </Button>
                        {checkinError && (
                            <Typography color="error" sx={{ mt: 1, fontSize: "0.875rem" }}>
                                {checkinError}
                            </Typography>
                        )}
                    </Box>

                    <Typography
                        variant="caption"
                        display="block"
                        sx={{ textAlign: "center", color: "#999" }}
                    >
                        Need help?{" "}
                        <a href="/UserProfile/Support" style={{ color: "#007bff" }}>
                            Contact Support
                        </a>
                    </Typography>
                </Box>
            </Slide>

            {/* Success notification */}
            <Snackbar
                open={checkinSuccess}
                autoHideDuration={6000}
                onClose={() => setCheckinSuccess(false)}
            >
                <Alert onClose={() => setCheckinSuccess(false)} severity="success" sx={{ width: "100%" }}>
                    Check-in completed successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default HomePage;