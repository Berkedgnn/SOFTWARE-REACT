import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  };

  const togglePasswordVisibility = () => {
    setFormData((prev) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const login = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const { token, role } = await AuthService.login(
        formData.email,
        formData.password
      );


      if (role === "ADMIN") {
        navigate("/AdminProfile/MyProfile");
      } else if (role === "MANAGER") {
        navigate("/ManagerProfile/MyProfile");
      } else if (role === "CUSTOMER") {
        navigate("/UserProfile/MyProfile");
      } else {
        alert("Unknown role");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("User not found or wrong credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
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
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Login
        </Typography>
        <Box component="form" sx={{ width: "100%" }}>
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

          <Button
            fullWidth
            variant="contained"
            sx={{
              marginTop: 2,
              backgroundColor: "#001f5c",
              "&:hover": {
                backgroundColor: "#001a4d",
              },
            }}
            onClick={login}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign In"
            )}
          </Button>
        </Box>

        <Typography sx={{ marginTop: 2 }}>
          Don’t you have account? Create new account
        </Typography>
        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#001f5c",
            "&:hover": {
              backgroundColor: "#001a4d",
            },
          }}
          onClick={() => navigate("/Register")}
        >
          Register
        </Button>
      </Paper>
    </Container>
  );
}

export default LoginPage;

