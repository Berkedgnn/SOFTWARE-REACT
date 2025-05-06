import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";

const PersonalInformationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { selectedSeats = [], flight } = location.state || {};

  const [passengers, setPassengers] = useState(
    selectedSeats.map(() => ({
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "",
      nationalId: "",
    }))
  );

  const [errors, setErrors] = useState([]);

  const handlePassengerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPassengers = [...passengers];
    updatedPassengers[index][name] = value;
    setPassengers(updatedPassengers);
  };

  const validatePassenger = (passenger) => {
    const newErrors = {};

    if (!passenger.firstName) newErrors.firstName = "First name is required.";
    if (!passenger.lastName) newErrors.lastName = "Last name is required.";

    if (!passenger.email) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(passenger.email)
    ) {
      newErrors.email = "Invalid email address.";
    }

    if (!passenger.birthDate) {
      newErrors.birthDate = "Birth date is required.";
    } else if (dayjs(passenger.birthDate).isAfter(dayjs())) {
      newErrors.birthDate = "Birth date cannot be in the future.";
    }

    if (!passenger.nationalId) {
      newErrors.nationalId = "National ID is required.";
    } else if (!/^\d{11}$/.test(passenger.nationalId)) {
      newErrors.nationalId = "National ID must be exactly 11 digits.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationResults = passengers.map(validatePassenger);
    const hasErrors = validationResults.some((err) => Object.keys(err).length > 0);

    if (hasErrors) {
      setErrors(validationResults);
      return;
    }

    navigate("/CheckOut", {
      state: {
        flight,
        passengers,
        selectedSeats,
      },
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>
        Passenger Information
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        {passengers.map((passenger, index) => (
          <Paper key={index} elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Passenger {index + 1} – Seat: {selectedSeats[index]?.seatNumber}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={passenger.firstName}
                  onChange={(e) => handlePassengerChange(index, e)}
                  error={!!errors[index]?.firstName}
                  helperText={errors[index]?.firstName}
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
                  error={!!errors[index]?.lastName}
                  helperText={errors[index]?.lastName}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={passenger.email}
                  onChange={(e) => handlePassengerChange(index, e)}
                  error={!!errors[index]?.email}
                  helperText={errors[index]?.email}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Birth Date"
                  name="birthDate"
                  type="date"
                  value={passenger.birthDate}
                  onChange={(e) => handlePassengerChange(index, e)}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ max: dayjs().format("YYYY-MM-DD") }}
                  error={!!errors[index]?.birthDate}
                  helperText={errors[index]?.birthDate}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="National ID"
                  name="nationalId"
                  value={passenger.nationalId}
                  onChange={(e) => handlePassengerChange(index, e)}
                  inputProps={{ maxLength: 11 }}
                  error={!!errors[index]?.nationalId}
                  helperText={errors[index]?.nationalId}
                  required
                />
              </Grid>
            </Grid>
          </Paper>
        ))}

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button type="submit" variant="contained" size="large">
            Confirm & Proceed
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PersonalInformationPage;