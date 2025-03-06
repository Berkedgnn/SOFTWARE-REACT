import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper, Box, IconButton, InputAdornment, CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

//login page component
function LoginPage() {
    //state definations
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  //handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    //if there is an error message, clear it
    if (errors[e.target.name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[e.target.name]; // clear the error message
        return newErrors;
      });
    }
  };

  //change the visibility of the password
  const togglePasswordVisibility = () => {
    setFormData((prev) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  };

  //form validation
  function validateForm() {
    let newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  //register function
  async function register() {
    if (validateForm()) {
      setLoading(true);
      const user = { ...formData };
      console.log(user);
      setTimeout(() => {
        setLoading(false);
        alert("Registration Successful!");
      }, 2000);
    }
  }

  //mui login page design
  return (
    <Container
      maxWidth="xs"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
         {/* title */}
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Sign Up
        </Typography>
        <Box component="form" sx={{ width: "100%" }}>
            {/* email input */}
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          {/* password input */}
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            type={formData.showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {formData.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* register button */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              marginTop: 2,
              backgroundColor: "#001f5c", // Lacivert renk
              "&:hover": {
                backgroundColor: "#001a4d", // Hover için koyu lacivert
              },
            }}
            onClick={register}
            disabled={Object.keys(errors).length > 0 || loading}
          >
            {/* loading icon or sign up text */}
            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default LoginPage;

