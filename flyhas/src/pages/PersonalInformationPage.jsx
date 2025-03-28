import React, { useState } from "react";
import { Container, Typography, Box, TextField, Slider, Button, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PersonalInformationPage = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    passportNumber: "",
  });
  const navigate = useNavigate();

  const [passengerCount, setPassengerCount] = useState(1);
  const [passengers, setPassengers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handlePassengerCountChange = (event, newValue) => {
    setPassengerCount(newValue);
    setPassengers(
      Array.from({ length: newValue }, (_, index) => ({
        firstName: "",
        lastName: "",
        passportNumber: "",
      }))
    );
  };

  const handlePassengerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPassengers = [...passengers];
    updatedPassengers[index][name] = value;
    setPassengers(updatedPassengers);
  };

  const handleUseMyInfo = () => {
    if (passengers.length > 0) {
      setPassengers([{ ...userInfo }, ...passengers.slice(1)]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>
        Passenger Information
      </Typography>

      {!submitted ? (
        <Box component="form" onSubmit={handleSubmit}>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Your Info
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={userInfo.firstName}
                  onChange={handleUserInfoChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={userInfo.lastName}
                  onChange={handleUserInfoChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Passport Number"
                  name="passportNumber"
                  value={userInfo.passportNumber}
                  onChange={handleUserInfoChange}
                  required
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Number of Passengers
            </Typography>
            <Slider
              value={passengerCount}
              onChange={handlePassengerCountChange}
              min={1}
              max={6}
              step={1}
              marks
              valueLabelDisplay="auto"
            />
          </Paper>

          {passengers.map((passenger, index) => (
            <Paper key={index} elevation={3} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Passenger {index + 1}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={passenger.firstName}
                    onChange={(e) => handlePassengerChange(index, e)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={passenger.lastName}
                    onChange={(e) => handlePassengerChange(index, e)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Passport Number"
                    name="passportNumber"
                    value={passenger.passportNumber}
                    onChange={(e) => handlePassengerChange(index, e)}
                    required
                  />
                </Grid>
              </Grid>
              {index === 0 && (
                <Box sx={{ textAlign: "right", mt: 2 }}>
                  <Button variant="outlined" onClick={handleUseMyInfo}>
                    Use My Info
                  </Button>
                </Box>
              )}
            </Paper>
          ))}

          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Button type="submit" variant="contained" size="large">
              Submit
            </Button>
          </Box>
        </Box>
      ) : (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Passenger Info
          </Typography>
          <Typography variant="h6" gutterBottom>
            Your Info:
          </Typography>
          <Typography>
            <strong>First Name:</strong> {userInfo.firstName}
          </Typography>
          <Typography>
            <strong>Last Name:</strong> {userInfo.lastName}
          </Typography>
          <Typography>
            <strong>Passport Number:</strong> {userInfo.passportNumber}
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Passengers:
          </Typography>
          {passengers.map((passenger, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="subtitle1">
                <strong>Passenger {index + 1}:</strong>
              </Typography>
              <Typography>
                <strong>First Name:</strong> {passenger.firstName}
              </Typography>
              <Typography>
                <strong>Last Name:</strong> {passenger.lastName}
              </Typography>
              <Typography>
                <strong>Passport Number:</strong> {passenger.passportNumber}
              </Typography>
            </Box>
          ))}
          <Button type="submit" variant="contained" size="large" onClick={() => navigate("/CheckOut")}>
            Checkout
          </Button>
        </Paper>
      )}

    </Container>
  );
};

export default PersonalInformationPage;