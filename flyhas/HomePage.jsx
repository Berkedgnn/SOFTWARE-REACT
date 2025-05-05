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
import {
  MdOutlineChair,
  MdLuggage,
  MdOutlineSportsTennis,
  MdAirlineSeatReclineExtra,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const [tripType, setTripType] = useState("oneway");
  const [departureDate, setDepartureDate] = useState(dayjs());
  const [passengers, setPassengers] = useState(1);
  const [cityList, setCityList] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/cities")
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
        passengers,
      },
    });
  };

  return (
    <Box sx={{ backgroundColor: "white", minHeight: "100vh", p: 2, m: "-16px" }}>
      <div className="bg-blue-50 min-h-screen">
        <Container maxWidth="md" className="pt-8">
          <Button
            startIcon={<FlightTakeoff />}
            variant="contained"
            color="secondary"
            sx={{
              position: "fixed",
              top: 100,
              left: 0,
              zIndex: 1000,
              borderTopRightRadius: 30,
              borderBottomRightRadius: 30,
              py: 1.5,
              px: 3,
              textTransform: "none",
              backgroundColor: "#1c3d5a",
              '&:hover': {
                backgroundColor: "#0f2a3c"
              }
            }}
            onClick={() => setIsDrawerOpen(true)}
          >
            Check-in
          </Button>

          <Carousel autoPlay infiniteLoop showThumbs={false} className="mb-6 max-w-3xl mx-auto">
            <div><img src="images/slider1.png" alt="Slider 1" /></div>
            <div><img src="images/slider2.png" alt="Slider 2" /></div>
            <div><img src="images/slider3.png" alt="Slider 3" /></div>
          </Carousel>

          <Box className="bg-white rounded-2xl shadow-md p-6 max-w-3xl mx-auto mb-12">
            <ToggleButtonGroup value={tripType} exclusive onChange={handleTripTypeChange} fullWidth className="mb-4">
              <ToggleButton value="oneway">One Way</ToggleButton>
              <ToggleButton value="round" disabled>Round Trip</ToggleButton>
            </ToggleButtonGroup>

            <Grid container spacing={2}>
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
              <Grid item xs={12} className="text-center">
                <Button variant="contained" color="primary" onClick={handleSearch}>Search Flight</Button>
              </Grid>
            </Grid>
          </Box>
        </Container>

        {/* ✅ DRAWER */}
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: { xs: "100%", sm: 350 },
            height: "100vh",
            background: "linear-gradient(to bottom right, #e6f0ff, #ffffff)",
            boxShadow: 5,
            transform: isDrawerOpen ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.3s ease-in-out",
            zIndex: 1500,
            p: 4,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1c3d5a" }}>
              ✈️ Online Check-in
            </Typography>
            <Button size="small" onClick={() => setIsDrawerOpen(false)}>❌</Button>
          </Box>

          <Typography variant="body2" sx={{ mb: 3, color: "#3b3b3b" }}>
            Complete your online check-in and get your boarding pass instantly.
          </Typography>

          <TextField
            fullWidth
            label="PNR / Ticket Number"
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: (
                <Box component="span" sx={{ color: "#007bff", pr: 1 }}>🎫</Box>
              )
            }}
          />

          <TextField
            fullWidth
            label="Surname"
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: (
                <Box component="span" sx={{ color: "#007bff", pr: 1 }}>👤</Box>
              )
            }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: 2,
              backgroundColor: "#007bff",
              '&:hover': {
                backgroundColor: "#005ecb"
              }
            }}
          >
            Search
          </Button>

          <Typography variant="caption" display="block" sx={{ mt: 4, textAlign: "center", color: "#999" }}>
            Need help? <a href="/support" style={{ color: "#007bff" }}>Contact Support</a>
          </Typography>
        </Box>
      </div>
    </Box>
  );
};

export default HomePage;