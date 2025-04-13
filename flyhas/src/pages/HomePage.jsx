import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { FlightTakeoff, Person } from "@mui/icons-material";
import { MdOutlineChair, MdLuggage, MdOutlineSportsTennis, MdAirlineSeatReclineExtra } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
    const [tripType, setTripType] = useState("oneway");
    const [departureDate, setDepartureDate] = useState(dayjs());
    const [passengers, setPassengers] = useState(1);
    const [cityList, setCityList] = useState([]);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/api/cities")
            .then((res) => {
                setCityList(res.data);
                if (res.data.length >= 2) {
                    setFrom(res.data[0].name);
                    setTo(res.data[1].name);
                }
            })
            .catch((err) => console.error("City list loading failed:", err));
    }, []);

    const handleTripTypeChange = (_, newType) => {
        setTripType(newType);
    };

    const handleSearch = () => {
        navigate("/FlightList", {
            state: {
                from,
                to,
                date: departureDate.format("YYYY-MM-DD"),
                passengers
            }
        });
    };

    return (
        <Box sx={{ justifyContent: "space-evenly", backgroundColor: "white", minHeight: "100vh", alignItems: { md: "flex-start" }, p: 2, gap: 2, m: "-16px" }}>
            <div className="bg-blue-50 min-h-screen">
                <Container maxWidth="md" className="pt-8">
                    <Carousel autoPlay infiniteLoop showThumbs={false} className="mb-6 max-w-3xl mx-auto">
                        <div><img src="images/slider1.png" alt="Slider 1" /></div>
                        <div><img src="images/slider2.png" alt="Slider 2" /></div>
                        <div><img src="images/slider3.png" alt="Slider 3" /></div>
                    </Carousel>

                    <Box sx={{ width: "100%", my: 2 }}><hr style={{ border: "1px solid #ddd", width: "100%" }} /></Box>

                    <Box className="bg-white rounded-2xl shadow-md p-6 max-w-3xl mx-auto mb-12">
                        <ToggleButtonGroup value={tripType} exclusive onChange={handleTripTypeChange} fullWidth className="mb-4">
                            <ToggleButton value="oneway">One Way</ToggleButton>
                            <ToggleButton value="round" disabled>Round Trip</ToggleButton>
                        </ToggleButtonGroup>

                        <Box sx={{ width: "100%", my: 2 }}><hr style={{ border: "1px solid #ddd", width: "100%" }} /></Box>

                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="From"
                                    value={from}
                                    onChange={(e) => setFrom(e.target.value)}
                                >
                                    {cityList.map((city) => (
                                        <MenuItem key={city.id} value={city.name}>{city.name}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="To"
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}
                                >
                                    {cityList.filter(c => c.name !== from).map((city) => (
                                        <MenuItem key={city.id} value={city.name}>{city.name}</MenuItem>
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
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Passengers"
                                    value={passengers}
                                    onChange={(e) => setPassengers(Number(e.target.value))}
                                    InputProps={{ startAdornment: <Person className="mr-2" /> }}
                                >
                                    {[...Array(10).keys()].map(i => (
                                        <MenuItem key={i + 1} value={i + 1}>{i + 1} Passenger</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} className="text-center" sx={{ marginBottom: 8 }}>
                                <Button variant="contained" color="primary" onClick={handleSearch}>Search Flight</Button>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Flight Destinations */}
                    <div className="mb-12">
                        <div className="flex justify-between items-center mb-5">
                            <Typography variant="h4" component="h2" sx={{ color: "#1c3d5a", fontWeight: "bold", display: "flex", alignItems: "center", gap: 1 }}>
                                <FlightTakeoff sx={{ fontSize: 36, color: "#1c3d5a" }} />
                                <span style={{ color: "#007bff" }}>Flight</span>
                                <span style={{ color: "#1c3d5a" }}>Destinations</span>
                            </Typography>
                        </div>
                        <Grid container spacing={4} justifyContent="center">
                            {["Istanbul", "London", "Vienna", "Ankara"].map((city, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <Card className="rounded-2xl shadow-md">
                                        <CardMedia component="img" height="200" image={`/images/${city.toLowerCase()}.png`} alt={city} className="rounded-t-2xl" />
                                        <CardContent className="text-center">
                                            <Typography variant="h6" className="font-bold">{city}</Typography>
                                            <Typography variant="body2" className="text-gray-500 mb-2">To Fly at Advantageous Prices</Typography>
                                            <Button variant="contained" color="primary" className="rounded-full" onClick={() => navigate("/FlightList")}>Buy Ticket</Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                    <div><hr></hr></div>

                    {/* Additional Services */}
                    <Box className="bg-white rounded-2xl shadow-md p-6 max-w-5xl mx-auto mb-12">
                        <div className="mb-12 text-center">
                            <Typography variant="h4" component="h2" sx={{ color: "#1c3d5a", fontWeight: "bold", display: "flex", alignItems: "center", gap: 1 }}>
                                <FlightTakeoff sx={{ fontSize: 36, color: "#1c3d5a" }} />
                                <span style={{ color: "#007bff" }}>Additional</span>
                                <span style={{ color: "#1c3d5a" }}>Services</span>
                            </Typography>
                            <Typography variant="body1" className="text-gray-600 mt-2">
                                You can get more detailed information by clicking on our services.
                            </Typography>
                        </div>

                        <Grid container spacing={2} justifyContent="center">
                            {[
                                { name: "Seat Selection", icon: <MdOutlineChair size={40} color="#007bff" /> },
                                { name: "Excess Baggage", icon: <MdLuggage size={40} color="#007bff" /> },
                                { name: "Sports Equipment", icon: <MdOutlineSportsTennis size={40} color="#007bff" /> },
                                { name: "CIP Lounge", icon: <MdAirlineSeatReclineExtra size={40} color="#007bff" /> },
                            ].map((service, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <Card className="rounded-2xl shadow-md p-6 text-center">
                                        <Typography className="text-5xl text-blue-600">{service.icon}</Typography>
                                        <Typography variant="h6" className="font-semibold mt-2">{service.name}</Typography>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Container>
            </div>
        </Box>
    );
};

export default HomePage;