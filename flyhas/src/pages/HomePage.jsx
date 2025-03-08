import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { TextField, Button, MenuItem, ToggleButton, ToggleButtonGroup, Box, Container, Grid, Card, CardMedia, CardContent, Typography, Select } from "@mui/material";
import { FlightTakeoff, Person } from "@mui/icons-material";
import { MdOutlineChair, MdLuggage, MdOutlineSportsTennis, MdAirlineSeatReclineExtra } from "react-icons/md";
import Footer from "../components/Footer";


const airports = [
  "İstanbul - Sabiha Gökçen (SAW)",
  "Ankara - Esenboğa (ESB)",
  "İzmir - Adnan Menderes (ADB)",
];

const HomePage = () => {
  const [tripType, setTripType] = useState("round");
  const [departureDate, setDepartureDate] = useState(dayjs());
  const [returnDate, setReturnDate] = useState(null);
  const [passengers, setPassengers] = useState(1);

  const handleTripTypeChange = (_, newType) => setTripType(newType);

  return (
    <div className="bg-blue-50 min-h-screen">
      <Container maxWidth="md" className="pt-8">
        <Carousel autoPlay infiniteLoop showThumbs={false} className="mb-6 max-w-3xl mx-auto">
          <div><img src="images/slider1.png" alt="Slider 1" /></div>
          <div><img src="images/slider2.png" alt="Slider 2" /></div>
          <div><img src="images/slider3.png" alt="Slider 3" /></div>
        </Carousel>

        <Box sx={{ width: "100%", my: 2 }}>
           <hr style={{ border: "1px solid #ddd", width: "100%" }} />
          </Box>

        <Box className="bg-white rounded-2xl shadow-md p-6 max-w-3xl mx-auto mb-12">
          <ToggleButtonGroup
            value={tripType}
            exclusive
            onChange={handleTripTypeChange}
            className="mb-4"
            fullWidth
          >
            <ToggleButton value="oneway">One Way</ToggleButton>
            <ToggleButton value="round">Round Trip</ToggleButton>
          </ToggleButtonGroup>

          <Box sx={{ width: "100%", my: 2 }}>
           <hr style={{ border: "1px solid #ddd", width: "100%" }} />
          </Box>


          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={6}>
              <TextField select fullWidth label="From" defaultValue="">
                {airports.map((airport) => (
                  <MenuItem key={airport} value={airport}>{airport}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField select fullWidth label="To" defaultValue="">
                {airports.map((airport) => (
                  <MenuItem key={airport} value={airport}>{airport}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Departure Date" value={departureDate} onChange={setDepartureDate} renderInput={(params) => <TextField {...params} fullWidth />} />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Retun Date" value={returnDate} onChange={setReturnDate} disabled={tripType === "oneway"} renderInput={(params) => <TextField {...params} fullWidth />} />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
            <TextField
                select
                fullWidth
                label="Passengers"
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                InputProps={{ startAdornment: <Person className="mr-2" /> }}
              >
                {[...Array(10).keys()].map(i => (
                  <MenuItem key={i + 1} value={i + 1}>{i + 1} Passenger</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} className="text-center" sx={{ marginBottom: 8 }}>
                 <Button variant="contained" color="primary">Search Flight</Button>
                </Grid>

          </Grid>
        </Box>

        <div className="mb-12">
          <div className="flex justify-between items-center mb-5">
          <Typography 
             variant="h4" 
             component="h2" 
             sx={{ color: "#1c3d5a", fontWeight: "bold", display: "flex", alignItems: "center", gap: 1 }}
           >
            <FlightTakeoff sx={{ fontSize: 36, color: "#1c3d5a" }} /> 
            <span style={{ color: "#007bff" }}>Flight</span> 
            <span style={{ color: "#1c3d5a" }}>Destinations</span>
            </Typography>

            <Box sx={{ width: "100%", my: 2 }}>
           <hr style={{ border: "1px solid #ddd", width: "100%" }} />
          </Box>

          </div>
          <Grid container spacing={4} justifyContent="center">
            {["istanbul", "London", "Vienna", "Ankara"].map((city, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card className="rounded-2xl shadow-md">
                  <CardMedia component="img" height="200" image={`/images/${city.toLowerCase()}.png`} alt={city} className="rounded-t-2xl" />
                  <CardContent className="text-center">
                    <Typography variant="h6" className="font-bold">{city}</Typography>
                    <Typography variant="body2" className="text-gray-500 mb-2">To Fly at Advantageous Prices</Typography>
                    <Button variant="contained" color="primary" className="rounded-full">Buy Ticket</Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>

        <Box sx={{ width: "100%", my: 2 }}>
           <hr style={{ border: "1px solid #ddd", width: "100%" }} />
          </Box>
          <Box sx={{ my: 10 }} />  
         {/* Additional Services Section */}
         <Box className="bg-white rounded-2xl shadow-md p-6 max-w-5xl mx-auto mb-12">  
          <div className="mb-12 text-center">

          <Typography 
             variant="h4" 
             component="h2" 
             sx={{ color: "#1c3d5a", fontWeight: "bold", display: "flex", alignItems: "center", gap: 1 }}
           >
            <FlightTakeoff sx={{ fontSize: 36, color: "#1c3d5a" }} /> 
            <span style={{ color: "#007bff" }}>Additional</span> 
            <span style={{ color: "#1c3d5a" }}>Services</span>
            </Typography>

            <Box sx={{ width: "100%", my: 2 }}>
           <hr style={{ border: "1px solid #ddd", width: "100%" }} />
          </Box>
            <Typography variant="body1" className="text-gray-600">
              You can get more detailed information by clicking on our services.
            </Typography>
          </div>
          <Box sx={{ my: 10 }} />  

          <Grid container spacing={2} justifyContent="center">
            {[
              {name: "Seat Selection", icon: <MdOutlineChair size={40} color="#007bff" /> },
              { name: "Excess Baggage", icon: <MdLuggage size={40} color="#007bff" /> },
              { name: "Sports Equipment", icon: <MdOutlineSportsTennis size={40} color="#007bff" /> },
              { name: "CIP Lounge", icon: <MdAirlineSeatReclineExtra size={40} color="#007bff" /> },
            ].map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card className="rounded-2xl shadow-md p-6 text-center">
                  <Typography className="text-5xl text-blue-600">{service.icon}</Typography>
                  <Typography variant="h6" className="font-semibold mt-2">
                    {service.name}
                    <Box sx={{ my: 5 }} /> 
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Footer />  
    </div>
  );
};

export default HomePage;
