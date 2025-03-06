import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper, Box, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Circle, CheckCircle, Cancel } from "@mui/icons-material"; 

function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",   //user name
        surname: "", //user surname
        email: "",  //user email
        password: "",   //user password
        cpassword: "",  //user control password
        showPassword: false,   //boolean variable to manage password visibility

        //object to check password rules
        passwordRules: {
          hasLowerUpper: false,
          hasNumber: false,
          hasSpecialChar: false,
          noConsecutive: true,
          noTurkishChar: true,
          lengthValid: false,
        },
      });

  //state to manage error messages
  const [errors, setErrors] = useState({});

  //function that captures user inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

  //updates the form data and checks the password rules
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "password" && { passwordRules: checkPasswordRules(value) }),
    }));
  };
  
  //function that checks whether the password complies with the rules
  const checkPasswordRules = (password) => {
    const hasLowerUpper = /(?=.*[a-z])(?=.*[A-Z])/.test(password); //verify that the password has both capital and lowercase letters
    const hasNumber = /(?=.*\d)/.test(password); //verify that the password has at least one number in it
    const hasSpecialChar = /(?=.*[.!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password); //verify that the password has a minimum of one special character
    const noConsecutive = !/(.)\1\1/.test(password); //verify that there aren't three similar characters in a row
    const noTurkishChar = !/[çğıöşüÇĞİÖŞÜ]/.test(password); //verify that the password contains no Turkish characters
    const lengthValid = password.length >= 8 && password.length <= 16; //verify that the password is eight to sixteen characters long
  
    return {
      hasLowerUpper,
      hasNumber,
      hasSpecialChar,
      noConsecutive,
      noTurkishChar,
      lengthValid,
    };
  };
  
//function to change password visibility
  const togglePasswordVisibility = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };
  
  //function to validate inputs
  function validateForm() {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required"; //if name field is empty
    if (!formData.surname) newErrors.surname = "Surname is required"; //if surname field is empty
    if (!formData.email) newErrors.email = "Email is required"; //if email field is empty
    if (!formData.password) newErrors.password = "Password is required"; //if password field is empty
    else if (formData.password.length < 6) //a minimum of six characters should be included in the password
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.cpassword) //if password and confirm password fields match
      newErrors.cpassword = "Passwords do not match";

    //update error state
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; //return true if no errors exist
  }

  //managing the registration process
  function register() {
    if (validateForm()) {
      alert("Registration Successful!");
      console.log(formData);
    }
  }

  return (
     //main container to center the content and set a minimum height
    <Container maxWidth="sm" style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" , marginTop: "50px", }}>
      <Box sx={{ width: "100%" }}>
         {/* Informational section with benefits of logging in */}
        <Box sx={{ backgroundColor: "#001f5c", color: "white", padding: 3, textAlign: "center", borderRadius: 2, marginBottom: 2 }}>
          <Typography variant="h6">Benefit from the advantages by logging in as a member</Typography>
          <Typography>Quick access to all your flights</Typography>
          <Typography>Easy online check-in</Typography>
        </Box>

         {/* Sign-up form inside a Paper component for better UI */}
        <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
          <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
            Sign Up
          </Typography>

           {/* Name input field */}
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />

          {/* Surname input field */}
          <TextField
            fullWidth
            label="Surname"
            margin="normal"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            error={!!errors.surname}
            helperText={errors.surname}
          />

          {/* Email input field */}
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

          {/* Password input field */}
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

         {/* Confirm password input field with validation */}
         <TextField
           fullWidth
           label="Confirm Password"
           margin="normal"
           name="cpassword"
           type={formData.showConfirmPassword ? "text" : "password"}
           value={formData.cpassword}
           onChange={handleChange}
           error={formData.cpassword && formData.password !== formData.cpassword}
             helperText={
              formData.cpassword && formData.password !== formData.cpassword
                ? "Passwords do not match"
                : ""
           }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        showConfirmPassword: !prev.showConfirmPassword,
                      }))
                    }
                    edge="end"
                  >
                    {formData.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
        FormHelperTextProps={{
        style: { color: "red" },
        }}
       />

        {/* Password requirements section */}
        <Paper elevation={1} sx={{ padding: 2, marginTop: 2, textAlign: "left", backgroundColor: "#f5f5f5" }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Password Rules
          </Typography>
          <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
            <li style={{ display: "inline-flex", alignItems: "center", color: formData.password ? (formData.passwordRules.hasLowerUpper ? "green" : "red") : "#808080" }}>
              {formData.password
                ? formData.passwordRules.hasLowerUpper
                  ? <CheckCircle color="success" fontSize="small" style={{ marginRight: "5px" }} />
                  : <Cancel color="error" fontSize="small" style={{ marginRight: "5px" }} />
                : <Circle style={{ color: "#1976d2", marginRight: "5px" }} fontSize="small" />}
              Must contain one lowercase and one uppercase letter
            </li>
            <li style={{ display: "inline-flex", alignItems: "center", color: formData.password ? (formData.passwordRules.hasNumber ? "green" : "red") : "#808080" }}>
              {formData.password
                ? formData.passwordRules.hasNumber
                  ? <CheckCircle color="success" fontSize="small" style={{ marginRight: "5px" }} />
                  : <Cancel color="error" fontSize="small" style={{ marginRight: "5px" }} />
                : <Circle style={{ color: "#1976d2", marginRight: "5px" }} fontSize="small" />}
              Must contain a number
            </li>
            <li style={{ display: "inline-flex", alignItems: "center", color: formData.password ? (formData.passwordRules.hasSpecialChar ? "green" : "red") : "#808080" }}>
              {formData.password
                ? formData.passwordRules.hasSpecialChar
                  ? <CheckCircle color="success" fontSize="small" style={{ marginRight: "5px" }} />
                  : <Cancel color="error" fontSize="small" style={{ marginRight: "5px" }} />
                : <Circle style={{ color: "#1976d2", marginRight: "5px" }} fontSize="small" />}
              Must contain a special character . ? - # ! @ $ * % ^ & ( )
            </li>
            <li style={{ display: "inline-flex", alignItems: "center", color: formData.password ? (formData.passwordRules.noConsecutive ? "green" : "red") : "#808080" }}>
              {formData.password
                ? formData.passwordRules.noConsecutive
                  ? <CheckCircle color="success" fontSize="small" style={{ marginRight: "5px" }} />
                  : <Cancel color="error" fontSize="small" style={{ marginRight: "5px" }} />
                : <Circle style={{ color: "#1976d2", marginRight: "5px" }} fontSize="small" />}
              Must not contain 3 consecutive characters
            </li>
            <li style={{ display: "inline-flex", alignItems: "center", color: formData.password ? (formData.passwordRules.noTurkishChar ? "green" : "red") : "#808080" }}>
              {formData.password
                ? formData.passwordRules.noTurkishChar
                  ? <CheckCircle color="success" fontSize="small" style={{ marginRight: "5px" }} />
                  : <Cancel color="error" fontSize="small" style={{ marginRight: "5px" }} />
                : <Circle style={{ color: "#1976d2", marginRight: "5px" }} fontSize="small" />}
              Must not contain Turkish characters
            </li>
            <li style={{ display: "inline-flex", alignItems: "center", color: formData.password ? (formData.passwordRules.lengthValid ? "green" : "red") : "#808080" }}>
              {formData.password
                ? formData.passwordRules.lengthValid
                  ? <CheckCircle color="success" fontSize="small" style={{ marginRight: "5px" }} />
                  : <Cancel color="error" fontSize="small" style={{ marginRight: "5px" }} />
                : <Circle style={{ color: "#1976d2", marginRight: "5px" }} fontSize="small" />}
              Must be between 8-16 characters
            </li>
          </ul>
        </Paper>

           {/* Sign-up button */}
          <Button fullWidth variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={register}>
            Sign Up
          </Button>

           {/* Already a member section */}
          <Typography sx={{ marginTop: 2 }}>Already Member?</Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{
            backgroundColor: "#001f5c", 
            "&:hover": {
             backgroundColor: "#001a4d", 
             },
            }}
            onClick={register}
          >
            Sign Up
          </Button>

        </Paper>
      </Box>
    </Container>
  );
}

export default RegisterPage;
