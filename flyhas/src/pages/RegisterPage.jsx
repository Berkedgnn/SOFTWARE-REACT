import React, { useState } from "react";
import {
  Container, TextField, Button, Typography, Paper, Box,
  IconButton, InputAdornment
} from "@mui/material";
import {
  Visibility, VisibilityOff,
  CheckCircle, Cancel
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cpassword: "",
    showPassword: false,
    showConfirmPassword: false,
    passwordRules: {
      hasLowerUpper: false,
      hasNumber: false,
      hasSpecialChar: false,
      noConsecutive: true,
      noTurkishChar: true,
      lengthValid: false,
    },
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "password" && { passwordRules: checkPasswordRules(value) }),
    }));
  };

  const checkPasswordRules = (password) => {
    const hasLowerUpper = /(?=.*[a-z])(?=.*[A-Z])/.test(password);
    const hasNumber = /(?=.*\d)/.test(password);
    const hasSpecialChar = /(?=.*[.!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password);
    const noConsecutive = !/(.)\1\1/.test(password);
    const noTurkishChar = !/[çğıöşüÇĞİÖŞÜ]/.test(password);
    const lengthValid = password.length >= 8 && password.length <= 16;

    return { hasLowerUpper, hasNumber, hasSpecialChar, noConsecutive, noTurkishChar, lengthValid };
  };

  const togglePasswordVisibility = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "Name is required";
    if (!formData.lastName) newErrors.lastName = "Surname is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.cpassword)
      newErrors.cpassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const register = async () => {
    if (!validateForm()) return;

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password
    };

    try {
      const response = await AuthService.registerCustomer(payload);
      if (response && response.role) {
        const role = response.role;
        if (role === "CUSTOMER") navigate("/UserProfile/MyProfile");
        else if (role === "ADMIN") navigate("/AdminProfile/MyProfile");
        else if (role === "MANAGER") navigate("/ManagerProfile/MyProfile");
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Registration failed! " + (err.response?.data?.message || "Please try again."));
    }
  };

  return (
    <Container maxWidth="sm" style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "50px" }}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ backgroundColor: "#001f5c", color: "white", padding: 3, textAlign: "center", borderRadius: 2, marginBottom: 2 }}>
          <Typography variant="h6">Benefit from the advantages by logging in as a member</Typography>
          <Typography>Quick access to all your flights</Typography>
          <Typography>Easy online check-in</Typography>
        </Box>

        <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
          <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>Sign Up</Typography>

          <TextField fullWidth label="Name" name="firstName" margin="normal" value={formData.firstName} onChange={handleChange} error={!!errors.firstName} helperText={errors.firstName} />
          <TextField fullWidth label="Surname" name="lastName" margin="normal" value={formData.lastName} onChange={handleChange} error={!!errors.lastName} helperText={errors.lastName} />
          <TextField fullWidth label="Email" name="email" margin="normal" value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} />

          <TextField
            fullWidth label="Password" name="password" margin="normal"
            type={formData.showPassword ? "text" : "password"}
            value={formData.password} onChange={handleChange}
            error={!!errors.password} helperText={errors.password}
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

          <TextField
            fullWidth label="Confirm Password" name="cpassword" margin="normal"
            type={formData.showConfirmPassword ? "text" : "password"}
            value={formData.cpassword} onChange={handleChange}
            error={formData.cpassword && formData.password !== formData.cpassword}
            helperText={formData.cpassword && formData.password !== formData.cpassword ? "Passwords do not match" : ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setFormData((prev) => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }))}
                    edge="end"
                  >
                    {formData.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Paper elevation={1} sx={{ padding: 2, marginTop: 2, textAlign: "left", backgroundColor: "#f5f5f5" }}>
            <Typography variant="subtitle1" fontWeight="bold">Password Rules</Typography>
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              {[
                { rule: "Must contain one lowercase and one uppercase letter", passed: formData.passwordRules.hasLowerUpper },
                { rule: "Must contain a number                 ", passed: formData.passwordRules.hasNumber },
                { rule: "Must contain a special character", passed: formData.passwordRules.hasSpecialChar },
                { rule: "Must not contain 3 consecutive characters", passed: formData.passwordRules.noConsecutive },
                { rule: "Must not contain Turkish characters", passed: formData.passwordRules.noTurkishChar },
                { rule: "Must be between 8-16 characters", passed: formData.passwordRules.lengthValid },
              ].map(({ rule, passed }) => (
                <li key={rule} style={{ display: "inline-flex", alignItems: "center", color: passed ? "green" : "red" }}>
                  {passed ? <CheckCircle fontSize="small" style={{ marginRight: "5px" }} /> : <Cancel fontSize="small" style={{ marginRight: "5px" }} />}
                  {rule}
                </li>
              ))}
            </ul>
          </Paper>

          <Button fullWidth variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={register}>
            Sign Up
          </Button>

          <Typography sx={{ marginTop: 2 }}>Already Member?</Typography>
          <Button
            fullWidth variant="contained"
            sx={{ backgroundColor: "#001f5c", "&:hover": { backgroundColor: "#001a4d" } }}
            onClick={() => navigate("/Login")}
          >
            Sign In
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}

export default RegisterPage;
